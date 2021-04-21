import React from 'react'
import {blessTheSun__unsafe__usingThisMethodCanCauseXss} from '../bless-the-sun-policy'

// Used to bypass React rendering and natively manipulate DOM
// within this element (e.g. add/append/remove subelements).
const PLAYGROUND_ID = 'playground'
const SUN_IMAGE = 'https://www.earthrangers.com/public/content/wildwire/sun-sunglasses.jpg'

const XssDemo = () => {
  const getPlayground = () => document.getElementById(PLAYGROUND_ID)

  const triggerXss = () => {
    getPlayground().insertAdjacentHTML('afterend', `<img src=x onerror="alert('You have xss :)')">`)
  }

  const showPolicyUsage = () => {
    blessTheSun__unsafe__usingThisMethodCanCauseXss(
      getPlayground(), 
      `<img src=${SUN_IMAGE} width=30 height=30 />`
    )
  }

  return (
    <div>
      <h2>Xss panel</h2>
      <button onClick={triggerXss}>Trigger xss (check console for error)</button>
      <button onClick={showPolicyUsage}>Show policy usage</button>
      <div id={PLAYGROUND_ID}></div>
    </div>
  )
}

export default XssDemo
