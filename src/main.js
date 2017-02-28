import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { browserHistory } from 'react-router'
import AppContainer from './containers/AppContainer'

injectTapEventPlugin()

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
let render = (routerKey = null) => {
  const { appRoutes } = require('./routes/index')
  ReactDOM.render(
    <AppContainer
      history={browserHistory}
      routes={appRoutes()}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()
