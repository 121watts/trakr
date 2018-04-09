import React, { SFC, ComponentClass, StatelessComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { types } from 'src/firebase'
import * as routes from 'src/constants/routes'

interface ProtectedRouteProps {
  component: ComponentClass<any> | StatelessComponent<any>
  authUser: types.User | null
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

export default ProtectedRoute
