/** 
 * Demonstrates the need for default policy in certain scenarios.
 *
 * Policy is needed for webpack, which is used under the hood by NextJS and certain other
 * development features. 
 */

if (!window.trustedTypes) {
  alert("Your web browser doesn't support Trusted Types!");
  throw new Error("Please use compatible browser which supports TT");
}

// Setup default policy which allows assigning the HMR widget and proper chunk loading and routing.
window.trustedTypes.createPolicy('default', {
  // e.g. https://github.com/vercel/next.js/blob/9baee888afa1519796510cd1ebca07ee54d17e87/packages/next/client/dev/dev-build-watcher.js#L99
  createHTML: (value) => {
    console.warn('[DEV]: Blessing HTML value', {value})
    return value
  },
  createScript: (value) => {
    // e.g. for webpack chunks which use eval under the hood.
    console.warn('[DEV]: Blessing script value', {value})
    return value
  },
  createScriptURL: (value) => {
    // e.g. for webpack chunks https://github.com/webpack/webpack/blob/6b6342e94be36b09342b69938fbcd4d1f18c0f8b/lib/web/JsonpMainTemplatePlugin.js#L166
    console.warn('[DEV]: Blessing script URL value', {value})
    return value
  },
})

// Print out when the policy was registered. This should be the first thing that is set up.
console.warn('[DEV]: Default policy created!')
