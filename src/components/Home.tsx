import React, { PureComponent } from 'react'
import { Header, Table, Checkbox } from 'semantic-ui-react'

class Today extends PureComponent<any, any> {
  public render() {
    return (
      <>
        <Header as="h1" content={this.date} textAlign="center" />
        <Table striped={true} compact={true} celled={true} definition={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Meal</Table.HeaderCell>
              <Table.HeaderCell>Lean Protein</Table.HeaderCell>
              <Table.HeaderCell>Healthy Fats</Table.HeaderCell>
              <Table.HeaderCell>Heal Carbs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center" collapsing={true}>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center" collapsing={true}>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center" collapsing={true}>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>Jill Lewis</Table.Cell>
              <Table.Cell>May 11, 2014</Table.Cell>
              <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    )
  }

  private get date(): string {
    return new Date().toDateString()
  }
}

export default Today
