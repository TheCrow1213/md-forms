import React from 'react'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectSheet from 'react-jss'

const muiTheme = getMuiTheme({
  fontFamily: "'Montserrat', sans-serif"
})

const styles = {
    '@global': {
        '*': {
            fontFamily: "'Montserrat', sans-serif"
        }
    },
    'layout': {
        width: '75vw',
        margin: '10vh auto 0',
        textAlign: 'center'
    }
}

class DefaultLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
        let { classes, sheet, children } = this.props

        return <MuiThemeProvider muiTheme={muiTheme}>
            <div className={classes.layout}>
                <Paper style={{ padding: '2vh 5vw' }} zDepth={2}>{children}</Paper>
            </div>
        </MuiThemeProvider>
    }
}

export default injectSheet(styles)(DefaultLayout)