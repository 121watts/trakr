import { db } from './firebase'

// user api
export const doCreateUser = (id, email) =>
  db.ref(`users/${id}`).set({
    email,
  })

export const onceGetUsers = () => db.ref('users').once('value')
