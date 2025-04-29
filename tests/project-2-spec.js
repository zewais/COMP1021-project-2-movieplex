import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("img")).toBeVisible();
  await expect(page.getByRole("heading", { name: "MoviesPLEX" })).toBeVisible();
  await expect(page.getByRole("paragraph")).toContainText(
    "Welcome to MoviesPLEX, your one-stop destination for all things movies! Whether you're a fan of action, romance, or comedy, we've got something for everyone. Get ready to explore our extensive collection of films and find your next favorite flick."
  );
  await expect(page.getByRole("button", { name: "Enter" })).toBeVisible();
  await page.getByRole("button", { name: "Enter" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: "Home Show Movies Add a Movie" })
      .first()
  ).toBeVisible();
  await expect(page.getByRole("link").filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Show Movies" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add a Movie" })).toBeVisible();
  await expect(page.getByLabel("Filter movies by Age")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Movies Available (8)" })
  ).toBeVisible();
  await expect(page.locator(".card > img").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Avatar: The Way of Water" })
  ).toBeVisible();
  await expect(page.locator(".btn").first()).toBeVisible();
  await expect(page.locator("a:nth-child(2) > .btn").first()).toBeVisible();
  await expect(page.locator("form > .btn").first()).toBeVisible();
  await page.getByRole("link", { name: "Add a Movie" }).click();
  await page.getByRole("textbox", { name: "Enter a movie title:" }).click();
  await page
    .getByRole("textbox", { name: "Enter a movie title:" })
    .fill("test");
  await page
    .getByRole("spinbutton", { name: "Enter year of production:" })
    .click();
  await page
    .getByRole("spinbutton", { name: "Enter year of production:" })
    .fill("1999");
  await page.getByRole("spinbutton", { name: "IMDB Rating:" }).click();
  await page.getByRole("spinbutton", { name: "IMDB Rating:" }).fill("6");
  await page.getByRole("textbox", { name: "Enter a movie poster URL" }).click();
  await page.getByRole("textbox", { name: "Enter a movie poster URL" }).click();
  await page
    .getByRole("textbox", { name: "Enter a movie poster URL" })
    .fill(
      ".movieposterdb.com/13_03/1996/117060/xl_117060_fc119e26.jpg?v=2024-03-13 18:41:38"
    );
  await page
    .getByRole("textbox", { name: "Enter the Director's name:" })
    .click();
  await page
    .getByRole("textbox", { name: "Enter the Director's name:" })
    .fill("test director");
  await page
    .getByRole("textbox", { name: "Enter Cast 1 Enter Cast 2" })
    .click();
  await page
    .getByRole("textbox", { name: "Enter Cast 1 Enter Cast 2" })
    .fill("test cast 1");
  await page.locator("#movieCast-1").nth(1).click();
  await page.locator("#movieCast-1").nth(1).fill("test cast 2");
  await page.locator("#movieCast-1").nth(2).click();
  await page.locator("#movieCast-1").nth(2).fill("test cast 3");
  await page.locator("input:nth-child(15)").check();
  await page.locator("input:nth-child(30)").check();
  await page.locator("input:nth-child(48)").check();
  await page.locator("input:nth-child(66)").check();
  await page.getByRole("textbox", { name: "Genre" }).click();
  await page.getByRole("textbox", { name: "Genre" }).fill("Fantasy");
  await page.getByLabel("Age Rating").selectOption("R");
  await page
    .getByRole("textbox", { name: "Enter a movie description" })
    .click();
  await page
    .getByRole("textbox", { name: "Enter a movie description" })
    .fill("Test description");
  await page.getByRole("button", { name: "Submit Movie" }).click();
  await page.getByRole("heading", { name: "test" }).click();
  await page
    .locator(
      "div:nth-child(9) > .card > .card-body > .d-flex > .btn-group > a:nth-child(2) > .btn"
    )
    .click();
  await expect(page.locator("input:nth-child(15)")).toBeVisible();
  await page.locator("input:nth-child(15)").uncheck();
  await page.getByRole("button", { name: "Edit Movie" }).click();
  await page
    .locator(
      "div:nth-child(9) > .card > .card-body > .d-flex > .btn-group > a > .btn"
    )
    .first()
    .click();
  await expect(page.getByText("Director: test director")).toBeVisible();
  await expect(page.locator("body")).toContainText("Director: test director");
  await expect(page.locator("body")).toContainText("2:30 PM");
  await expect(page.locator("body")).toContainText("5:30 PM");
  await expect(page.locator("body")).toContainText("8:30 PM");
  await expect(page.locator("body")).toContainText("test cast 1");
  await expect(page.locator("body")).toContainText("test cast 2");
  await expect(page.locator("body")).toContainText("test cast 3");
});
