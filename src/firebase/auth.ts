import { auth } from './firebase'
import { types } from './index'

// sign up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
): Promise<types.User> => auth.createUserWithEmailAndPassword(email, password)

// sign in
export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<void> => auth.signInWithEmailAndPassword(email, password)

// sign out
export const signOut = (): Promise<void> => auth.signOut()

// password reset
export const doPasswordReset = (email: string): Promise<void> =>
  auth.sendPasswordResetEmail(email)

// password change
export const doPasswordUpdate = (password: string): Promise<void> | null => {
  if (!auth.currentUser) {
    return null
  }

  return auth.currentUser.updatePassword(password)
}
