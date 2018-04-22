import React from 'react'
import { Button } from 'semantic-ui-react'

import { auth } from 'src/firebase'

const SignOut = () => <Button onClick={auth.signOut}>Sign Out</Button>

export default SignOut
