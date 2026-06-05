import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthContext(userId = 1): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `test-user-${userId}`,
      email: `test${userId}@example.com`,
      name: `Test User ${userId}`,
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("notifications router", () => {
  it("getAll returns an array for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.notifications.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getUnreadCount returns a number", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const count = await caller.notifications.getUnreadCount();
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("markAllRead completes without error", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.notifications.markAllRead()).resolves.not.toThrow();
  });

  it("markRead with valid id completes without error", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    // Use a non-existent ID — should silently succeed (no rows updated)
    await expect(caller.notifications.markRead({ id: 999999 })).resolves.not.toThrow();
  });
});
