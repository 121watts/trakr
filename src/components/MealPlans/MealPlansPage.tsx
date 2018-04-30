import React, { PureComponent } from 'react'
import { Tab, Header } from 'semantic-ui-react'
import { withRouter, RouteComponentProps } from 'react-router'
import { db, types } from 'src/firebase'

import MealDay from 'src/components/MealPlans/MealDay'
const NEW = 'new'
const EDIT = 'edit'

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

interface Props extends RouteComponentProps<any> {
  authUser: types.AuthUser
}

interface State {
  mealPlanId: string | null
}

class MealPlansPage extends PureComponent<Props, State> {
  state = {
    mealPlanId: null,
  }

  async componentDidMount() {
    if (this.mode !== 'new') {
      // getMealPlan
      return
    }

    const mealPlanId = await db.createMealPlan(this.props.authUser.uid)
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

  private get panes(): {
    menuItem: string
    render: () => JSX.Element
  }[] {
    return days.map(day => ({
      menuItem: day.toUpperCase(),
      render: () => (
        <Tab.Pane>
          <MealDay mealPlanId={this.state.mealPlanId} day={day} />
        </Tab.Pane>
      ),
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
