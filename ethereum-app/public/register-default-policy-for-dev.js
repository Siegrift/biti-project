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

// inspired by
// https://github.com/w3c/webappsec-trusted-types/wiki/Trusted-Types-for-function-constructor
const trustedFunctionWorkaround = window.trustedTypes.createPolicy('TrustedFunctionWorkaround', {
  createScript: (...args) => {
    args.forEach((arg) => {
      if (!window.trustedTypes.isScript(arg)) {
        // this error will never be user visible. TODO: raise issue
        throw new Error("TrustedScripts only, please");
       }
     });
     
     // NOTE: This is insecure without parsing the arguments and body, 
     // Malicious inputs can escape the function body and execute immediately!
     
     const fnArgs = args.slice(0, -1).join(',');
     const fnBody = args.pop().toString();
     const body = `(function anonymous(
     ${fnArgs}
     ) {
     ${fnBody}
     })`;
     return body;
  }
});
const TrustedFunction = (...args) => {
  console.warn('[DEV]: Blessing Function constructor value', ...args)
  return window.eval(trustedFunctionWorkaround.createScript(...args));
}
TrustedFunction.prototype = {}
TrustedFunction.prototype.apply = Function.apply
TrustedFunction.apply = Function.apply

// This seem to work with third party code as well It is needed for metamask extension - but I am
// not sure for what reason. It seems to work even without it. TODO: determine why
window.Function = TrustedFunction

// Setup default policy which allows assigning the HMR widget.
window.trustedTypes.createPolicy('default', {
  createHTML: (value) => {
    // Unfortunately, default policy is not called on hot reload even though the script containing
    // default policy code was the first script loaded on page. This is actually, intended
    // behaviour. See:
    // https://w3c.github.io/webappsec-trusted-types/dist/spec/#cross-document-vectors
    console.warn('[DEV]: Blessing HTML value', {value})
    return value
  },
  // needed for webpack code reloading
  createScriptURL: (value) => {
    console.warn('[DEV]: Blessing script value', {value})
    return value
  },
})

// Print out when the policy was registered. This should be the first thing that is set up.
console.warn('[DEV]: Default policy created!')
