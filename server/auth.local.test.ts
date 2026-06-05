import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";
import { eq } from "drizzle-orm";

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createTestContext(): { ctx: TrpcContext; setCookies: CookieCall[] } {
  const setCookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx, setCookies };
}

describe("Local Authentication Flow", () => {
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = "supersecretpassword123";
  const testName = "Test User Local";

  it("should signup a new user and set cookie", async () => {
    const { ctx, setCookies } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.signup({
      name: testName,
      email: testEmail,
      password: testPassword,
    });

    expect(result).toEqual({ success: true });
    expect(setCookies).toHaveLength(1);
    expect(setCookies[0]?.name).toBe(COOKIE_NAME);
    expect(setCookies[0]?.value).toBeDefined();

    // Verify user is in database
    const user = await db.getUserByEmail(testEmail);
    expect(user).toBeDefined();
    expect(user?.name).toBe(testName);
    expect(user?.passwordHash).toBeDefined();
    expect(user?.loginMethod).toBe("local");
  });

  it("should fail signup if email already exists", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.signup({
        name: "Another Name",
        email: testEmail,
        password: "differentpassword",
      })
    ).rejects.toThrow("Email already registered");
  });

  it("should login successfully with correct credentials", async () => {
    const { ctx, setCookies } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.login({
      email: testEmail,
      password: testPassword,
    });

    expect(result).toEqual({ success: true });
    expect(setCookies).toHaveLength(1);
    expect(setCookies[0]?.name).toBe(COOKIE_NAME);
  });

  it("should fail login with incorrect password", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.login({
        email: testEmail,
        password: "wrongpassword",
      })
    ).rejects.toThrow("Invalid email or password");
  });

  it("should fail login for non-existent email", async () => {
    const { ctx } = createTestContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.auth.login({
        email: "nonexistent@example.com",
        password: testPassword,
      })
    ).rejects.toThrow("Invalid email or password");
  });
});
