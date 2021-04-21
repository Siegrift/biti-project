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

// https://github.com/w3c/webappsec-trusted-types/wiki/Trusted-Types-for-function-constructor
class TrustedFunction {
  static policy = window.trustedTypes.createPolicy('TrustedFunctionWorkaround', {
    createScript: (_, ...args) => {
       args.forEach( (arg) => {
         if (!window.trustedTypes.isScript(arg)) {
           throw new Error("TrustedScripts only, please");
         }
       });
       
       // NOTE: This is insecure without parsing the arguments and body, 
       // Malicious inputs  can escape the function body and execute immediately!
       
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

  constructor(...args) {
    return window.eval(TrustedFunction.policy.createScript('', ...args));
  } 
}

// This seem to work with third party code as well
window.Function = TrustedFunction

// Setup default policy which allows assigning the HMR widget.
window.trustedTypes.createPolicy('default', {
  createHTML: (value) => {
    // TODO: There seems to be a bug that default policy is not called on
    // hot reload even though default policy was the first thing that
    // executed (it's the topmost script in head).
    return value
  },
  createScriptURL: (value) => {
    console.warn('[DEV]: Blessing script value', {value})
    return value
  },
})

// Print out when the policy was registered. This should be the first thing that is set up.
console.warn('[DEV]: Default policy created!')
