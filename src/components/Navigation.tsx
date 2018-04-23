import React, { SFC, PureComponent } from 'react'
import { User } from 'firebase'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import SignOutButton from 'src/components/SignOut'
import * as routes from 'src/constants/routes'

class ActiveNav extends PureComponent<any, any> {
  state = {
    active: this.active,
  }

  public render() {
    return (
      <>{this.props.render({ ...this.state, onClick: this.handleClick })}</>
    )
  }

  private handleClick = (e, { name }): void => {
    this.setState({ active: name })
  }

  private get active(): string {
    return this.props.activeUser ? 'home' : 'landing'
  }
}

const NavigationAuth = ({ active, onClick }) => (
  <>
    <Menu.Item
      as={Link}
      to={routes.LANDING}
      content="Landing"
      name="landing"
      onClick={onClick}
      active={active === 'landing'}
    />
    <Menu.Item
      as={Link}
      content="Today"
      name="home"
      to={routes.HOME}
      onClick={onClick}
      active={active === 'home'}
    />
    <Menu.Item
      as={Link}
      name="account"
      content="Account"
      to={routes.ACCOUNT}
      onClick={onClick}
      active={active === 'account'}
    />
    <Menu.Item
      as={Link}
      name="plans"
      content="Meal Plans"
      onClick={onClick}
      to={routes.MEAL_PLANS}
      active={active === 'plans'}
    />
    <Menu.Menu position="right">
      <Menu.Item content={<SignOutButton />} />
    </Menu.Menu>
  </>
)

const NavigationNonAuth = ({ active, onClick }) => (
  <>
    <Menu.Item
      active={active === 'landing'}
      content={<Link to={routes.LANDING}>Landing</Link>}
      name="landing"
      onClick={onClick}
    />
    <Menu.Menu position="right">
      <Menu.Item
        as={Link}
        name="sign-in"
        onClick={onClick}
        to={routes.SIGN_IN}
        active={active === 'signin'}
      />
    </Menu.Menu>
  </>
)

interface Props {
  authUser: User | null
}

const Navigation: SFC<Props> = ({ authUser }) => {
  return (
    <Menu>
      {authUser ? (
        <ActiveNav
          authUser={authUser}
          render={props => <NavigationAuth {...props} />}
        />
      ) : (
        <ActiveNav
          authUser={authUser}
          render={props => <NavigationNonAuth {...props} />}
        />
      )}
    </Menu>
  )
}

export default Navigation
