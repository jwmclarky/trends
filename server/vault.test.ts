import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { TRPCError } from "@trpc/server";

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

describe("vault router (protected)", () => {
  it("getMedia requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.vault.getMedia({})).rejects.toThrow();
  });

  it("getMedia returns an array for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.vault.getMedia({ fetish: "cuckold" });
    expect(Array.isArray(result)).toBe(true);
  });

  it("getComments requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.vault.getComments({ mediaId: 1 })).rejects.toThrow();
  });

  it("getComments returns comments array for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.vault.getComments({ mediaId: 9999 });
    expect(Array.isArray(result)).toBe(true);
  });
});
