import { CREATE_ACCOUNT } from '../constants'

export default function accounts(state = [], action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return state.concat(action.account)
    default:
      return state
  }
}
