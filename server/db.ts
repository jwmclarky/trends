import "dotenv/config";
import { eq, desc, and, sql, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, trendData, articles, forumCategories, forumPosts, postVotes, chatMessages, notifications } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== TRENDS =====
export async function getTopTrends(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  // Filter to 2025 data, sort by month DESC then growthPercent DESC for live trending feel
  const results = await db.select().from(trendData)
    .where(and(eq(trendData.year, 2025), sql`${trendData.growthPercent} IS NOT NULL`))
    .orderBy(desc(trendData.month), desc(trendData.growthPercent))
    .limit(limit);
  // Fallback to all years if no 2025 data
  if (results.length === 0) {
    return db.select().from(trendData).orderBy(desc(trendData.growthPercent)).limit(limit);
  }
  return results;
}

export async function getFilteredTrends(filters: { country?: string; ageGroup?: string; gender?: string; source?: string; year?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters.country) conditions.push(eq(trendData.country, filters.country));
  if (filters.ageGroup) conditions.push(eq(trendData.ageGroup, filters.ageGroup));
  if (filters.gender) conditions.push(eq(trendData.gender, filters.gender));
  if (filters.source) conditions.push(eq(trendData.source, filters.source));
  if (filters.year) conditions.push(eq(trendData.year, filters.year));

  if (conditions.length === 0) {
    return db.select().from(trendData).orderBy(desc(trendData.popularityScore)).limit(100);
  }
  return db.select().from(trendData).where(and(...conditions)).orderBy(desc(trendData.popularityScore)).limit(100);
}

export async function getDistinctCountries() {
  const db = await getDb();
  if (!db) return [];
  const result = await db.selectDistinct({ country: trendData.country }).from(trendData).where(sql`${trendData.country} IS NOT NULL`);
  return result.map(r => r.country).filter(Boolean) as string[];
}

// ===== ARTICLES =====
export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.createdAt));
}

export async function getFeaturedArticles(limit: number = 3) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).where(eq(articles.published, true)).orderBy(desc(articles.createdAt)).limit(limit);
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result[0] || null;
}

// ===== PROFILE =====
export async function getProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user[0]) return null;

  const postCountResult = await db.select({ count: sql<number>`count(*)` }).from(forumPosts).where(eq(forumPosts.userId, userId));
  const upvoteResult = await db.select({ total: sql<number>`COALESCE(SUM(upvotes), 0)` }).from(forumPosts).where(eq(forumPosts.userId, userId));

  return {
    ...user[0],
    postCount: postCountResult[0]?.count || 0,
    upvoteCount: upvoteResult[0]?.total || 0,
  };
}

export async function updateProfile(userId: number, data: { bio?: string; avatarUrl?: string }) {
  const db = await getDb();
  if (!db) return;
  const updateData: Record<string, unknown> = {};
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;
  if (Object.keys(updateData).length > 0) {
    await db.update(users).set(updateData).where(eq(users.id, userId));
  }
}

// ===== FORUM =====
export async function getForumCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(forumCategories).orderBy(forumCategories.sortOrder);
}

export async function getForumPosts(categoryId?: number) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [isNull(forumPosts.parentId)];
  if (categoryId) conditions.push(eq(forumPosts.categoryId, categoryId));

  const posts = await db.select().from(forumPosts).where(and(...conditions)).orderBy(desc(forumPosts.createdAt)).limit(50);

  const enriched = await Promise.all(posts.map(async (post) => {
    const userResult = await db.select({ name: users.name }).from(users).where(eq(users.id, post.userId)).limit(1);
    const replyCount = await db.select({ count: sql<number>`count(*)` }).from(forumPosts).where(eq(forumPosts.parentId, post.id));
    return { ...post, userName: userResult[0]?.name || "Anonymous", replyCount: replyCount[0]?.count || 0 };
  }));

  return enriched;
}

export async function getForumPost(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(forumPosts).where(eq(forumPosts.id, id)).limit(1);
  if (!result[0]) return null;
  const userResult = await db.select({ name: users.name }).from(users).where(eq(users.id, result[0].userId)).limit(1);
  return { ...result[0], userName: userResult[0]?.name || "Anonymous" };
}

export async function getForumReplies(parentId: number) {
  const db = await getDb();
  if (!db) return [];
  const replies = await db.select().from(forumPosts).where(eq(forumPosts.parentId, parentId)).orderBy(forumPosts.createdAt);
  const enriched = await Promise.all(replies.map(async (reply) => {
    const userResult = await db.select({ name: users.name }).from(users).where(eq(users.id, reply.userId)).limit(1);
    return { ...reply, userName: userResult[0]?.name || "Anonymous" };
  }));
  return enriched;
}

export async function createForumPost(userId: number, data: { title: string; content: string; categoryId: number; parentId?: number }) {
  const db = await getDb();
  if (!db) return;
  await db.insert(forumPosts).values({
    userId,
    title: data.title,
    content: data.content,
    categoryId: data.categoryId,
    parentId: data.parentId || null,
  });
}

export async function upvotePost(userId: number, postId: number) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(postVotes).where(and(eq(postVotes.userId, userId), eq(postVotes.postId, postId))).limit(1);
  if (existing.length > 0) return;
  await db.insert(postVotes).values({ userId, postId, value: 1 });
  await db.update(forumPosts).set({ upvotes: sql`upvotes + 1` }).where(eq(forumPosts.id, postId));
}

// ===== CHAT =====
export async function getChatMessages(limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  const messages = await db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt)).limit(limit);
  const enriched = await Promise.all(messages.map(async (msg) => {
    const userResult = await db.select({ name: users.name }).from(users).where(eq(users.id, msg.userId)).limit(1);
    return { ...msg, userName: userResult[0]?.name || "Anonymous" };
  }));
  return enriched.reverse();
}

export async function sendChatMessage(userId: number, content: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatMessages).values({ userId, content });
}

export async function getRecentChatUsers(excludeUserId: number, withinMinutes: number): Promise<number[]> {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .selectDistinct({ userId: chatMessages.userId })
    .from(chatMessages)
    .where(
      and(
        sql`${chatMessages.userId} != ${excludeUserId}`,
        sql`${chatMessages.createdAt} > DATE_SUB(NOW(), INTERVAL ${withinMinutes} MINUTE)`
      )
    )
    .limit(20);
  return result.map(r => r.userId);
}

// ===== INFOGRAPHIC =====
export async function getStaticInfographic() {
  return { url: "/manus-storage/kinkmetrics-infographic_63556380.png" };
}

// ===== NOTIFICATIONS =====
export async function createNotification(data: {
  userId: number;
  type: "reply" | "upvote" | "chat" | "mention" | "system";
  title: string;
  message: string;
  link?: string;
  actorName?: string;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(notifications).values(data);
}

export async function getNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
}

export async function getUnreadCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  return result[0]?.count || 0;
}

export async function markNotificationRead(id: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)));
}

export async function markAllNotificationsRead(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, userId));
}
