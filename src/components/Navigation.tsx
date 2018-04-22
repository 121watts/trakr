import React, { SFC } from 'react'
import { User } from 'firebase'
import { Link } from 'react-router-dom'

import SignOutButton from 'src/components/SignOut'
import * as routes from 'src/constants/routes'

const NavigationAuth: SFC = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={routes.MEAL_PLANS}>Meal Plans</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth: SFC = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
)

interface Props {
  authUser: User | null
}

const Navigation: SFC<Props> = ({ authUser }) => {
  return <>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</>
}

export default Navigation
