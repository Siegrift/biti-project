# biti-project

> BITI = Bezpečnosť IT infraštruktúry

School project for security of IT infrastructure.

## Goals

The aim of the project is to analyze how [Trusted Types (TT)](https://web.dev/trusted-types/#:~:text=Trusted%20Types%20give%20you%20the,is%20available%20for%20other%20browsers.) work out
together with bundlers.

I already investiageted some bundlers (mainly webpack) in the past, while working on TT support for
react. I'd like to revisit this topic and target (and actually try out) modern bundlers such as
[esbuild](https://esbuild.github.io/) or [snowpack](https://www.snowpack.dev/) which use the native
ES modules and skip the bundle concatenation.

## Inspired by

The snapshot projects were reused from https://github.com/Elliotclyde/build-tool-test
for which I am grateful.

The ethereum project was intended to verify whether TT work with browser extension. The
project is intended to be used in combination with metamask.

The nextjs example was inspired by my previous work at Google internship and was basically
copy-pasted from https://github.com/Siegrift/nextjs-tt-integration/tree/master/example-app.

## Instructions

Every snapshot folder is a version of the same project. You can install deps with
`npm install` and check `package.json` for available commands.

Make sure you have at least node `v12` - the vite example requires it.
