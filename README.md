# Storybook Addon HTML Validator
[![GitHub license](https://img.shields.io/github/license/dimafirsov/storybook-html-validator.svg)](https://github.com/dimafirsov/storybook-html-validator/blob/main/LICENSE)
[![Weekly loads](https://img.shields.io/npm/dm/storybook-html-validator)](https://img.shields.io/npm/dm/storybook-html-validator)
[![Release](https://github.com/dimafirsov/storybook-html-validator/actions/workflows/release.yml/badge.svg)](https://github.com/dimafirsov/storybook-html-validator/actions/workflows/release.yml)

This addon validates the HTML of your stories with the help of https://validator.w3.org/.

## Usage

To use the addon simply register it in the `addons` config array:
```
  addons: [
    'storybook-addon-html-validator',
  ],
```

## Installation

```cmd
npm i storybook-html-validator -D
```

Inspired by [Addon-Kit](https://github.com/storybookjs/addon-kit)
