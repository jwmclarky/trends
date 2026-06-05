import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  trends: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => db.getTopTrends(input.limit || 6)),
    getFiltered: publicProcedure
      .input(z.object({
        country: z.string().optional(),
        ageGroup: z.string().optional(),
        gender: z.string().optional(),
        source: z.string().optional(),
        year: z.number().optional(),
      }))
      .query(({ input }) => db.getFilteredTrends(input)),
    getCountries: publicProcedure.query(() => db.getDistinctCountries()),
  }),

  articles: router({
    getAll: publicProcedure.query(() => db.getAllArticles()),
    getFeatured: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => db.getFeaturedArticles(input.limit || 3)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => db.getArticleBySlug(input.slug)),
  }),

  profile: router({
    get: protectedProcedure.query(({ ctx }) => db.getProfile(ctx.user.id)),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getProfile(input.id)),
    update: protectedProcedure
      .input(z.object({ bio: z.string().optional() }))
      .mutation(({ ctx, input }) => db.updateProfile(ctx.user.id, input)),
    uploadAvatar: protectedProcedure
      .input(z.object({ imageData: z.string(), fileName: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { storagePut } = await import("./storage");
        const base64Data = input.imageData.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        if (buffer.length > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");
        const ext = input.fileName.split(".").pop()?.toLowerCase() || "png";
        const allowedExts = ["png", "jpg", "jpeg", "gif", "webp"];
        if (!allowedExts.includes(ext)) throw new Error("Only PNG, JPG, GIF, and WebP images are allowed");
        const key = `avatars/${ctx.user.id}-${Date.now()}.${ext}`;
        const { url } = await storagePut(key, buffer, `image/${ext}`);
        await db.updateProfile(ctx.user.id, { avatarUrl: url });
        return { url };
      }),
  }),

  forum: router({
    getCategories: protectedProcedure.query(() => db.getForumCategories()),
    getPosts: protectedProcedure
      .input(z.object({ categoryId: z.number().optional() }))
      .query(({ input }) => db.getForumPosts(input.categoryId)),
    getPost: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getForumPost(input.id)),
    getReplies: protectedProcedure
      .input(z.object({ parentId: z.number() }))
      .query(({ input }) => db.getForumReplies(input.parentId)),
    createPost: protectedProcedure
      .input(z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.number(),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createForumPost(ctx.user.id, input);
        // If this is a reply, notify the original post author
        if (input.parentId) {
          const parent = await db.getForumPost(input.parentId);
          if (parent && parent.userId !== ctx.user.id) {
            await db.createNotification({
              userId: parent.userId,
              type: "reply",
              title: "New reply to your post",
              message: `${ctx.user.name || "Someone"} replied to "${parent.title}"`,
              link: `/forum/${input.parentId}`,
              actorName: ctx.user.name || undefined,
            });
          }
        }
      }),
    upvote: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.upvotePost(ctx.user.id, input.postId);
        // Notify the post author about the upvote
        const post = await db.getForumPost(input.postId);
        if (post && post.userId !== ctx.user.id) {
          await db.createNotification({
            userId: post.userId,
            type: "upvote",
            title: "Your post got an upvote",
            message: `${ctx.user.name || "Someone"} upvoted "${post.title}"`,
            link: `/forum/${input.postId}`,
            actorName: ctx.user.name || undefined,
          });
        }
      }),
  }),

  chat: router({
    getMessages: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => db.getChatMessages(input.limit || 100)),
    sendMessage: protectedProcedure
      .input(z.object({ content: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.sendChatMessage(ctx.user.id, input.content);
        // Notify users who were recently active in chat (last 30 min) but aren't the sender
        const recentUsers = await db.getRecentChatUsers(ctx.user.id, 30);
        for (const userId of recentUsers) {
          await db.createNotification({
            userId,
            type: "chat",
            title: "New message in chat",
            message: `${ctx.user.name || "Someone"}: ${input.content.slice(0, 80)}${input.content.length > 80 ? "…" : ""}`,
            link: "/chat",
            actorName: ctx.user.name || undefined,
          });
        }
      }),
  }),

  notifications: router({
    getAll: protectedProcedure.query(({ ctx }) => db.getNotifications(ctx.user.id)),
    getUnreadCount: protectedProcedure.query(({ ctx }) => db.getUnreadCount(ctx.user.id)),
    markRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ ctx, input }) => db.markNotificationRead(input.id, ctx.user.id)),
    markAllRead: protectedProcedure
      .mutation(({ ctx }) => db.markAllNotificationsRead(ctx.user.id)),
  }),

  ai: router({
    analyzeTrends: publicProcedure
      .input(z.object({
        question: z.string(),
        filters: z.object({
          country: z.string().optional(),
          ageGroup: z.string().optional(),
          gender: z.string().optional(),
          source: z.string().optional(),
        }).optional(),
      }))
      .mutation(async ({ input }) => {
        const trends = await db.getFilteredTrends(input.filters || {});
        const trendSummary = trends.slice(0, 20).map(t =>
          `${t.fetishName}: popularity=${t.popularityScore}, growth=${t.growthPercent}%, source=${t.source}, country=${t.country || "Global"}, category=${t.category}`
        ).join("\n");

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are KinkMetrics AI Trend Analyst. You analyze fetish and kink trend data from Pornhub Insights, Clips4Sale, and Reddit. Provide concise, data-driven insights. Be professional and informative. Reference specific data points from the provided trends."
            },
            {
              role: "user",
              content: `Based on this trend data:\n${trendSummary}\n\nQuestion: ${input.question}`
            }
          ],
        });

        return { answer: response.choices[0]?.message?.content || "Unable to generate analysis." };
      }),
  }),

  infographic: router({
    getStatic: publicProcedure.query(() => db.getStaticInfographic()),
    generate: protectedProcedure
      .input(z.object({ prompt: z.string() }))
      .mutation(async ({ input }) => {
        const trends = await db.getTopTrends(10);
        const trendText = trends.map(t => `${t.fetishName} (+${t.growthPercent}%)`).join(", ");
        const fullPrompt = `Create a clean, modern data infographic with a dark background about: ${input.prompt}. Include these top trends: ${trendText}. Style: minimalist, dark theme with purple/pink accents, professional data visualization layout.`;
        const { url } = await generateImage({ prompt: fullPrompt });
        return { url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
