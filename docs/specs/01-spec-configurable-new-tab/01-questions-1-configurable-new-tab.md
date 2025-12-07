# [01] Questions Round 1 - Configurable New Tab

Please answer each question below (select one or more options, or add your own notes). Feel free to add additional context under any question.

## 1. User Configuration Interface

How should users configure their new tab URL?

- [x] (A) Options page (dedicated settings page accessible from chrome://extensions or right-click menu)
- [ ] (B) Popup interface (click extension icon to open small popup with settings)
- [ ] (C) Both options page and popup interface
- [ ] (D) Inline configuration directly on the new tab page itself
- [ ] (E) Other (describe)

## 2. URL Validation and Default Behavior

What should happen when a user enters an invalid URL or no URL is configured?

- [x] (A) Require a valid URL before allowing the extension to work (show error message)
- [ ] (B) Use a sensible default URL (e.g., chrome://newtab or a blank page) if none is set
- [ ] (C) Show the dark background but don't redirect anywhere if URL is invalid/missing
- [x] (D) Validate URL format and show helpful error messages for invalid entries
- [ ] (E) Other (describe)

## 3. URL Format Support

What types of URLs should be supported?

- [ ] (A) Only HTTP/HTTPS URLs (standard web pages)
- [ ] (B) HTTP/HTTPS URLs plus chrome:// URLs (like chrome://newtab, chrome://bookmarks)
- [x] (C) Any valid URL format including file://, data:, etc.
- [ ] (D) HTTP/HTTPS only, but with validation for proper URL format
- [ ] (E) Other (describe)

## 4. Dark Background Display

How should the dark background be displayed before redirecting?

- [ ] (A) Show dark background immediately, then redirect after a fixed delay (e.g., 100ms)
- [x] (B) Show dark background immediately, redirect as soon as the target page is ready
- [ ] (C) Show dark background with loading indicator, then redirect
- [ ] (D) Show dark background only if redirect takes longer than X milliseconds
- [ ] (E) Other (describe)

## 5. Error Handling

What should happen if the configured URL fails to load?

- [ ] (A) Show an error message on the dark background page
- [ ] (B) Redirect to a fallback URL (e.g., chrome://newtab)
- [ ] (C) Show the dark background indefinitely with an error message
- [ ] (D) Automatically retry loading the URL
- [x] (E) Other: do nothing, just let the browser handle the issue with the page load

## 6. Storage and Persistence

How should user preferences be stored?

- [x] (A) Use chrome.storage.local (persists locally, not synced across devices)
- [ ] (B) Use chrome.storage.sync (syncs across user's Chrome instances)
- [ ] (C) Use chrome.storage.local with option to use sync if user prefers
- [ ] (D) No preference - use best practice default
- [ ] (E) Other (describe)

## 7. Options Page Design

What should the options page include?

- [ ] (A) Simple URL input field with save button
- [x] (B) URL input field plus additional settings (e.g., redirect delay, background color customization)
- [ ] (C) URL input field with URL validation feedback and preview/test button
- [x] (D) Minimal design matching the dark theme aesthetic
- [ ] (E) Other (describe)

## 8. Extension Icon and Branding

Should the extension have a custom icon or use default Chrome extension icon?

- [x] (A) Use default Chrome extension icon
- [ ] (B) Create a simple custom icon (e.g., dark-themed icon)
- [ ] (C) No preference - use best practice default
- [ ] (D) Other (describe)
