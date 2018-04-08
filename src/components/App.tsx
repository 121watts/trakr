import React, { PureComponent } from 'react'
import { firebase, types } from 'src/firebase'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Navigation from 'src/components/Navigation'
import LandingPage from 'src/components/Landing'
import SignUpPage from 'src/components/SignUp'
import SignInPage from 'src/components/SignIn'
import PasswordForgetPage from 'src/components/PasswordForget'
import HomePage from 'src/components/Home'
import AccountPage from 'src/components/Account'

import * as routes from 'src/constants/routes'

interface State {
  authUser: types.User | null
}

class App extends PureComponent<any, State> {
  constructor(props) {
    super(props)
    this.state = {
      authUser: null,
    }
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      console.warn(authUser)
      if (authUser) {
        return this.setState({ authUser })
      }

      this.setState({ authUser: null })
    })
  }

  public render() {
    return (
      <Router>
        <>
          <Navigation authUser={this.state.authUser} />
          <hr />
          <Switch>
            <Route exact={true} path={routes.LANDING} component={LandingPage} />
            <Route exact={true} path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact={true} path={routes.SIGN_IN} component={SignInPage} />
            <Route
              exact={true}
              path={routes.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact={true} path={routes.HOME} component={HomePage} />
            <Route exact={true} path={routes.ACCOUNT} component={AccountPage} />
          </Switch>
        </>
      </Router>
    )
  }
}

export default App
