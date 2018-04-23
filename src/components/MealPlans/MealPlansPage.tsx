import React from 'react'
import { Tab } from 'semantic-ui-react'
import MealDay from 'src/components/MealPlans/MealDay'

const panes = [
  {
    menuItem: 'Sunday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Monday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Tuesday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Wednesday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Thursday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Friday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Saturday',
    render: () => (
      <Tab.Pane>
        <MealDay />
      </Tab.Pane>
    ),
  },
]

const MealPlansPage = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
)

export default MealPlansPage
