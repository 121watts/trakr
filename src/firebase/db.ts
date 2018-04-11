import { db } from './firebase'

// user api
export const doCreateUser = (id, email) =>
  db
    .collection('users')
    .doc(id)
    .set({
      email,
    })

export const onceGetUsers = async () => {
  try {
    const usersSnapshot = await db.collection('users').get()
    usersSnapshot.forEach(user => console.warn(user.data()))
  } catch (error) {
    console.warn(error)
    return error
  }
}
