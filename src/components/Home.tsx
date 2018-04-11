import React, { PureComponent } from 'react'
import { db } from 'src/firebase'

class Users extends PureComponent<any, any> {
  state = {
    users: [],
  }

  async componentDidMount() {
    const users = db.onceGetUsers()
    this.setState({ users }, () => console.warn(this.state))
  }

  public render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

export default Users
