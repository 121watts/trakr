import React, { PureComponent, ChangeEvent } from 'react'
import { Segment, Form, Input } from 'semantic-ui-react'

interface InputData {
  name: string
  value: string
}

interface Props {
  mealID: string
  name: string
  time: string
  protein: string
  carbs: string
  fats: string
  notes?: string
  onChange: (e: ChangeEvent<HTMLInputElement>, data: InputData) => void
}

class Meal extends PureComponent<Props> {
  render() {
    const { mealID, time, protein, carbs, fats, name, onChange } = this.props

    return (
      <Form>
        <Segment>
          <Form.Group>
            <Form.Field
              id={mealID}
              control={Input}
              name="name"
              value={name}
              onChange={onChange}
              label="name"
              placeholder="name your meal"
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id={mealID}
              control={Input}
              name="time"
              value={time}
              onChange={onChange}
              label="time"
              placeholder="meal time"
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              id={mealID}
              control={Input}
              name="protein"
              value={protein}
              onChange={onChange}
              label="lean protein"
              placeholder="grams protein"
              type="number"
              width="2"
            />
            <Form.Field
              id={mealID}
              control={Input}
              name="fats"
              value={fats}
              onChange={onChange}
              label="healthy fats"
              placeholder="grams fats"
              type="number"
              width="2"
            />
            <Form.Field
              id={mealID}
              control={Input}
              name="carbs"
              value={carbs}
              onChange={onChange}
              label="healthy carbs"
              placeholder="healthy carbs"
              type="number"
              width="2"
            />
          </Form.Group>
        </Segment>
      </Form>
    )
  }
}

export default Meal
