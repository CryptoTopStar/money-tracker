import React from 'react'
import CurrencyInput from '../CurrencyInput'
import { currencyName } from '../../../data/currency'
import { Table, Checkbox } from 'semantic-ui-react'

const CurrencyTable = ({ currencies, balance, onChecked, updateBalance }) => (
  <Table basic="very" celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{ width: '50%' }}>
          Currency
        </Table.HeaderCell>
        <Table.HeaderCell>Initial Balance</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {currencies.map(code => {
        return (
          <Table.Row key={code}>
            <Table.Cell>
              <Checkbox
                checked={balance[code] !== undefined}
                onChange={onChecked}
                value={code}
                label={currencyName(code)}
              />
            </Table.Cell>
            <Table.Cell>
              <CurrencyInput
                value={balance[code]}
                code={code}
                update={updateBalance}
              />
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
)

export default CurrencyTable
