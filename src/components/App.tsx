import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Navigation from 'src/components/Navigation'
import LandingPage from 'src/components/Landing'
import SignUpPage from 'src/components/SignUp'
import SignInPage from 'src/components/SignIn'
import PasswordForgetPage from 'src/components/PasswordForget'
import HomePage from 'src/components/Home'
import AccountPage from 'src/components/Account'

import * as routes from 'src/constants/routes'

const App = () => (
  <Router>
    <>
      <Navigation />
      <hr />
      <Switch>
        <Route
          exact={true}
          path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact={true}
          path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
        <Route
          exact={true}
          path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact={true}
          path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
        <Route exact={true} path={routes.HOME} component={() => <HomePage />} />
        <Route
          exact={true}
          path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
      </Switch>
    </>
  </Router>
)

export default App
