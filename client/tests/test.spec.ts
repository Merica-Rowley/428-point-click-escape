import { test, expect } from "@playwright/test";

test("home page", async ({ page }) => {
  await page.goto("http://localhost:5173/428-point-click-escape/");
  await expect(
    page.getByRole("heading", { name: "Welcome Home" })
  ).toBeVisible();
  await expect(page.getByText("HomeAbout")).toBeVisible();
});

test("about page", async ({ page }) => {
  await page.goto("http://localhost:5173/428-point-click-escape/about");

  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  await expect(page.getByRole("main")).toMatchAriaSnapshot(`
    - main:
      - navigation:
        - link "Home":
          - /url: /428-point-click-escape
        - link "About":
          - /url: /428-point-click-escape/about
      - heading "About" [level=2]
      - paragraph: Point Click Escape is a logic puzzle game.
      - paragraph: "Players start out in a locked room: why are they there, and how can they get out? It’s up to you to find out! Explore the room, look for clues and tools, and find the key to escape!"
      - paragraph: "How to Play:"
      - paragraph: In order to navigate, click on the arrows on the side, top, and bottom of the screen. Click on areas of the room to take a closer look. Each room contains various objects. When an object is collected, it will appear in the inventory. To use an object, select the object from the inventory and click on the desired area of use. Once an object has been used up, it will disappear from the inventory.
      - paragraph: If you’d like to take a break and come back later, don’t forget to save your game!
    `);
});

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/428-point-click-escape/");
  await page.getByRole("textbox", { name: "Enter your name" }).click();
  await page.getByRole("textbox", { name: "Enter your name" }).fill("testing");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Signed in as testing")).toBeVisible();
});
