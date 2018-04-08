import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import { History } from 'history'
import { auth } from 'src/firebase'
import { withRouter } from 'react-router-dom'
import { SignUpLink } from 'src/components/SignUp'
import * as routes from '../constants/routes'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

interface Error {
  message: string
}

interface FormState {
  email: string
  password: string
  error: Error | null
}

interface FormProps {
  history: History
}

class SignInForm extends PureComponent<FormProps, FormState> {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  public render() {
    const { email, password, error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          required={true}
          name="email"
          placeholder="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          required={true}
          name="password"
          placeholder="password"
          value={password}
          onChange={this.handleChange}
        />
        {error && <p>{error.message}</p>}
        <button type="submit" disabled={this.isInvalid}>
          Sign In
        </button>
      </form>
    )
  }

  private get isInvalid() {
    return this.state.password === '' || this.state.email === ''
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState(byPropKey(name, value))
  }

  private onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = this.state
    const { history } = this.props

    try {
      await auth.doSignInWithEmailAndPassword(email, password)
      this.setState({ ...INITIAL_STATE })
      history.push(routes.HOME)
    } catch (error) {
      this.setState(byPropKey('error', error))
    }
  }
}

const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
)

export default withRouter(SignInPage)
export { SignInForm }
