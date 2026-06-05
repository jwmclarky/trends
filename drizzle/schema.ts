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

export type VaultMedia = typeof vaultMedia.$inferSelect;
export type InsertVaultMedia = typeof vaultMedia.$inferInsert;
export type VaultComment = typeof vaultComments.$inferSelect;
export type InsertVaultComment = typeof vaultComments.$inferInsert;
