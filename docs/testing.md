# Testing Guide

This document provides comprehensive guidance on the test suite setup, patterns, and best practices for the Dark New Tab Homepage Chrome extension.

## Overview

The test suite uses [Playwright](https://playwright.dev/) for end-to-end testing of the Chrome extension. Tests are written in TypeScript and follow the Page Object Model (POM) pattern for maintainability and reusability.

### Key Features

- **Playwright Fixtures**: Custom fixtures handle extension loading, page management, and storage operations
- **Page Object Model**: Encapsulates page interactions in reusable classes
- **Automatic Cleanup**: Fixtures handle page creation and cleanup automatically
- **Storage Helpers**: Convenient methods for setting/getting/clearing `chrome.storage.local`
- **Test Data Constants**: Centralized test URLs and data

## Test Structure

```text
tests/
├── fixtures.ts              # Custom Playwright fixtures
├── test-data.ts            # Test constants (URLs, etc.)
├── installation.spec.ts    # Extension installation tests
├── newtab.spec.ts          # New tab page functionality tests
├── options.spec.ts         # Options page functionality tests
├── e2e.spec.ts             # End-to-end workflow tests
└── page-objects/
    ├── NewTabPage.ts       # Page Object for new tab page
    └── OptionsPage.ts      # Page Object for options page
```

## Playwright Fixtures

Custom fixtures are defined in `tests/fixtures.ts` and extend Playwright's base test with Chrome extension-specific functionality.

### Available Fixtures

#### `context`

Provides a `BrowserContext` with the Chrome extension loaded.

```typescript
test("example", async ({ context }) => {
  // Context is automatically created with extension loaded
  // Automatically closed after test
});
```

#### `extensionId`

Retrieves the extension ID from the loaded extension.

```typescript
test("example", async ({ extensionId }) => {
  console.log(extensionId); // e.g., "abcdefghijklmnopqrstuvwxyz123456"
});
```

#### `page`

Provides a Playwright `Page` instance with automatic cleanup.

```typescript
test("example", async ({ page }) => {
  // Page is automatically created and closed
  await page.goto("chrome://newtab");
});
```

#### `newTabPage`

Provides a `NewTabPage` Page Object instance. The page is not automatically opened - call `openNewTab()` after setting storage.

```typescript
test("example", async ({ newTabPage, setStorage }) => {
  await setStorage({ url: "https://example.com" });
  await newTabPage.openNewTab(); // Open after storage is set
  await expect(newTabPage.getLoadingAnimation()).toBeVisible();
});
```

### Storage Helpers

#### `setStorage(data)`

Sets values in `chrome.storage.local`. Must be called before opening pages that read from storage.

```typescript
test("example", async ({ setStorage }) => {
  await setStorage({
    url: "https://example.com",
    redirectDelay: 1000,
    backgroundColor: "#ff0000",
  });
});
```

#### `getStorage(keys?)`

Retrieves values from `chrome.storage.local`.

```typescript
test("example", async ({ getStorage }) => {
  const storage = await getStorage(["url", "redirectDelay"]);
  console.log(storage.url);
});
```

#### `clearStorage()`

Clears all values from `chrome.storage.local`.

```typescript
test("example", async ({ clearStorage }) => {
  await clearStorage();
  // Storage is now empty
});
```

## Page Object Model

Page Objects encapsulate page interactions and locators, making tests more maintainable and readable.

### Example: NewTabPage

```typescript
import { NewTabPage } from "./page-objects/NewTabPage";

test("example", async ({ newTabPage, setStorage }) => {
  await setStorage({ url: "https://example.com" });
  await newTabPage.openNewTab();

  // Use Page Object methods instead of direct locators
  await expect(newTabPage.getLoadingAnimation()).toBeVisible();
  const bgColor = await newTabPage.getBackgroundColor();
});
```

### Creating New Page Objects

1. Create a class in `tests/page-objects/`
2. Accept `Page` in constructor
3. Encapsulate locators and actions as methods
4. Return `Locator` instances for assertions

Example:

```typescript
import { Page, Locator } from "@playwright/test";

export class MyPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getMyElement(): Locator {
    return this.page.locator("#my-element");
  }

  async doSomething(): Promise<void> {
    await this.page.click("#button");
  }
}
```

Then add a fixture in `tests/fixtures.ts`:

```typescript
import { MyPage } from "./page-objects/MyPage";

// In ExtensionFixtures type:
myPage: MyPage;

// In test.extend:
myPage: async ({ page }, use) => {
  const myPage = new MyPage(page);
  await use(myPage);
},
```

## Test Data Constants

Use constants from `tests/test-data.ts` for consistent test URLs:

```typescript
import { TEST_URLS } from "./test-data";

test("example", async ({ setStorage }) => {
  await setStorage({
    url: TEST_URLS.EXAMPLE_COM, // Instead of hardcoding URLs
  });
});
```

Available constants:

- `TEST_URLS.EXAMPLE_COM` - IANA reserved domain (primary test URL)
- `TEST_URLS.HTTPBIN_ORG` - HTTP testing service
- `TEST_URLS.GOOGLE_COM` - Real-world HTTPS URL
- `TEST_URLS.HTTPSTAT_US` - HTTP status code testing service
- `TEST_URLS.CHROME_VERSION` - Chrome internal page
- `TEST_URLS.JSONPLACEHOLDER` - JSON API for testing

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

### Run Specific Test File

```bash
npx playwright test tests/newtab.spec.ts
```

### List All Tests

```bash
npm run test:list
```

### Run Tests with Specific Reporter

```bash
npx playwright test --reporter=list
npx playwright test --reporter=html
```

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from "./fixtures";
import { TEST_URLS } from "./test-data";

test.describe("Feature Name", () => {
  test("should do something", async ({ setStorage, newTabPage }) => {
    // 1. Set up test data (storage, etc.)
    await setStorage({
      url: TEST_URLS.EXAMPLE_COM,
      redirectDelay: 1000,
    });

    // 2. Perform actions
    await newTabPage.openNewTab();

    // 3. Assert results
    await expect(newTabPage.getLoadingAnimation()).toBeVisible();
  });
});
```

### Test Flow Pattern

1. **Set Storage First**: Always set storage before opening pages that read from it
2. **Open Page**: Call `openNewTab()` or navigate to the page
3. **Wait for State**: Use Playwright's waiting mechanisms (`waitForURL`, `toBeVisible`, etc.)
4. **Assert**: Verify expected behavior

```typescript
test("example", async ({ setStorage, newTabPage, page }) => {
  // Step 1: Set storage
  await setStorage({
    url: TEST_URLS.EXAMPLE_COM,
    redirectDelay: 500,
  });

  // Step 2: Open page
  await newTabPage.openNewTab();

  // Step 3: Wait for redirect
  await page.waitForURL(TEST_URLS.EXAMPLE_COM, { timeout: 2000 });

  // Step 4: Assert
  expect(page.url()).toContain("example.com");
});
```

## Best Practices

### 1. Use Fixtures Instead of Manual Setup

✅ **Good**: Use fixtures for automatic cleanup

```typescript
test("example", async ({ newTabPage, setStorage }) => {
  await setStorage({ url: "https://example.com" });
  await newTabPage.openNewTab();
  // Page automatically cleaned up
});
```

❌ **Bad**: Manual page management

```typescript
test("example", async ({ context }) => {
  const page = await context.newPage();
  // ... test code ...
  await page.close(); // Easy to forget!
});
```

### 2. Set Storage Before Opening Pages

✅ **Good**: Set storage first

```typescript
test("example", async ({ setStorage, newTabPage }) => {
  await setStorage({ url: "https://example.com" });
  await newTabPage.openNewTab(); // Page reads from storage
});
```

❌ **Bad**: Open page before setting storage

```typescript
test("example", async ({ newTabPage, setStorage }) => {
  await newTabPage.openNewTab(); // Too early!
  await setStorage({ url: "https://example.com" });
});
```

### 3. Use Page Objects for Interactions

✅ **Good**: Use Page Object methods

```typescript
const bgColor = await newTabPage.getBackgroundColor();
await expect(newTabPage.getLoadingAnimation()).toBeVisible();
```

❌ **Bad**: Direct locator access

```typescript
const bgColor = await page.evaluate(() => {
  return window.getComputedStyle(document.body).backgroundColor;
});
await expect(page.locator("#loading")).toBeVisible();
```

### 4. Use Test Data Constants

✅ **Good**: Use constants

```typescript
await setStorage({ url: TEST_URLS.EXAMPLE_COM });
```

❌ **Bad**: Hardcoded URLs

```typescript
await setStorage({ url: "https://example.com" });
```

### 5. Use Descriptive Test Names

✅ **Good**: Clear, descriptive names

```typescript
test("should display error message when URL is invalid", async ({ ... }) => {
```

❌ **Bad**: Vague names

```typescript
test("test error", async ({ ... }) => {
```

### 6. Wait for Async Operations

✅ **Good**: Wait for state changes

```typescript
await page.waitForURL(testUrl, { timeout: 2000 });
await expect(newTabPage.getErrorMessage()).toBeVisible({ timeout: 2000 });
```

❌ **Bad**: Fixed timeouts (when possible)

```typescript
await page.waitForTimeout(2000); // Use only when necessary
```

## Common Patterns

### Testing Storage Persistence

```typescript
test("should persist settings", async ({ setStorage, getStorage }) => {
  await setStorage({ url: TEST_URLS.EXAMPLE_COM });
  const storage = await getStorage(["url"]);
  expect(storage.url).toBe(TEST_URLS.EXAMPLE_COM);
});
```

### Testing Error States

```typescript
test("should show error for invalid URL", async ({
  setStorage,
  newTabPage,
}) => {
  await setStorage({ url: "not-a-valid-url" });
  await newTabPage.openNewTab();
  await expect(newTabPage.getErrorMessage()).toBeVisible();
});
```

### Testing Default Values

```typescript
test("should use default color", async ({ setStorage, newTabPage }) => {
  await setStorage({
    url: TEST_URLS.EXAMPLE_COM,
    // backgroundColor not set - should use default
  });
  await newTabPage.openNewTab();
  const bgColor = await newTabPage.getBackgroundColor();
  expect(bgColor).toBe("rgb(5, 6, 10)"); // Default #05060a
});
```

## Troubleshooting

### Extension Not Loading

If tests fail with "Extension not loaded" errors:

1. Verify `manifest.json` exists at project root
2. Check that extension path is resolved correctly in `fixtures.ts`
3. Ensure Chrome/Chromium is installed

### Storage Not Persisting

If storage operations fail:

1. Ensure `setStorage()` is called before opening pages
2. Storage helpers navigate to `chrome://newtab` to access `chrome.storage` API
3. Check that storage keys match what the extension expects

### Page Not Found Errors

If pages can't be found:

1. Verify extension ID is retrieved correctly
2. Check that extension files are accessible
3. Ensure `chrome://newtab` loads the extension's `newtab.html`

### Flaky Tests

If tests are flaky:

1. Increase timeouts for slow operations
2. Use Playwright's waiting mechanisms (`waitForURL`, `toBeVisible`, etc.)
3. Avoid fixed `waitForTimeout()` calls when possible
4. Check for race conditions in test setup

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Chrome Extension Testing Guide](https://playwright.dev/docs/chrome-extensions)
