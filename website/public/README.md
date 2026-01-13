# Public Assets

This directory contains static assets served by Next.js.

## Required Files

You need to add the following image files:

### Favicon
- **favicon.ico** - Traditional favicon (16x16, 32x32, 48x48 sizes)
  - You can generate this from the `favicon.svg` file using a tool like [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)

### App Icons
- **icon.png** - 512x512px PNG for PWA and general use
- **apple-icon.png** - 180x180px PNG for Apple devices

### OpenGraph Image
- **og-image.jpg** - 1200x630px JPG for social media sharing
  - Should be placed in the root `public/` folder
  - Will be referenced as `/og-image.jpg` in metadata

## Generating Icons

You can use online tools to generate all required sizes:
1. [Favicon Generator](https://realfavicongenerator.net/) - Upload a 512x512 image, generates all sizes
2. [Favicon.io](https://favicon.io/) - Simple favicon generator
3. [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) - CLI tool for PWA icons

## Current Status

- ✅ `manifest.json` - PWA manifest configured
- ✅ `favicon.svg` - SVG favicon (modern browsers)
- ⚠️ `favicon.ico` - **NEEDS TO BE ADDED** (generate from SVG)
- ⚠️ `icon.png` - **NEEDS TO BE ADDED** (512x512px)
- ⚠️ `apple-icon.png` - **NEEDS TO BE ADDED** (180x180px)
- ⚠️ `og-image.jpg` - **NEEDS TO BE ADDED** (1200x630px)

## Design Guidelines

- Use the brand color (#F59E0B / #D97706) as primary
- Keep designs simple and recognizable at small sizes
- Ensure good contrast for visibility
- The "LM" monogram from `favicon.svg` can be used as a base

