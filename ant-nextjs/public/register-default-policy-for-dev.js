/** 
 * Demonstrates the need for default policy in certain scenarios.
 * 
 * Policy is needed for webpack, which is used under the hood by CRA.
 * It's needed for hot reload as well as chunk loading - because webpack
 * preprocess your JS code and divides it into multiple "chunks" which are
 * then downloaded by the browser. These chunks under the hood use DOM sink
 * which is banned when TT are enforced. 
 */

if (!window.trustedTypes) {
  alert("Your web browser doesn't support Trusted Types!");
  throw new Error("Please use compatible browser which supports TT");
}

// Setup default policy which allows assigning the HMR widget.
// Unfortunately, we can't even log the "blessed values" because at this
// moment there are ~4000 violations and it makes page choke on startup.
window.trustedTypes.createPolicy('default', {
  createHTML: (value) => {
    // console.warn('[DEV]: Blessing script URL value', {value})
    return value
  },
  createScript: (value) => {
    // console.warn('[DEV]: Blessing script value', {value})
    return value
  },
  createScriptURL: (value) => {
    // console.warn('[DEV]: Blessing script URL value', {value})
    return value
  },
})

// Print out when the policy was registered. This should be the first thing that is set up.
console.warn('[DEV]: Default policy created!')
