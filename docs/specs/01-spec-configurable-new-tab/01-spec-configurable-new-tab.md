# 01-spec-configurable-new-tab.md

## Introduction/Overview

This specification defines the enhancement of the Dark New Tab Homepage Chrome extension to allow users to configure their preferred new tab destination URL through a dedicated options page. The extension will display a dark background immediately when a new tab opens, then redirect to the user-configured URL once the target page is ready. This provides a seamless, customizable new tab experience while maintaining the dark aesthetic and eliminating the white flash commonly seen when opening new tabs.

## Goals

- Enable users to configure their preferred new tab destination URL through a user-friendly options page
- Maintain the dark background display to prevent white flash when opening new tabs
- Implement robust URL validation with helpful error messages
- Support all valid URL formats (HTTP/HTTPS, chrome://, file://, data:, etc.)
- Provide additional customization options (redirect delay, background color) while maintaining minimal design
- Follow Chrome Extension Manifest V3 best practices for security, storage, and user interface

## User Stories

- **As a user**, I want to configure what page loads when I open a new tab so that I can customize my browsing experience
- **As a user**, I want to see a dark background immediately when opening a new tab so that I don't experience a jarring white flash
- **As a user**, I want to configure additional settings like redirect timing and background color so that I can fine-tune my new tab experience
- **As a user**, I want clear validation feedback when entering URLs so that I can correct mistakes easily
- **As a user**, I want my preferences to persist across browser sessions so that I don't have to reconfigure the extension repeatedly

## Demoable Units of Work

### [Unit 1]: Options Page with URL Configuration

**Purpose:** Provide users with a dedicated interface to configure their new tab destination URL with validation and error feedback.

**Functional Requirements:**

- The system shall provide an options page accessible from chrome://extensions or the extension's right-click context menu
- The options page shall include a URL input field with real-time validation
- The system shall validate URL format and display helpful error messages for invalid entries
- The system shall require a valid URL before allowing the extension to function
- The system shall support all valid URL formats including HTTP/HTTPS, chrome://, file://, data:, and other standard URL schemes
- The system shall persist the configured URL using chrome.storage.local API
- The options page shall follow a minimal dark theme design aesthetic matching the new tab page

**Proof Artifacts:**

- Screenshot: Options page displays URL input field with dark theme styling demonstrates configuration interface exists
- Screenshot: Invalid URL entry shows error message below input field demonstrates validation feedback
- Test: Options page saves valid URL to chrome.storage.local and retrieves it on page reload demonstrates persistence works
- Manual: Configure URL in options page, open new tab, verify redirect to configured URL demonstrates end-to-end configuration flow

### [Unit 2]: Additional Settings Configuration

**Purpose:** Allow users to customize redirect timing and background color preferences for enhanced personalization.

**Functional Requirements:**

- The options page shall include a redirect delay setting (configurable timing before redirect)
- The options page shall include a background color customization option
- The system shall validate redirect delay input (must be non-negative number)
- The system shall validate background color input (must be valid CSS color value)
- The system shall persist all settings (URL, redirect delay, background color) using chrome.storage.local API
- The system shall apply configured background color to the new tab page
- The system shall respect configured redirect delay timing before redirecting to target URL

**Proof Artifacts:**

- Screenshot: Options page displays redirect delay and background color input fields demonstrates additional settings available
- Test: Changing background color in options page updates new tab page background color demonstrates color customization works
- Test: Setting redirect delay to 500ms delays redirect by approximately 500ms demonstrates timing control works
- Manual: Configure all settings, verify they persist after browser restart demonstrates settings persistence

### [Unit 3]: Enhanced New Tab Page with Dynamic Configuration

**Purpose:** Update the new tab page to read user configuration from storage and apply settings dynamically.

**Functional Requirements:**

- The new tab page shall read the configured URL from chrome.storage.local on load
- The new tab page shall display the configured background color (or default dark color if not configured)
- The new tab page shall show the dark background immediately upon load
- The system shall redirect to the configured URL after the specified delay (or immediately if delay is 0)
- The system shall handle cases where no URL is configured by showing an error message
- The system shall validate the stored URL before attempting redirect
- The system shall let the browser handle page load errors naturally (no custom error handling needed)

**Proof Artifacts:**

- Screenshot: New tab opens showing dark background with configured color demonstrates immediate background display
- Test: New tab page reads URL from chrome.storage.local and redirects correctly demonstrates dynamic configuration loading
- Manual: Open new tab, observe dark background appears instantly, then redirect occurs demonstrates seamless user experience
- Test: Invalid or missing URL shows error message on new tab page demonstrates validation and error handling

### [Unit 4]: Manifest V3 Compliance and Best Practices

**Purpose:** Ensure the extension follows Chrome Extension Manifest V3 best practices for security, permissions, and structure.

**Functional Requirements:**

- The manifest.json shall use manifest_version 3
- The manifest.json shall declare the "storage" permission for chrome.storage.local API access
- The manifest.json shall declare chrome_url_overrides for newtab page override
- The manifest.json shall declare options_ui with appropriate page path
- The manifest.json shall include appropriate content_security_policy for extension pages
- All JavaScript shall be external files (no inline scripts)
- The extension shall use chrome.storage.local API with proper error handling
- The extension shall follow Chrome Extension security best practices (no eval, no remote code execution)

**Proof Artifacts:**

- Code Review: manifest.json includes all required Manifest V3 fields and permissions demonstrates compliance
- Test: Extension loads without errors in Chrome developer mode demonstrates valid manifest structure
- Code Review: No inline scripts present in HTML files demonstrates security best practices followed
- Test: chrome.storage.local API calls include proper error handling demonstrates robust implementation

## Non-Goals (Out of Scope)

1. **Cross-device synchronization**: User preferences will be stored locally only (chrome.storage.local), not synced across devices via chrome.storage.sync
2. **Popup interface**: Configuration will only be available through the options page, not through a popup interface
3. **Custom error pages**: The extension will not provide custom error handling for failed page loads; the browser's default error handling will be used
4. **Custom extension icon**: The extension will use Chrome's default extension icon rather than a custom icon
5. **URL preview/test functionality**: The options page will not include a preview or test button for URLs
6. **Multiple URL profiles**: Users cannot configure multiple URLs or switch between different new tab destinations
7. **Analytics or tracking**: The extension will not include any analytics, tracking, or telemetry features

## Design Considerations

The options page shall follow a minimal dark theme design aesthetic matching the new tab page:

- Dark background color (#05060a or similar)
- Light text color (#e5e5e5 or similar)
- Clean, simple form layout with adequate spacing
- Clear visual hierarchy for input fields and labels
- Helpful error messages displayed in a non-intrusive manner
- Consistent typography using system fonts (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)

The new tab page shall maintain the existing dark aesthetic:

- Immediate dark background display to prevent white flash
- Smooth transition to configured background color if customized
- Minimal loading indicator if needed (optional, based on redirect delay setting)

## Repository Standards

Follow established repository patterns and conventions:

- Use Manifest V3 structure and best practices
- Maintain consistent code style and formatting
- Use external JavaScript files (no inline scripts)
- Follow Chrome Extension security guidelines
- Use semantic HTML structure
- Apply consistent CSS naming conventions

## Technical Considerations

**Storage API:**

- Use chrome.storage.local API for persisting user preferences
- Implement proper error handling for storage operations
- Handle cases where storage data may be unavailable or corrupted

**URL Validation:**

- Validate URL format using JavaScript URL constructor or regex pattern matching
- Support all standard URL schemes (http, https, chrome, file, data, etc.)
- Provide clear, actionable error messages for invalid URLs

**Redirect Timing:**

- Use setTimeout or requestAnimationFrame for delay implementation
- Ensure redirect occurs smoothly without jarring transitions
- Handle edge cases where delay is set to 0 or very large values

**Content Security Policy:**

- Configure appropriate CSP in manifest.json for extension pages
- Ensure no inline scripts or eval() usage
- Follow Manifest V3 CSP requirements

**Browser Compatibility:**

- Target Chrome browser (Chromium-based browsers)
- Ensure compatibility with latest Chrome Extension APIs
- Test with Manifest V3 requirements

## Security Considerations

**Storage Security:**

- User preferences stored locally only (chrome.storage.local)
- No sensitive data collection or transmission
- Storage data validated before use to prevent injection attacks

**URL Security:**

- Validate all URLs before redirecting to prevent malicious redirects
- Support standard URL schemes but validate format strictly
- No execution of user-provided code

**Content Security Policy:**

- Enforce strict CSP in manifest.json
- No inline scripts allowed
- No remote code execution
- External scripts must be from extension bundle

**Permissions:**

- Request only necessary permissions ("storage" for chrome.storage.local API)
- No host permissions required (extension only overrides newtab page)
- Follow principle of least privilege

**Proof Artifact Security:**

- Screenshots may contain user-configured URLs (ensure no sensitive data in test URLs)
- No credentials or API keys in proof artifacts
- Test data should use example.com or similar non-sensitive domains

## Success Metrics

1. **Functionality**: Extension successfully redirects new tabs to user-configured URL 100% of the time when valid URL is set
2. **User Experience**: Dark background displays immediately (< 50ms) when new tab opens, eliminating white flash
3. **Configuration**: Options page successfully saves and retrieves all user preferences (URL, delay, background color)
4. **Validation**: URL validation correctly identifies invalid URLs and provides helpful error messages
5. **Persistence**: User preferences persist across browser sessions and extension reloads
6. **Compliance**: Extension passes Chrome Web Store review guidelines and Manifest V3 requirements

## Open Questions

No open questions at this time.
