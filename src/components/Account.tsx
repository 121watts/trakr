import React from 'react'
import { PasswordForgetForm } from 'src/components/PasswordForget'
import PasswordChangeForm from 'src/components/PasswordChange'

const Account = ({ authUser }) => (
  <div>
    <h1>Account: {authUser && authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
)

export default Account
