import React, { ChangeEvent, FormEvent, SFC, PureComponent } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

import { auth, db } from 'src/firebase'
import { byPropKey } from 'src/components/helpers/forms'
import * as routes from 'src/constants/routes'

interface SignUpFormState {
  email: string
  passwordOne: string
  passwordTwo: string
  error: string
}

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: '',
}

class SignUpForm extends PureComponent<any, SignUpFormState> {
  state = INITIAL_STATE

  public render() {
    const { error, email, passwordOne, passwordTwo } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          name="email"
          value={email}
          type="text"
          placeholder="Email Address"
          required={true}
        />
        <input
          onChange={this.handleChange}
          name="passwordOne"
          value={passwordOne}
          type="password"
          placeholder="Password"
          required={true}
        />
        <input
          onChange={this.handleChange}
          name="passwordTwo"
          value={passwordTwo}
          type="password"
          placeholder="Confirm Password"
          required={true}
        />
        <button disabled={this.isInvalid} type="submit">
          Sign Up
        </button>
        {error}
      </form>
    )
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, passwordOne } = this.state
    const { history } = this.props

    try {
      const authUser = await auth.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      )

      // create a user in the database
      await db.doCreateUser(authUser.uid, email)

      this.setState({ ...INITIAL_STATE })
      history.push(routes.HOME)
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    this.setState(byPropKey(name, value))
  }

  private get isInvalid(): boolean {
    const { passwordOne, passwordTwo, email } = this.state
    const isPassMatching = passwordOne === passwordTwo
    return !isPassMatching || !email || !passwordOne || !passwordTwo
  }
}

const SignUpPage: SFC<RouteComponentProps<{}>> = ({ history }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
)

const SignUpLink: SFC = () => (
  <p>
    Don't have an account?
    <Link to={routes.SIGN_UP}>sign up</Link>
  </p>
)

export default withRouter(SignUpPage)

export { SignUpForm, SignUpLink }
