# 02-tasks-phase-2-enhancements.md

## Testing and Proof Artifacts

**Note:** Manual testing will be performed for each phase. Proof artifact screenshots and test results will be provided by the user when necessary to demonstrate task completion and functionality.

## Relevant Files

- `options.html` - Options page HTML that needs color picker, preset buttons, spinner indicator, footer, and ARIA labels
- `options.js` - Options page JavaScript that needs enhanced URL validation, domain resolution, color picker handling, preset button logic, live preview, version display, and settings validation
- `options.css` - Options page CSS that needs spinner styles, color picker styling, preset button styles, focus indicators, and transitions
- `newtab.html` - New tab page HTML that needs loading animation structure update
- `newtab.js` - New tab page JavaScript that needs enhanced URL validation (shared with options.js)
- `newtab.css` - New tab page CSS that needs pulsing dot animation styles
- `manifest.json` - Extension manifest (already exists, may need to read version from it)
- `README.md` - New documentation file with installation steps and feature outline

### Notes

- All JavaScript must be external files (no inline scripts) to comply with Manifest V3 Content Security Policy
- Follow existing code style and formatting patterns from current files
- Use chrome.storage.local API for all user preference persistence
- Maintain dark theme aesthetic (#05060a background, #e5e5e5 text) across all pages
- Use system fonts (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif) for consistency
- Preset colors: Midnight Blue (#191970), Charcoal (#36454F), Deep Purple (#2D1B3D), Obsidian (#0B0B0B), Dark Navy (#000080), Dark Slate (#2F4F4F), Rich Black (#05060a), Midnight (#000e34), Dark Slate Gray (#2D2D2D), Deep Indigo (#4B0082)
- Git commit hash should be hardcoded in options.js for now (manual update on each commit)

## Tasks

### [x] 1.0 Enhanced URL Validation with Domain Resolution

#### 1.0 Proof Artifact(s)

- Test: Entering "<https://wut>" shows validation error with example formats demonstrates domain format requirement
- Test: Entering "<https://example.com>" shows spinner then successful resolution indicator demonstrates domain resolution working
- Test: Entering URL and waiting 1 second triggers resolution attempt with spinner demonstrates debounced resolution
- Test: Domain resolution times out after 10 seconds if domain is unreachable demonstrates timeout handling
- Code Review: Domain validation regex pattern and fetch() implementation demonstrates validation logic

#### 1.0 Tasks

- [x] 1.1 Update validateURL function in options.js to require valid domain format (must contain at least one dot and match TLD pattern using regex)
- [x] 1.2 Add domain format validation for web URLs (http/https) while allowing other schemes (chrome://, file://, data:, etc.) without domain validation
- [x] 1.3 Create resolveDomain function that uses fetch() with 10 second timeout to attempt domain resolution
- [x] 1.4 Add debouncing logic using setTimeout/clearTimeout pattern (1 second delay after user stops typing)
- [x] 1.5 Add spinner indicator HTML element to options.html near URL input field
- [x] 1.6 Add CSS spinner animation styles to options.css (small, unobtrusive, matches dark theme)
- [x] 1.7 Add domain resolution status indicator (valid/invalid/resolving) with subtle visual feedback
- [x] 1.8 Update handleURLInput function to trigger debounced domain resolution
- [x] 1.9 Update showURLError function to include example URL formats in error messages
- [x] 1.10 Copy enhanced validateURL function to newtab.js to maintain consistency
- [x] 1.11 Test domain validation rejects incomplete URLs like "<https://wut>"
- [x] 1.12 Test domain resolution shows spinner and resolves valid domains
- [x] 1.13 Test domain resolution times out after 10 seconds for unreachable domains

### [x] 2.0 Loading Animation and Visual Feedback

#### 2.0 Proof Artifact(s)

- Test: Setting redirect delay to 1000ms shows animation for 1 second demonstrates timing behavior
- Test: Setting redirect delay to 0ms shows no animation demonstrates immediate redirect behavior
- Code Review: CSS animation implementation demonstrates CSS-only approach

#### 2.0 Tasks

- [x] 2.1 Update newtab.html to replace "Loading…" text with container div for pulsing dots
- [x] 2.2 Create CSS pulsing dot animation in newtab.css (2-3 dots that fade in and out sequentially)
- [x] 2.3 Style animation to match dark theme (light gray/white dots on dark background)
- [x] 2.4 Update newtab.js to show animation only when redirectDelay > 0
- [x] 2.5 Update newtab.js to hide animation immediately when redirectDelay is 0
- [x] 2.6 Ensure animation is smooth and professional (not jarring)
- [x] 2.7 Test animation displays for 1 second when redirect delay is 1000ms
- [x] 2.8 Test animation does not display when redirect delay is 0ms

### [x] 3.0 Color Customization with Picker and Presets

#### 3.0 Proof Artifact(s)

- Test: Clicking preset button updates color input and options page background demonstrates preset functionality
- Test: Changing color picker updates options page background in real-time demonstrates live preview
- Test: New tab page uses same background color as options page demonstrates color sync
- Test: Smooth color transition visible when changing colors demonstrates CSS transition working
- Code Review: Color picker HTML, preset button implementation, and CSS transitions demonstrates color customization features

#### 3.0 Tasks

- [x] 3.1 Add native HTML5 color input (`<input type="color">`) to options.html alongside existing text input
- [x] 3.2 Create preset color constants array in options.js with 10 classic dark colors and their names
- [x] 3.3 Add 10 preset color buttons to options.html in visually appealing grid or row layout
- [x] 3.4 Style preset buttons in options.css to display color as background with appropriate contrast
- [x] 3.5 Add JavaScript event handlers for preset button clicks that update color input value
- [x] 3.6 Implement bidirectional sync between color picker and text input (changing one updates the other)
- [x] 3.7 Add live preview functionality that updates options page background color in real-time as user types/picks
- [x] 3.8 Add CSS transition (200-300ms) for background-color changes in options.css
- [x] 3.9 Update loadSettings function to apply configured background color to options page on load
- [x] 3.10 Ensure new tab page uses same background color as options page (already implemented, verify it works)
- [x] 3.11 Style native color input to match dark theme in options.css
- [x] 3.12 Test clicking preset button updates color input and options page background
- [x] 3.13 Test changing color picker updates options page background in real-time
- [x] 3.14 Test smooth color transition when changing colors

### [x] 4.0 Accessibility Improvements

#### 4.0 Proof Artifact(s)

- Test: Tab navigation moves through all form elements in logical order demonstrates keyboard navigation
- Test: Enter key submits form when focus is on submit button demonstrates keyboard submission
- Test: Focus indicators visible when tabbing through elements demonstrates focus visibility
- Code Review: ARIA labels present on all inputs and buttons demonstrates accessibility markup
- Test: Screen reader announces form labels and error messages demonstrates screen reader support

#### 4.0 Tasks

- [x] 4.1 Add ARIA labels (aria-label or aria-labelledby) to all form inputs in options.html
- [x] 4.2 Add ARIA labels to all buttons in options.html
- [x] 4.3 Ensure logical Tab order through all form elements (verify natural order is correct)
- [x] 4.4 Add visible focus indicators to options.css for all interactive elements (outline or highlight, blue color for contrast)
- [x] 4.5 Ensure Enter key submits form when focus is on submit button (verify default form behavior works)
- [x] 4.6 Add aria-describedby attributes to associate error messages with their input fields
- [x] 4.7 Add aria-live="polite" to error message containers for screen reader announcements
- [x] 4.8 Add role="status" to success message container
- [x] 4.9 Test Tab navigation moves through all form elements in logical order
- [x] 4.10 Test Enter key submits form when focus is on submit button
- [x] 4.11 Test focus indicators are visible when tabbing through elements
- [x] 4.12 Verify ARIA labels are present on all inputs and buttons via code review

### [x] 5.0 Version Display and Settings Validation

#### 5.0 Proof Artifact(s)

- Test: Loading options page with invalid stored URL shows warning but allows form interaction demonstrates graceful validation
- Test: Version display matches manifest.json version demonstrates correct version reading
- Test: Version display shows both manifest version and git commit hash demonstrates version information display
- Code Review: Settings validation logic shows warning but doesn't prevent usage demonstrates graceful handling

#### 5.0 Tasks

- [x] 5.1 Add footer element to options.html at bottom of container
- [x] 5.2 Create function to read version from manifest.json using chrome.runtime.getManifest()
- [x] 5.3 Hardcode git commit hash constant in options.js (update manually on each commit)
- [x] 5.4 Display version and commit hash in footer as plain text (e.g., "Version: 1.0.0 (abc1234)")
- [x] 5.5 Style footer in options.css to be unobtrusive and match dark theme
- [x] 5.6 Add settings validation function that runs on DOMContentLoaded
- [x] 5.7 Implement validation checks for URL, redirectDelay, and backgroundColor
- [x] 5.8 Show warning messages for invalid stored settings but allow user to continue with defaults
- [x] 5.9 Ensure invalid settings don't block form interaction or page functionality
- [x] 5.10 Test loading options page with invalid stored URL shows warning but allows interaction
- [x] 5.11 Test version display matches manifest.json version
- [x] 5.12 Test version display shows both manifest version and git commit hash

### [x] 6.0 Enhanced Error Handling and README

#### 6.0 Proof Artifact(s)

- Test: Entering invalid URL shows error message with example formats demonstrates helpful error messages
- Test: Entering invalid color shows error with example color formats demonstrates format examples
- File Review: README.md exists with installation steps and feature outline demonstrates documentation
- Code Review: Error message functions include format examples demonstrates enhanced error handling

#### 6.0 Tasks

- [x] 6.1 Update showURLError function to include example URL formats in error message (e.g., "Please enter a valid URL (e.g., <https://example.com>)")
- [x] 6.2 Update showBackgroundColorError function to include example color formats (e.g., "Please enter a valid CSS color (hex: #05060a, rgb: rgb(5,6,10), or named: black)")
- [x] 6.3 Update showRedirectDelayError function to include example format if needed
- [x] 6.4 Ensure error messages appear in appropriate locations and don't overlap content
- [x] 6.5 Create README.md file in project root
- [x] 6.6 Add installation section to README.md with steps for loading extension in Chrome developer mode
- [x] 6.7 Add basic feature outline section to README.md listing key features and configuration options
- [x] 6.8 Format README.md with clear headings and markdown formatting
- [x] 6.9 Test entering invalid URL shows error message with example formats
- [x] 6.10 Test entering invalid color shows error with example color formats
- [x] 6.11 Verify README.md exists with installation steps and feature outline via file review
