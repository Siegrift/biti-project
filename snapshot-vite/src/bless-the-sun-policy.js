/** 
 * Demonstrates the correct usage of TT policy - it should NOT be exported from the creation module.
 * Instead, you should create very simple and imperative functions which allow to be bypass the
 * TT checks - you can then much better guard their usage (and restrict it) in your code.
 * 
 * Another use case is to produce TT object from sanitized values, but usually projects just need
 * the whitelist for certain operations (e.g. injecting markdown in React).
 */

if (!window.trustedTypes) {
  alert("Your web browser doesn't support Trusted Types!");
  throw new Error("Please use compatible browser which supports TT");
}

const trustedTypesPolicy = window.trustedTypes.createPolicy('bless-the-sun', {
  createHTML: (anyHTMLString) => anyHTMLString
})

// Security could be improved even more by restricting the usage of this function inside
// only inside the component(s) that need it. As of now this is a generic function that
// allows anyone to use however they like.
export const blessTheSun__unsafe__usingThisMethodCanCauseXss = (container, sunImageHTML) => {
  container.insertAdjacentHTML('afterend', trustedTypesPolicy.createHTML(sunImageHTML))
}
