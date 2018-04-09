import React, { PureComponent, SFC } from 'react'
import { types } from 'src/firebase'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'

import Navigation from 'src/components/Navigation'
import LandingPage from 'src/components/Landing'
import SignUpPage from 'src/components/SignUp'
import SignInPage from 'src/components/SignIn'
import PasswordForgetPage from 'src/components/PasswordForget'
import HomePage from 'src/components/Home'
import AccountPage from 'src/components/Account'

import * as routes from 'src/constants/routes'

type AuthUser = types.User | null

interface Props {
  authUser: AuthUser
}

interface ProtectedRouteProps {
  component: any
  authUser: AuthUser
  path: string
  exact: boolean
}

const ProtectedRoute: SFC<ProtectedRouteProps> = ({
  component: Comp,
  authUser,
  path,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return authUser ? (
          <Comp {...props} authUser={authUser} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        )
      }}
    />
  )
}

class App extends PureComponent<Props> {
  public render() {
    const { authUser } = this.props

    return (
      <Router>
        <>
          <Navigation authUser={authUser} />
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
            <ProtectedRoute
              exact={true}
              path={routes.HOME}
              component={HomePage}
              authUser={authUser}
            />
            <ProtectedRoute
              exact={true}
              path={routes.ACCOUNT}
              component={AccountPage}
              authUser={authUser}
            />
          </Switch>
        </>
      </Router>
    )
  }
}

export default App
