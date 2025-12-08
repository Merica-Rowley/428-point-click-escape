import { test, expect, BrowserContext, Page } from "@playwright/test";

let context: BrowserContext;
let sharedPage: Page;

test.describe.serial("logged-in tests", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    sharedPage = await context.newPage();

    await sharedPage.goto("http://localhost:5173/428-point-click-escape/");
    await sharedPage
      .getByRole("textbox", { name: "Enter your name" })
      .fill("testing");
    await sharedPage.getByRole("button", { name: "Sign in" }).click();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("trapdoor shows when lava lamp clicked", async () => {
    await sharedPage.getByRole("button").nth(2).click();
    await expect(
      sharedPage.getByRole("button", { name: "trapdoor" })
    ).toBeVisible();
  });

  test("can open trapdoor after clicking lava lamp, password correctly opens door, can pick up button", async () => {
    await sharedPage.getByRole("button", { name: "trapdoor" }).click();
    await expect(sharedPage.getByRole("textbox")).toBeVisible();
    await sharedPage.getByRole("textbox").fill("W4t3rB3nd3r!");

    await sharedPage.getByRole("button", { name: "SUBMIT" }).click();
    await expect(
      sharedPage.getByRole("button", { name: "button" })
    ).toBeVisible();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await expect(sharedPage.locator(".inventory-bar")).toBeVisible();

    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
  });

  test("can locate screwdriver, use it to open safe panel, and place first button", async () => {
    // assuming we are on the door screen now from the last test (and I know this is bad testing practice, but it's just for tomorrow...)
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await expect(
      sharedPage.getByRole("button", { name: "screwdriver" })
    ).toBeVisible();
    await sharedPage.getByRole("button", { name: "screwdriver" }).click();
    await sharedPage.getByRole("button", { name: "left-arrow" }).click();
    await expect(
      sharedPage.getByRole("button", { name: "painting" })
    ).toBeVisible();
    await sharedPage.getByRole("button", { name: "painting" }).click();
    await sharedPage.getByRole("button").nth(3).click();
    await sharedPage.getByRole("button", { name: "screwdriver" }).click();
    await expect(
      sharedPage.getByRole("img", { name: "panel with screws" })
    ).toBeVisible();
    await sharedPage.getByRole("button").nth(3).click();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await sharedPage.getByRole("button").nth(3).click();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
  });

  test("piano and lightbulb sequence", async () => {
    // starting on fireplace screen
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage.getByRole("button").nth(5).click();
    await expect(sharedPage.locator(".background-container")).toBeVisible();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button").nth(4).click();
    await expect(sharedPage.locator(".c2")).toBeVisible();
    await sharedPage.getByRole("button").nth(2).click();
    await sharedPage
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(5)
      .click();
    await sharedPage.locator(".a1-sharp").click();
    await sharedPage.locator(".b1").click();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await expect(
      sharedPage.getByRole("button", { name: "lightbulb", exact: true })
    ).toBeVisible();
    await sharedPage
      .getByRole("button", { name: "lightbulb", exact: true })
      .click();
    await expect(sharedPage.locator(".inventory-bar")).toBeVisible();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await expect(sharedPage.getByRole("button").nth(5)).toBeVisible();
    await sharedPage.getByRole("button", { name: "lightbulb" }).click();
    await sharedPage.getByRole("button").nth(5).click();
    await sharedPage.getByRole("button").nth(5).click();
  });

  test("desk book, drawer, button sequence; also placing button 2", async () => {
    // starting on desk screen
    await sharedPage
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await expect(sharedPage.getByRole("button").nth(2)).toBeVisible();
    await sharedPage.getByRole("button").nth(2).click();
    await expect(sharedPage.getByText("W4t3rB3nd3r!")).toBeVisible();
    await sharedPage.getByRole("button").nth(2).click();
    await expect(
      sharedPage.getByRole("button", { name: "button" })
    ).toBeVisible();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await expect(sharedPage.locator(".inventory-bar")).toBeVisible();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage.getByRole("button").nth(3).click();
    await expect(sharedPage.getByRole("button").nth(3)).toBeVisible();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await sharedPage.getByRole("button").nth(4).click();
    await expect(sharedPage.getByRole("button").nth(4)).toBeVisible();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
  });

  test("thermostats and third door button placement", async () => {
    // starting on fireplace screen
    await sharedPage.getByRole("button", { name: "left-arrow" }).click();
    await sharedPage.getByRole("button", { name: "left-arrow" }).click();
    await sharedPage.getByRole("button").nth(4).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await expect(sharedPage.getByRole("main")).toContainText("59");
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await sharedPage.getByRole("button", { name: "plus" }).click();
    await expect(sharedPage.getByRole("main")).toContainText("78");
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await sharedPage.getByRole("button").nth(2).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await sharedPage.getByRole("button", { name: "minus" }).click();
    await expect(sharedPage.getByRole("main")).toContainText("62");
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button", { name: "right-arrow" }).click();
    await expect(
      sharedPage.getByRole("img", { name: "hole in the wall" })
    ).toBeVisible();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await expect(sharedPage.locator(".inventory-bar")).toBeVisible();
    await sharedPage.getByRole("button", { name: "left-arrow" }).click();
    await sharedPage.getByRole("button").nth(3).click();
    await sharedPage.getByRole("button", { name: "button" }).click();
    await sharedPage.getByRole("button").nth(5).click();
    await expect(sharedPage.getByRole("button").nth(3)).toBeVisible();
    await expect(sharedPage.getByRole("button").nth(4)).toBeVisible();
    await expect(sharedPage.getByRole("button").nth(5)).toBeVisible();
  });

  test("can open safe, get key, and open door", async () => {
    // starting on safe screen
    await sharedPage.getByRole("button").nth(3).click();
    await sharedPage.getByRole("button").nth(4).click();
    await sharedPage.getByRole("button").nth(4).click();
    await sharedPage.getByRole("button").nth(4).click();
    await sharedPage.getByRole("button").nth(5).click();
    await sharedPage.getByRole("button").nth(5).click();
    await sharedPage
      .getByRole("button")
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();
    await expect(sharedPage.getByRole("button", { name: "key" })).toBeVisible();
    await sharedPage.getByRole("button", { name: "key" }).click();
    await expect(sharedPage.locator(".inventory-bar")).toBeVisible();
    await sharedPage.getByRole("button", { name: "back-arrow" }).click();
    await sharedPage.getByRole("button", { name: "left-arrow" }).click();
    await sharedPage.getByRole("button", { name: "key" }).click();
    await sharedPage.getByRole("button").nth(3).click();
    await expect(
      sharedPage.getByRole("heading", { name: "YOU WIN" })
    ).toBeVisible();
  });
});
