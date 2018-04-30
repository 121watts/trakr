import React, { ReactNode } from 'react'
import { firebase, types, db } from 'src/firebase'

interface User {
  email: string
  mealPlans: string[]
}

interface State {
  authUser: types.AuthUser | null
  user: User | null
}

interface Props {
  render: (State) => ReactNode
}

class WithAuth extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      authUser: null,
      user: null,
    }
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const user = await db.getUser(authUser.uid)
        return this.setState({ authUser, user })
      }

      console.warn('user no longer authed')
      this.setState({ authUser: null })
    })
  }

  public render() {
    return this.props.render(this.state)
  }
}

export default WithAuth
