import Dashboard from '../containers/Dashboard'
import Transactions from '../containers/Transactions'
import Accounts from '../containers/Accounts'
import Budget from '../containers/Budget'
import Reports from '../containers/Reports'
import Settings from '../containers/Settings'
import User from '../containers/User/index'

export default [
  {
    path: '/',
    exact: true,
    label: 'Dashboard',
    icon: 'newspaper',
    component: Dashboard
  },
  {
    path: '/transactions',
    exact: false,
    label: 'Transactions',
    icon: 'exchange',
    component: Transactions
  },
  {
    path: '/accounts',
    exact: false,
    label: 'Accounts',
    icon: 'credit card',
    component: Accounts
  },
  {
    path: '/budget',
    exact: false,
    label: 'Budget',
    icon: 'shopping basket',
    component: Budget
  },
  {
    path: '/reports',
    exact: false,
    label: 'Reports',
    icon: 'line chart',
    component: Reports
  },
  {
    path: '/settings',
    exact: true,
    label: 'Settings',
    icon: 'options',
    component: Settings
  },
  {
    path: '/user',
    exact: true,
    label: 'User',
    icon: 'vcard outline',
    component: User
  }
]
