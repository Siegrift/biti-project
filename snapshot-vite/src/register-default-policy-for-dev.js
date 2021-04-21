/** 
 * Demonstrates the need for default policy in certain scenarios.
 * 
 * The policy is needed for snowpack hot reload error widget to work properly.
 * Upon saving file with code changes, snowpack triggers a page refresh
 * (hard reload) and if there is an error it will prompt a nice widget with
 * error description and stack trace. Unfortunately, it uses Element.innerHTML
 * assignment under the hood which is banned by Trusted Types. 
 * 
 * See:
 * https://github.com/snowpackjs/snowpack/blob/fc6c1417a09ac85e02730033660391d299a5fd97/snowpack/assets/hmr-error-overlay.js#L891
 */

if (!window.trustedTypes) {
  alert("Your web browser doesn't support Trusted Types!");
  throw new Error("Please use compatible browser which supports TT");
}

// Vite has a module for HMR stylesheet updates and injects the styles to the page.
// https://github.com/vitejs/vite/blob/c61b3e4e413a7f182b9c40bd5ff2c688e50e107f/packages/vite/src/client/client.ts#L229
//
// Unfortunately, section 1.1 in specification:
// https://w3c.github.io/webappsec-trusted-types/dist/spec/#html-validate-the-string-in-context
// defines the sink type to be always the generic `Element` and not the concrete
// Element type (e.g. HTMLStyleElement) so we have to use heuristic here.
const isCssValue = (css) => {
  return css.includes('@media')
}

// Setup default policy which allows assigning the HMR widget.
window.trustedTypes.createPolicy('default', {
  createHTML: (value) => {
    if (isCssValue(value)) {
      console.warn('[DEV]: Blessing unknown value because it "seems" to be a css value', {value})
      return value;
    } else return null
  },
})
