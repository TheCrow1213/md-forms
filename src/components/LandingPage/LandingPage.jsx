import React from 'react'
import uuidV4 from 'uuid/v4'

import MarkdownForm from '../MarkdownForm'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onAwesomeChange = this.onAwesomeChange.bind(this)
        this.onInfoChange = this.onInfoChange.bind(this)
    }

    componentDidMount() {
        let { user, createUser, userUpdated } = this.props

        console.log(user)
        if (user.id) {
            // refresh from server here?
            // redux-localstorage will restore from browser cache
        }
        else {
            // initialize new user
            userUpdated({
                id: uuidV4()
            })
        }
    }

    onFirstNameChange(event, value) {
        let { userUpdated } = this.props

        userUpdated({ firstName: value })
    }

    onLastNameChange(event, value) {
        let { userUpdated } = this.props

        userUpdated({ lastName: value })
    }

    onEmailChange(event, value) {
        let { userUpdated } = this.props

        userUpdated({ email: value })
    }

    onAwesomeChange(event, value) {
        let { userUpdated } = this.props

        userUpdated({ awesome: value })
    }

    onInfoChange(event, value) {
        let { userUpdated } = this.props

        userUpdated({ info: value })
    }

    render() {
        let { user, createUser, userUpdated } = this.props

        return <div>
            <MarkdownForm {...user}
                onFirstNameChange={this.onFirstNameChange}
                onLastNameChange={this.onLastNameChange}
                onEmailChange={this.onEmailChange}
                onAwesomeChange={this.onAwesomeChange}
                onInfoChange={this.onInfoChange}
            />
        </div>
    }
}
