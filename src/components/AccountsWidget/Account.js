import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import Amount from '../Amount'

const Account = ({ account, removeAccount }) => (
  <div className="account-widget-account">
    <div className="account-widget-account__name">{account.name}</div>
    {removeAccount &&
      <div className="account-widget-account__remove">
        <Icon
          name="trash"
          color="grey"
          style={{ cursor: 'pointer' }}
          onClick={() => removeAccount(account.id)}
        />
      </div>}
    <div className="account-widget-account__balance">
      {account.currencies.map(code => (
        <div key={code}>
          <Amount value={account.balance[code]} code={code} />
        </div>
      ))}
    </div>
  </div>
)

Account.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.objectOf(PropTypes.number).isRequired
  }).isRequired,
  removeAccount: PropTypes.func
}

export default Account
