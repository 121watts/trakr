import React, { PureComponent } from 'react'
import { Accordion } from 'semantic-ui-react'
import Meal from 'src/components/MealPlans/Meal'

const meal = {
  mealId: '1',
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
      mealId: '2',
      name: 'workout',
      time: '8AM (1/2 intra 1/2 post)',
      fats: '0',
      carbs: '20',
    },
    {
      ...meal,
      mealId: '3',
      name: 'meal 2',
      time: '10AM',
      fats: '0',
      carbs: '70',
    },
    { ...meal, mealId: '4', name: 'meal 3', time: '2PM', carbs: '40' },
    { ...meal, mealId: '5', name: 'meal 4', time: '6PM', carbs: '30' },
    { ...meal, mealId: '6', name: 'bedtime', time: 'bedtime' },
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
}

class MealDay extends PureComponent<any, State> {
  constructor(props) {
    super(props)
    this.state = {
      mealPlanId: this.props.mealPlanId,
      ...INITIAL_STATE,
    }
  }

  public render() {
    const { activeIndex } = this.state
    return (
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
    )
  }

  private handleSubmit = (): void => {
    // create n meals and apply n mealIds to this users meal plan

    console.warn(this.state)
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

    console.warn(meals.length)

    this.setState({ meals })
  }
}

export default MealDay
