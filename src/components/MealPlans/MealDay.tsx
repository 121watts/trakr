import React, { PureComponent } from 'react'
import { Accordion } from 'semantic-ui-react'
import Meal from 'src/components/MealPlans/Meal'

const meal = {
  mealID: '1',
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
      mealID: '2',
      name: 'workout',
      time: '8AM (1/2 intra 1/2 post)',
      fats: '0',
      carbs: '20',
    },
    {
      ...meal,
      mealID: '3',
      name: 'meal 2',
      time: '10AM',
      fats: '0',
      carbs: '70',
    },
    { ...meal, mealID: '4', name: 'meal 3', time: '2PM', carbs: '40' },
    { ...meal, mealID: '5', name: 'meal 4', time: '6PM', carbs: '30' },
    { ...meal, mealID: '6', name: 'bedtime', time: 'bedtime' },
  ],
}

interface MealState {
  mealID: string
  name: string
  time: string
  protein: string
  carbs: string
  fats: string
}

interface State {
  activeIndex: number
  meals: MealState[]
}

class MealDay extends PureComponent<any, State> {
  constructor(props) {
    super(props)
    this.state = {
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
            <Meal key={m.mealID} {...m} onChange={this.handleChange} />
          ),
          key: m.mealID,
        }))}
      />
    )
  }

  private handleTitleClick = (e, itemProps): void => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  private handleChange = (e, { id, name, value }): void => {
    const meals = this.state.meals.map(m => {
      if (m.mealID === id) {
        return { ...m, [name]: value }
      }

      return m
    })

    console.warn(meals.length)

    this.setState({ meals })
  }
}

export default MealDay
