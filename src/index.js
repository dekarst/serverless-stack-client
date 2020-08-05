import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import * as serviceWorker from './serviceWorker'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    font-family: "Rowdies", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`

ReactDOM.render(
  <Router>
    <App />
    <GlobalStyle />
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
