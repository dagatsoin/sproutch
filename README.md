# Sproutch

A cross platefrom UI library for React and React Native Android/iOS.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm version](https://badge.fury.io/js/%40sproutch%2Fui.svg)](https://badge.fury.io/js/%40sproutch%2Fui)
[![Gitter chat](https://badges.gitter.im/sproutch/community.png)](https://gitter.im/sproutch/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

## Installation

Sproutch depends on two peer dependencies:
- ReactXP: the cross plateform base elements library which sproutch is built upon
- ExpoKit: bringing some basic components such `Svg` and `LinearGradient`

To install Sproutch and its dependencies:
- If you target a web project or an expo/crna project:

  `$ npm i @sproutch/ui reactxp`

- If you target raw (without expo) React Native **(I did not test yet, please, fill an issue if it crashes)**

  `$ npm i @sproutch/ui reactxp expo`

## Live demo and components doc

We use Storybook both for Web and Native.
As a cross plateform UI, the API is the same for both Native and Web version. 
You will find the doc for each component in the Note tab of its story:
- For Native: https://expo.io/@dagatsoin/sproutch
- For Web: https://dagatsoin.github.io/sproutch

## Contribution

PRs are close for now. I prefer to reach a stable version and write a clear contribution guidance first.

If you find a bug, please fill an issue. I am also on Gitter to chat.

