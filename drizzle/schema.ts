import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  passwordHash: text("passwordHash"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const trendData = mysqlTable("trend_data", {
  id: int("id").autoincrement().primaryKey(),
  fetishName: varchar("fetishName", { length: 128 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  source: varchar("source", { length: 64 }).notNull(),
  country: varchar("country", { length: 64 }),
  region: varchar("region", { length: 64 }),
  ageGroup: varchar("ageGroup", { length: 32 }),
  gender: varchar("gender", { length: 32 }),
  searchVolume: int("searchVolume"),
  growthPercent: int("growthPercent"),
  popularityScore: int("popularityScore"),
  year: int("year").notNull(),
  month: int("month"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  subtitle: text("subtitle"),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("coverImage"),
  author: varchar("author", { length: 128 }).notNull(),
  tags: json("tags"),
  readTime: int("readTime"),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const forumCategories = mysqlTable("forum_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  description: text("description"),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const forumPosts = mysqlTable("forum_posts", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  content: text("content").notNull(),
  parentId: int("parentId"),
  upvotes: int("upvotes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const postVotes = mysqlTable("post_votes", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  value: int("value").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["reply", "upvote", "chat", "mention", "system"]).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link", { length: 512 }),
  isRead: boolean("isRead").default(false).notNull(),
  actorName: varchar("actorName", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type TrendData = typeof trendData.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type ForumPost = typeof forumPosts.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export const vaultMedia = mysqlTable("vault_media", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fetish: varchar("fetish", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  fileUrl: text("fileUrl").notNull(),
  fileType: varchar("fileType", { length: 32 }).notNull(), // "image" | "video"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const vaultComments = mysqlTable("vault_comments", {
  id: int("id").autoincrement().primaryKey(),
  mediaId: int("mediaId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const bounties = mysqlTable("bounties", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  kink: varchar("kink", { length: 128 }).notNull(),
  budget: int("budget").notNull(),
  status: varchar("status", { length: 32 }).default("open").notNull(), // "open" | "applied" | "completed"
  creatorId: int("creatorId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VaultMedia = typeof vaultMedia.$inferSelect;
export type InsertVaultMedia = typeof vaultMedia.$inferInsert;
export type VaultComment = typeof vaultComments.$inferSelect;
export type InsertVaultComment = typeof vaultComments.$inferInsert;
export type Bounty = typeof bounties.$inferSelect;
export type InsertBounty = typeof bounties.$inferInsert;

export const directMessages = mysqlTable("direct_messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  receiverId: int("receiverId").notNull(),
  content: text("content").notNull(), // This will be encrypted string `ZERO_TRACE:xxxx`
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const collaborations = mysqlTable("collaborations", {
  id: int("id").autoincrement().primaryKey(),
  initiatorId: int("initiatorId").notNull(),
  targetId: int("targetId").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]).default("pending").notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const tips = mysqlTable("tips", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  receiverId: int("receiverId").notNull(),
  amount: int("amount").notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const scheduledPosts = mysqlTable("scheduled_posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  platforms: json("platforms").notNull(), // e.g. ["twitter", "onlyfans"]
  scheduledFor: timestamp("scheduledFor").notNull(),
  status: mysqlEnum("status", ["pending", "published", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const polls = mysqlTable("polls", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  question: varchar("question", { length: 512 }).notNull(),
  options: json("options").notNull(), // e.g. ["Option A", "Option B"]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const pollVotes = mysqlTable("poll_votes", {
  id: int("id").autoincrement().primaryKey(),
  pollId: int("pollId").notNull(),
  userId: int("userId").notNull(),
  optionIndex: int("optionIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const expenses = mysqlTable("expenses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(),
  category: varchar("category", { length: 64 }).notNull(), // e.g. "props", "lighting"
  description: text("description"),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DirectMessage = typeof directMessages.$inferSelect;
export type Collaboration = typeof collaborations.$inferSelect;
export type Tip = typeof tips.$inferSelect;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type Poll = typeof polls.$inferSelect;
export type PollVote = typeof pollVotes.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
