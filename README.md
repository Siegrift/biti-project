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
