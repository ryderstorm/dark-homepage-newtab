# 01-tasks-configurable-new-tab.md

## Testing and Proof Artifacts

**Note:** Manual testing will be performed for each phase. Proof artifact screenshots and test results will be provided by the user when necessary to demonstrate task completion and functionality.

## Relevant Files

- `manifest.json` - Extension manifest file that needs storage permission, options_ui declaration, and content_security_policy for Manifest V3 compliance
- `options.html` - New options page HTML file with dark theme styling for user configuration interface
- `options.js` - New options page JavaScript file for URL validation, settings persistence, and form handling
- `newtab.html` - Existing new tab page HTML that needs to support dynamic background color and error message display
- `newtab.js` - Existing new tab page JavaScript that needs to read configuration from chrome.storage.local and apply settings dynamically

### Notes

- All JavaScript must be external files (no inline scripts) to comply with Manifest V3 Content Security Policy
- Follow existing code style and formatting patterns from current files
- Use chrome.storage.local API for all user preference persistence
- Maintain dark theme aesthetic (#05060a background, #e5e5e5 text) across all pages
- Use system fonts (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif) for consistency

## Tasks

### [x] 1.0 Update Manifest V3 Configuration and Add Storage Permission

#### 1.0 Proof Artifact(s)

- Code Review: manifest.json includes "storage" permission, options_ui declaration, and content_security_policy demonstrates Manifest V3 compliance
- Test: Extension loads without errors in Chrome developer mode with updated manifest demonstrates valid structure
- Code Review: No inline scripts present in HTML files demonstrates security best practices followed

#### 1.0 Tasks

- [x] 1.1 Add "storage" permission to manifest.json permissions array
- [x] 1.2 Add options_ui declaration to manifest.json with page path "options.html" and open_in_tab set to true
- [x] 1.3 Add content_security_policy to manifest.json with extension_pages policy "default-src 'self'" to enforce no inline scripts
- [x] 1.4 Verify newtab.html has no inline scripts (script tags must reference external files only)
- [x] 1.5 Test extension loads in Chrome developer mode without errors

### [x] 2.0 Create Options Page with URL Configuration and Validation

#### 2.0 Proof Artifact(s)

- Screenshot: Options page displays URL input field with dark theme styling demonstrates configuration interface exists
- Screenshot: Invalid URL entry shows error message below input field demonstrates validation feedback
- Test: Options page saves valid URL to chrome.storage.local and retrieves it on page reload demonstrates persistence works
- Manual: Configure URL in options page, verify settings persist after browser restart demonstrates end-to-end configuration flow

#### 2.0 Tasks

- [x] 2.1 Create options.html with basic HTML structure, dark theme meta tag, and dark theme CSS matching newtab.html styling
- [x] 2.2 Add URL input field with label to options.html form
- [x] 2.3 Add save button and error message container div to options.html
- [x] 2.4 Create options.js file with function to validate URL format (support http/https/chrome:///file:///data: schemes)
- [x] 2.5 Implement real-time URL validation on input field that displays error messages for invalid URLs
- [x] 2.6 Add function to save URL to chrome.storage.local with error handling
- [x] 2.7 Add function to load URL from chrome.storage.local and populate input field on page load
- [x] 2.8 Implement save button click handler that validates URL before saving
- [x] 2.9 Add success feedback when URL is saved successfully
- [x] 2.10 Link options.js to options.html with script tag

### [x] 3.0 Add Additional Settings (Redirect Delay and Background Color)

#### 3.0 Proof Artifact(s)

- Screenshot: Options page displays redirect delay and background color input fields demonstrates additional settings available
- Test: Changing background color in options page saves to chrome.storage.local demonstrates color customization persistence
- Test: Setting redirect delay saves to chrome.storage.local demonstrates timing control persistence
- Manual: Configure all settings (URL, delay, color), verify they persist after browser restart demonstrates complete settings persistence

#### 3.0 Tasks

- [x] 3.1 Add redirect delay input field (number type) with label to options.html
- [x] 3.2 Add background color input field (color type or text with validation) with label to options.html
- [x] 3.3 Add validation function for redirect delay (must be non-negative number, handle edge cases)
- [x] 3.4 Add validation function for background color (must be valid CSS color value - hex, rgb, named colors)
- [x] 3.5 Update options.js save function to include redirectDelay and backgroundColor in storage object
- [x] 3.6 Update options.js load function to retrieve and populate redirectDelay and backgroundColor fields
- [x] 3.7 Add real-time validation feedback for redirect delay and background color inputs
- [x] 3.8 Update save button handler to validate all fields (URL, delay, color) before saving
- [x] 3.9 Set default values if settings don't exist (delay: 0, backgroundColor: "#05060a")

### [x] 4.0 Update New Tab Page to Use Dynamic Configuration

#### 4.0 Proof Artifact(s)

- ~Screenshot: New tab opens showing dark background with configured color demonstrates immediate background display~ Manually tested and confirmed.
- Test: New tab page reads URL from chrome.storage.local and redirects correctly demonstrates dynamic configuration loading
- Test: New tab page applies configured background color from storage demonstrates color customization works
- Test: New tab page respects configured redirect delay timing demonstrates timing control works
- Manual: Open new tab, observe dark background appears instantly, then redirect occurs after configured delay demonstrates seamless user experience
- Test: Invalid or missing URL shows error message on new tab page demonstrates validation and error handling

#### 4.0 Tasks

- [x] 4.1 Update newtab.js to read configuration from chrome.storage.local on page load with error handling
- [x] 4.2 Apply configured background color to body element immediately (or use default #05060a if not set)
- [x] 4.3 Validate stored URL before attempting redirect (reuse validation logic from options.js or create shared utility)
- [x] 4.4 Implement redirect delay logic using setTimeout, respecting configured delay value (0 = immediate redirect)
- [x] 4.5 Handle case where URL is missing or invalid by displaying error message instead of redirecting
- [x] 4.6 Update newtab.html to include error message container div (initially hidden)
- [x] 4.7 Style error message to match dark theme aesthetic
- [x] 4.8 Remove hardcoded DASHBOARD_URL constant from newtab.js
- [x] 4.9 Update loading text to be more generic or remove if redirect is immediate
- [x] 4.10 Test with various URL formats (http, https, chrome://, file://) to ensure all work correctly
