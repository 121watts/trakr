import React from 'react'

import { auth } from 'src/firebase'

const SignOut = () => (
  <button type="button" onClick={auth.signOut}>
    Sign Out
  </button>
)

export default SignOut
