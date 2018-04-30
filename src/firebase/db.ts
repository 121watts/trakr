import { db } from './firebase'
// import { User } from 'src/types'

// user api
export const doCreateUser = (id, email) =>
  db
    .collection('users')
    .doc(id)
    .set({
      email,
    })

export const getUser = async id => {
  try {
    const ref = await db.collection('users').doc(id)
    const doc = await ref.get()
    return doc.data()
  } catch (error) {
    console.warn(error)
    return error
  }
}

export const createMealPlan = async () => {
  return null
  // try {
  //   const ref
  // } catch (error) {
  //   console.warn(error)
  //   return error
  // }
}
