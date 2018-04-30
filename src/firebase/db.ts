import { db } from './firebase'
import omit from 'lodash/omit'
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

export const createMealPlan = async data => {
  try {
    const ref = await db.collection('mealPlans').add({
      name: 'My Meal Plan',
    })

    return ref.id
  } catch (error) {
    console.warn(error)
    return error
  }
}

export const createMeal = async data => {
  try {
    await db
      .collection('meals')
      .doc()
      .set(data)
  } catch (error) {
    console.warn(error)
    return error
  }
}

// create meals creates all the meals for a particular day
export const createMeals = async ({ meals }) => {
  try {
    const mealIds = await Promise.all(
      meals.map(async meal => {
        const ref = await db.collection('meals').add(omit(meal, ['mealId']))
        return { mealId: ref.id }
      })
    )

    return mealIds
  } catch (error) {
    console.warn(error)
    return error
  }
}

export const addMealsToMealPlan = async ({ day, mealIds, mealPlanId }) => {
  try {
    await db
      .collection('mealPlans')
      .doc(mealPlanId)
      .set(
        {
          [day]: mealIds,
        },
        { merge: true }
      )
  } catch (error) {
    console.warn(error)
    return error
  }
}
