import React, { PropTypes } from 'react'
import { Router } from 'react-router'

class AppContainer extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        routerKey: PropTypes.number
    }

    render () {
        const { history, routes, routerKey } = this.props

        return (
          <Router history={history} children={routes} key={routerKey} />
        )
    }
}

export default AppContainer
