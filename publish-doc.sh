#!/bin/sh
#git subtree push --prefix packages/doc/storybook-static origin gh-pages
git push origin :gh-pages && git subtree push --prefix packages/doc/storybook-static origin gh-pages
