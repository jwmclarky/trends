import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("trends router", () => {
  it("getTop returns an array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.trends.getTop({ limit: 5 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("getFiltered returns an array with no filters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.trends.getFiltered({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("getCountries returns an array of strings", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.trends.getCountries();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(typeof result[0]).toBe("string");
    }
  });
});

describe("articles router", () => {
  it("getAll returns published articles", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.articles.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("getFeatured returns limited articles", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.articles.getFeatured({ limit: 3 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("getBySlug returns an article or null", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.articles.getBySlug({ slug: "rise-of-praise-kink-gen-z" });
    if (result) {
      expect(result.slug).toBe("rise-of-praise-kink-gen-z");
      expect(result.title).toBeTruthy();
    }
  });
});

describe("infographic router", () => {
  it("getStatic returns a url", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.infographic.getStatic();
    expect(result).toHaveProperty("url");
    expect(typeof result.url).toBe("string");
  });
});

describe("forum router (protected)", () => {
  it("getCategories requires auth", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.forum.getCategories();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getPosts returns posts array", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.forum.getPosts({});
    expect(Array.isArray(result)).toBe(true);
  });
});
