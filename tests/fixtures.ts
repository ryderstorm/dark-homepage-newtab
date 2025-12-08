import { test as base, expect, chromium, BrowserContext, Page } from '@playwright/test';
import * as path from 'path';
import { existsSync } from 'fs';

// Resolve extension path (one level up from tests directory)
const pathToExtension = path.join(__dirname, '..');

// Verify manifest exists
if (!existsSync(path.join(pathToExtension, 'manifest.json'))) {
  throw new Error('Extension manifest.json not found at: ' + pathToExtension);
}

// Define fixtures type
type ExtensionFixtures = {
  context: BrowserContext;
  extensionId: string;
  setStorage: (data: Record<string, any>) => Promise<void>;
  getStorage: (keys?: string | string[]) => Promise<Record<string, any>>;
  clearStorage: () => Promise<void>;
};

// Extend base test with extension fixtures
export const test = base.extend<ExtensionFixtures>({
  // Context fixture: loads Chrome extension
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      headless: false, // Extensions require non-headless mode
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });

    await use(context);

    await context.close();
  },

  // Extension ID fixture: retrieves extension ID from service worker
  extensionId: async ({ context }, use) => {
    // Wait for service worker to be available
    const [serviceWorker] = await Promise.all([
      context.waitForEvent('serviceworker'),
    ]);

    // Get extension ID from service worker URL
    // Service worker URL format: chrome-extension://<extension-id>/service-worker.js
    const serviceWorkerUrl = serviceWorker.url();
    const extensionIdMatch = serviceWorkerUrl.match(/chrome-extension:\/\/([a-z]{32})/);
    
    if (!extensionIdMatch) {
      throw new Error('Could not extract extension ID from service worker URL: ' + serviceWorkerUrl);
    }

    const extensionId = extensionIdMatch[1];
    await use(extensionId);
  },

  // Storage helper: set storage values
  setStorage: async ({ context }, use) => {
    await use(async (data: Record<string, any>) => {
      // Get any page from context to access chrome.storage API
      const pages = context.pages();
      let page: Page;
      
      if (pages.length > 0) {
        page = pages[0];
      } else {
        // Create a new page if none exists
        page = await context.newPage();
      }

      await page.evaluate((storageData) => {
        return new Promise<void>((resolve) => {
          chrome.storage.local.set(storageData, () => {
            resolve();
          });
        });
      }, data);
    });
  },

  // Storage helper: get storage values
  getStorage: async ({ context }, use) => {
    await use(async (keys?: string | string[]) => {
      // Get any page from context to access chrome.storage API
      const pages = context.pages();
      let page: Page;
      
      if (pages.length > 0) {
        page = pages[0];
      } else {
        // Create a new page if none exists
        page = await context.newPage();
      }

      return await page.evaluate((storageKeys) => {
        return new Promise<Record<string, any>>((resolve) => {
          chrome.storage.local.get(storageKeys || null, (result) => {
            resolve(result);
          });
        });
      }, keys);
    });
  },

  // Storage helper: clear storage
  clearStorage: async ({ context }, use) => {
    await use(async () => {
      // Get any page from context to access chrome.storage API
      const pages = context.pages();
      let page: Page;
      
      if (pages.length > 0) {
        page = pages[0];
      } else {
        // Create a new page if none exists
        page = await context.newPage();
      }

      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          chrome.storage.local.clear(() => {
            resolve();
          });
        });
      });
    });
  },
});

export { expect };

