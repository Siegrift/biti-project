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

// Setup default policy which allows assigning the HMR widget.
window.trustedTypes.createPolicy('default', {
  createHTML: (value) => {
    // This string is part of the HTML of the error widget
    // Not sure if there is a better way to check this. See:
    // https://github.com/w3c/webappsec-trusted-types/issues/295#issuecomment-823946646
    if (value.includes('<hr><pre>Loading...</pre></div>')) return value
    else return null
  },
})
