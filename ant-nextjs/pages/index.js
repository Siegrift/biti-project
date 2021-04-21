import Router from 'next/router'
import dynamic from 'next/dynamic'

const content = {
  marginTop: '100px',
}

const DynamicScript = dynamic(() => import('./script'), { ssr: false })

// This example demonstrates how using default policy might hurt the safety of the app
// and make it hard to notice potential attacks. 
//
// We need to use "very blessing" policy, because there are many violations in different
// parts of nextjs (client, server, hot reloading module, webpack...).
//
// However, when the default policy is active we can't block many attack vectors
// introduced by the code.
//
// Another big problem is server side rendering, which are out of scope of TT but there
// are experiments of configuring TT with domino (for apps that use domino - e.g. angular)
// https://github.com/fgnass/domino/issues/171
// Unfortunataly, emularing DOM has it's own problems and React is not using DOM emulation.
// Instead, they use string rendered to create HTML string markup from React components.
export default class Home extends React.Component {
  state = {
    untrustedHrefText: '',
    untrustedHref: '',
    html: '',
    nodes: [],
    untrustedHtml: '',
    untrustedNodes: [],
    iframe: false,
  }

  render() {
    return (
      <div style={content}>
        <div>
          <button onClick={() => Router.push('/about')}>About route</button>
          <button onClick={() => Router.push('/nonExistent')}>
            Non-existent route
          </button>
        </div>

        {/* These ones are interesting. If you navigate to these pages via router then they will */}
        {/* be rendered only on the client side and react will prevent script execution (= no xss) */}
        {/* But if you refresh the page, it will be server side rendered and TT won't prevent */}
        {/* the reflected xss - which is not really in scope of TT */}
        <div>
          <button onClick={() => Router.push('/script')}>Render script</button>
          <button onClick={() => Router.push('/dangerous')}>Script URL</button>
        </div>

        {/* Try: javascript:alert(0) */}
        {/* It will get executed, but there will be a red warning that React will not support */}
        {/* javascript URLs in future releases. Trusted Types are also not guarding against this */}
        {/* attack vector because it was unreasonable complex to guard all the URLs of an app */}
        {/* and most of the application use (safe) URLs and only a very small portion (mainly legacy) */}
        {/* apps use javascript URLs now.*/}
        {/* In case the app uses TT and javascript URLs, the value will be passed through default. */}
        {/* policy first and only afterwards executed. */}
        <p>
          {this.state.untrustedHref && (
            <a href={this.state.untrustedHref}>Link with NON trusted href</a>
          )}
          <input
            type="text"
            value={this.state.untrustedHrefText}
            onChange={(e) =>
              this.setState({ untrustedHrefText: e.target.value })
            }
          />
          <button
            onClick={() =>
              this.setState((s) => ({ untrustedHref: s.untrustedHrefText }))
            }
          >
            Set untrusted href
          </button>
        </p>

        {/* Try: <img src=x onerror=alert(0) /> */}
        <p>
          Add node with NON trusted dangerouslySetInnerHTML
          <input
            type="text"
            value={this.state.untrustedHtml}
            onChange={(e) => this.setState({ untrustedHtml: e.target.value })}
          />
          <button
            onClick={() =>
              this.setState((s) => ({
                untrustedNodes: [...s.untrustedNodes, s.untrustedHtml],
              }))
            }
          >
            Add NON trusted node
          </button>
        </p>

        {/* React can't execute dynamic scripts: react-dom/src/client/ReactDOMComponent.js */}
        <DynamicScript />

        {/* Will try to add iframe with srcdoc. */}
        <p>
          <button onClick={() => this.setState({ iframe: true })}>
            Add unsecure iframe
          </button>
          {this.state.iframe && (
            <iframe srcDoc={'<script>alert(0)</script>'}></iframe>
          )}
        </p>
      </div>
    )
  }
}
