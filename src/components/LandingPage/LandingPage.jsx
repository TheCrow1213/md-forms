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
        let { user, createUser, syncUser } = this.props

        console.log(user)
        if (user.id === null) {
            // initialize new user
            syncUser({
                id: uuidV4()
            })
        }
    }

    onFirstNameChange(event, value) {
        let { user, syncUser } = this.props

        syncUser(Object.assign({}, user, { firstName: value }))
    }

    onLastNameChange(event, value) {
        let { user, syncUser } = this.props

        syncUser(Object.assign({}, user, { lastName: value }))
    }

    onEmailChange(event, value) {
        let { user, syncUser } = this.props

        syncUser(Object.assign({}, user, { email: value }))
    }

    onAwesomeChange(event, value) {
        let { user, syncUser } = this.props

        syncUser(Object.assign({}, user, { awesome: value }))
    }

    onInfoChange(event, value) {
        let { user, syncUser } = this.props

        syncUser(Object.assign({}, user, { info: value }))
    }

    render() {
        let { user, createUser, syncUser } = this.props

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
