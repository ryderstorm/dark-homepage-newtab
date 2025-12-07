# [02] Questions Round 1 - Phase 2 Enhancements

Please answer each question below (select one or more options, or add your own notes). Feel free to add additional context under any question.

## 1. URL Validation Improvements

The current URL validation accepts incomplete URLs like "<https://wut>" because it only checks URL format, not domain validity. How should we improve this?

- [x] (A) Require valid domain format (must have at least one dot and valid TLD pattern)
- [x] (B) Require valid domain format AND attempt to resolve the domain (more strict)
- [ ] (C) Keep current validation but add a warning for potentially invalid domains
- [ ] (D) Only validate URL format strictly (reject incomplete URLs like "<https://wut>")
- [ ] (E) Other (describe)

## 2. Loading Indicator/Animation

The new tab page currently shows static "Loading…" text. What type of loading indicator should we implement?

- [ ] (A) CSS spinner animation (rotating circle)
- [x] (B) Pulsing/dot animation (dots that fade in and out) (still css only)
- [ ] (C) Progress bar animation
- [ ] (D) Keep text but add subtle fade/pulse animation to the text itself
- [ ] (E) Other (describe)

## 3. Color Picker Implementation

For the background color picker in the options page, what type of picker should we use?

- [x] (A) Native HTML5 color input (`<input type="color">`)
- [ ] (B) Custom color picker component (more control over design)
- [ ] (C) Both native color input AND text input (user can type or pick)
- [ ] (D) Text input with color preview swatch next to it
- [ ] (E) Other (describe)

## 4. Preset Color Themes

For preset color themes, which colors should be included and how should they be presented?

- [x] (A) 10 preset buttons (midnight blue, charcoal, deep purple, etc.) that replace the color input value when clicked. search the web for classic dark colors and present them in a classy way
- [ ] (B) 3-5 preset buttons that appear alongside the color picker as quick-select options
- [ ] (C) Dropdown menu with preset options plus custom option
- [ ] (D) Include 8-10 preset colors covering a range of dark themes
- [ ] (E) Other (describe)

## 5. Background Color Preview

For live preview of background color in the options page:

- [x] (A) Preview should update the options page background color in real-time as user types/picks
- [ ] (B) Preview should show a small swatch/preview box that updates, but not the full page
- [ ] (C) Preview should update both a preview box AND the page background
- [ ] (D) No live preview needed, just apply when settings are saved
- [ ] (E) Other (describe)

## 6. Disable Redirect Option

For the "disable redirect" toggle option:

- [ ] (A) When enabled, show blank dark page with loading indicator but never redirect
- [ ] (B) When enabled, show blank dark page with a message like "Redirect disabled"
- [ ] (C) When enabled, show blank dark page with option to manually trigger redirect via button
- [ ] (D) When enabled, show blank dark page with no loading indicator
- [x] (E) Other (describe) - changed my mind, skip this feature.

## 7. Test URL Button

For the "Test URL" button in the options page:

- [ ] (A) Button opens the configured URL in a new tab when clicked
- [ ] (B) Button opens the configured URL in current tab (replacing options page)
- [ ] (C) Button opens the configured URL in a new tab AND validates it's accessible
- [ ] (D) Button should be disabled if URL is invalid
- [x] (E) Other (describe) - this is irrelevant because of 1B. For 1B, as the user types in teh domain field, it should wait for 1 sec after typing has stopped, then automatically try to resolve and show the user the result in a very subtle way.

## 8. Fade Transition

For the fade transition when applying background color:

- [x] (A) Smooth CSS transition (e.g., 200-300ms) when background color changes
- [ ] (B) Fade-in animation when new tab page first loads
- [ ] (C) Both: fade-in on load AND smooth transition when color changes
- [ ] (D) No fade transition needed
- [ ] (E) Other (describe)

## 9. Accessibility Improvements

Which accessibility improvements are highest priority?

- [ ] (A) Add ARIA labels to all form inputs and buttons
- [ ] (B) Ensure keyboard navigation works (Tab order, Enter to submit)
- [ ] (C) Add visible focus indicators for keyboard users
- [x] (D) All of the above
- [ ] (E) Other (describe)

## 10. Version Display

For showing the version/git commit hash in the options page footer:

- [x] (A) Display as plain text in footer (e.g., "Version: abc1234")
- [ ] (B) Display as a clickable link that opens git repository (if available)
- [ ] (C) Display with a tooltip showing full commit message
- [x] (D) Display version from manifest.json AND git commit hash
- [ ] (E) Other (describe)

## 11. Settings Validation on Load

When invalid settings are detected on page load:

- [x] (A) Show warning message but allow user to continue with defaults
- [ ] (B) Automatically fix invalid settings to defaults without user interaction
- [ ] (C) Show error message and require user to fix before proceeding
- [ ] (D) Log warning to console but don't show UI message
- [ ] (E) Other (describe)

## 12. Graceful Error Handling

For improved error messages with suggested fixes:

- [ ] (A) Show specific error message with suggested action (e.g., "Invalid URL. Did you mean <https://example.com>?")
- [ ] (B) Show error message with link to relevant documentation or help
- [ ] (C) Show error message with "Fix it" button that attempts auto-correction
- [x] (D) Show error message with examples of valid formats
- [ ] (E) Other (describe)

## 13. README.md Content

What should be included in the README.md file?

- [ ] (A) Basic installation and usage instructions
- [ ] (B) Installation, usage, configuration options, and troubleshooting
- [ ] (C) Full documentation including development setup, contributing guidelines, and feature list
- [x] (D) Minimal README with just installation steps and basic feature outline
- [ ] (E) Other (describe)

## 14. Feature Priority

Are all Phase 2 features equally important, or should some be prioritized/deferred?

- [x] (A) All features should be included in this spec
- [ ] (B) Some features can be marked as "nice to have" and deferred if needed
- [ ] (C) Focus on core UX improvements first (loading indicator, color picker, URL validation)
- [ ] (D) Other (describe)
