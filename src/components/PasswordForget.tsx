import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { auth } from 'src/firebase'
import { byPropKey } from 'src/components/helpers/forms'

interface Error {
  message: string
}

interface FormState {
  email: string
  error: Error | null
}

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetForm extends PureComponent<any, FormState> {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  public render() {
    const { email, error } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={email}
          required={true}
          onChange={this.handleChange}
        />
        <button disabled={!email} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private byPropKey = (name: string, value: string) => ({
    [name as any]: value,
  })

  private handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    this.setState(this.byPropKey(name, value))
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await auth.doPasswordReset(this.state.email)
      this.setState({ ...INITIAL_STATE })
    } catch (error) {
      this.setState(byPropKey('error', error))
    }
  }
}

const PasswordForgetLink = () => <Link to="/pw-forget">Forgot Password?</Link>

const PasswordForgetPage = () => (
  <>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </>
)

export default PasswordForgetPage
export { PasswordForgetLink, PasswordForgetForm }
