import React from 'react'
import { Tab, Container } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Monday', render: () => <Tab.Pane>Monday</Tab.Pane> },
  { menuItem: 'Tuesday', render: () => <Tab.Pane>Tuesday</Tab.Pane> },
  { menuItem: 'Wednesday', render: () => <Tab.Pane>Wednesday</Tab.Pane> },
  { menuItem: 'Thursday', render: () => <Tab.Pane>Thursday</Tab.Pane> },
  { menuItem: 'Friday', render: () => <Tab.Pane>Friday</Tab.Pane> },
  { menuItem: 'Saturday', render: () => <Tab.Pane>Saturday</Tab.Pane> },
  { menuItem: 'Sunday', render: () => <Tab.Pane>Sunday</Tab.Pane> },
]

const MealPlansPage = () => (
  <Container>
    <Tab
      menu={{ fluid: true, vertical: true, tabular: 'right' }}
      panes={panes}
    />
  </Container>
)

export default MealPlansPage
