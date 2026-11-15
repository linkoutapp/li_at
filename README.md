<p align="center">
  <a href="https://github.com/linkoutapp/brand" aria-label="Linkout brand assets">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/linkoutapp/brand/main/scraper-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/linkoutapp/brand/main/scraper-transparent.svg">
      <img src="https://raw.githubusercontent.com/linkoutapp/brand/main/scraper-transparent.svg" alt="Linkout" width="128">
    </picture>
  </a>
</p>

# Linkout extension

View the LinkedIn session cookie in a Chrome extension popup. The extension uses Manifest V3 and requests cookie access only for `https://www.linkedin.com/*`.

## Install

1. Clone this repository.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Choose **Load unpacked** and select the repository folder.

## Use

Sign in to LinkedIn in Chrome, then click the Linkout extension icon. The popup reads the `li_at` cookie for LinkedIn. It does not run a background listener, collect other sites' cookies, or log cookie values.

Treat the cookie like a password. Do not paste it into chat, logs, screenshots, or untrusted sites. The current [Linkout scraper](https://github.com/linkoutapp/linkout-scraper) connects to an existing local Chrome session; its setup does not require this extension.

## Development

Use Node.js 22 or newer. There are no npm dependencies.

```sh
npm test
node --check popup.js
```

Tests use synthetic cookies. They do not read your browser or sign in to LinkedIn.
