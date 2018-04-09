import React, { SFC, PureComponent, ChangeEvent, FormEvent } from 'react'
import { auth } from 'src/firebase'
import { byPropKey } from 'src/components/helpers/forms'
import { Error } from 'src/types'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

interface FormState {
  passwordOne: string
  passwordTwo: string
  error: Error | null
}

class PasswordChangeForm extends PureComponent<{}, FormState> {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  public render() {
    const { passwordOne, passwordTwo, error } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="password"
          placeholder="new password"
          onChange={this.handleChange}
          required={true}
          value={passwordOne}
        />
        <input
          type="password"
          placeholder="confirm password"
          onChange={this.handleChange}
          required={true}
          value={passwordTwo}
        />
        <button disabled={this.isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private get isInvalid() {
    const { passwordOne, passwordTwo } = this.state

    return passwordOne !== passwordTwo
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState(byPropKey(name, value))
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { passwordOne } = this.state

    try {
      await auth.doPasswordUpdate(passwordOne)
      this.setState({ ...INITIAL_STATE })
    } catch (error) {
      this.setState(byPropKey('error', error))
    }
  }
}

const PasswordChange: SFC = () => (
  <div>
    <h1>Password Change</h1>
    <PasswordChangeForm />
  </div>
)

export default PasswordChange
