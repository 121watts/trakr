import React, { ReactNode } from 'react'
import { firebase, types } from 'src/firebase'

interface State {
  authUser: types.User | null
}

interface Props {
  render: (State) => ReactNode
}

class WithAuth extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      authUser: null,
    }
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        return this.setState({ authUser })
      }

      this.setState({ authUser: null })
    })
  }

  public render() {
    return this.props.render(this.state)
  }
}

export default WithAuth
