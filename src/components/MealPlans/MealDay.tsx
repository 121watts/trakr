import React, { PureComponent } from 'react'
import { Accordion, Button } from 'semantic-ui-react'
import Meal from 'src/components/MealPlans/Meal'
import uuid from 'uuid'
import { db } from 'src/firebase'

const meal = {
  mealId: uuid.v4(),
  time: '6:00AM',
  name: 'meal 1',
  protein: '30',
  fats: '7.5',
  carbs: '30',
}

const INITIAL_STATE = {
  activeIndex: 0,
  meals: [
    meal,
    {
      ...meal,
      mealId: uuid.v4(),
      name: 'workout',
      time: '8AM (1/2 intra 1/2 post)',
      fats: '0',
      carbs: '20',
    },
    {
      ...meal,
      mealId: uuid.v4(),
      name: 'meal 2',
      time: '10AM',
      fats: '0',
      carbs: '70',
    },
    { ...meal, mealId: uuid.v4(), name: 'meal 3', time: '2PM', carbs: '40' },
    { ...meal, mealId: uuid.v4(), name: 'meal 4', time: '6PM', carbs: '30' },
    { ...meal, mealId: uuid.v4(), name: 'bedtime', time: 'bedtime' },
  ],
}

interface MealState {
  mealId: string
  name: string
  time: string
  protein: string
  carbs: string
  fats: string
}

interface State {
  mealPlanId: string | null
  activeIndex: number
  meals: MealState[]
  status: string
}

interface Props {
  day: string
  mealPlanId: string | null
}

class MealDay extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      mealPlanId: this.props.mealPlanId,
      ...INITIAL_STATE,
      status: 'done',
    }
  }

  public render() {
    const { activeIndex } = this.state
    return (
      <>
        <Accordion
          defaultActiveIndex={activeIndex}
          onTitleClick={this.handleTitleClick}
          panels={this.state.meals.map((m, itemIndex) => ({
            itemIndex,
            title: m.name,
            content: itemIndex === this.state.activeIndex && (
              <Meal
                key={m.mealId}
                {...m}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            ),
            key: m.mealId,
          }))}
        />
        <Button loading={this.isLoading} onClick={this.handleSubmit}>
          Save
        </Button>
      </>
    )
  }

  private get isLoading(): boolean {
    return this.state.status === 'loading'
  }

  private handleSubmit = async () => {
    const { meals } = this.state
    const { day, mealPlanId } = this.props

    try {
      const mealIds = await db.createMeals({ meals })
      await db.addMealsToMealPlan({ day, mealIds, mealPlanId })
    } catch (error) {
      console.warn(error)
    }
  }

  private handleTitleClick = (e, itemProps): void => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  private handleChange = (e, { id, name, value }): void => {
    const meals = this.state.meals.map(m => {
      if (m.mealId === id) {
        return { ...m, [name]: value }
      }

      return m
    })

    this.setState({ meals })
  }
}

export default MealDay
