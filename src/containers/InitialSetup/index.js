import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import CurrencyForm from './CurrencyForm'
import AccountForm from '../Accounts/Form'
import AccountList from '../Accounts/List'
import { completeSetup } from '../../actions/settings'
import { loadAccounts } from '../../actions/entities/accounts'
import { getAccountsList } from '../../selectors/entities/accounts'
import { isUserAuthenticated } from '../../selectors/user'

class InitialSetup extends React.Component {
  componentDidMount() {
    this.props.loadAccounts()
  }

  render() {
    return (
      <div className="container-raised-desktop">
        <Header as="h2" icon="settings" content="Money Tracker Setup" />
        <Divider />
        {!this.props.isAuthenticated && (
          <p>
            <Link to="/auth">Sign in</Link> if you want to sync your data with
            the cloud. You may also use the tracker without signing in. Your
            data will be stored only on current device in this case. You can
            sign in and sync your data any time later.
          </p>
        )}
        <Header as="h3">Currencies</Header>
        <p>
          Select your base currency — the currency which will be used by
          default.
          <br />
          You can also select any number of additional currencies, if you use
          them.
        </p>
        <CurrencyForm />
        <Header as="h3">Accounts</Header>
        <p>
          Create accounts that you would like to keep track of.<br />
          It could be cash in your wallet, bank accounts, credit cards or even a
          loan to your friend.
        </p>
        <AccountForm />
        {this.props.accounts.length > 0 && (
          <div style={{ marginTop: '1em' }}>
            <AccountList />
            <div className="form-submit">
              <Button
                primary
                content="Finish"
                onClick={this.props.completeSetup}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

InitialSetup.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.object),
  loadAccounts: PropTypes.func,
  completeSetup: PropTypes.func
}

const mapStateToProps = state => ({
  isAuthenticated: isUserAuthenticated(state),
  accounts: getAccountsList(state)
})

export default connect(mapStateToProps, { loadAccounts, completeSetup })(
  InitialSetup
)
