import React, { PureComponent } from 'react'
import { Tab, Header } from 'semantic-ui-react'
import { withRouter, RouteComponentProps } from 'react-router'
import { db } from 'src/firebase'

import MealDay from 'src/components/MealPlans/MealDay'
const NEW = 'new'
const EDIT = 'edit'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

interface State {
  mealPlanId: string | null
}

class MealPlansPage extends PureComponent<RouteComponentProps<any>, State> {
  state = {
    mealPlanId: null,
  }

  async componentDidMount() {
    if (this.mode !== 'new') {
      return
    }

    const mealPlanId = await db.createMealPlan()
    this.setState({ mealPlanId })
  }

  public render() {
    return (
      <>
        <Header as="h2">{this.header}</Header>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: 'right' }}
          panes={this.panes}
        />
      </>
    )
  }

  private get panes(): { menuItem: string; render: () => JSX.Element }[] {
    const render = () => (
      <Tab.Pane>
        <MealDay mealPlanId={this.state.mealPlanId} />
      </Tab.Pane>
    )

    return days.map(day => ({
      menuItem: day,
      render,
    }))
  }

  private get header(): string {
    if (this.props.match.path.includes('new')) {
      return 'Create Your Meal Plan'
    }

    return 'Meal Plan'
  }

  private get mode(): string {
    if (this.props.match.path.includes('new')) {
      return NEW
    }

    return EDIT
  }
}
export default withRouter(MealPlansPage)
