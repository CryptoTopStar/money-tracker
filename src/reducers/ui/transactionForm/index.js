import {
  CHANGE_TRANSACTION_KIND,
  CHANGE_ACCOUNT,
  CHANGE_AMOUNT,
  CHANGE_TRANSACTION_CURRENCY,
  CHANGE_LINKED_ACCOUNT,
  CHANGE_LINKED_AMOUNT,
  CHANGE_LINKED_CURRENCY,
  CHANGE_TAGS,
  CHANGE_DATE,
  CHANGE_NOTE
} from '../../../actions/ui/transactionForm'
import { LOAD_MOST_USED_TAGS, USE_TAG } from '../../../actions/tags'
import { CREATE_TRANSACTION } from '../../../actions/transactions'
import { DEFAULT_TRANSACTION_KIND } from '../../../constants/transaction'
import { formatInternal } from '../../../util/date'

export default function(state = initialState(), action) {
  switch (action.type) {
    case LOAD_MOST_USED_TAGS:
      return { ...state, tagOptions: action.tags }
    case USE_TAG:
      return state.tagOptions.includes(action.tag)
        ? state
        : { ...state, tagOptions: state.tagOptions.concat(action.tag) }
    case CHANGE_TRANSACTION_KIND:
      return { ...state, kind: action.kind }
    case CHANGE_ACCOUNT:
      return { ...state, accountId: action.accountId }
    case CHANGE_AMOUNT:
      return { ...state, amount: action.amount }
    case CHANGE_TRANSACTION_CURRENCY:
      return { ...state, currency: action.currency }
    case CHANGE_LINKED_ACCOUNT:
      return { ...state, linkedAccountId: action.accountId }
    case CHANGE_LINKED_AMOUNT:
      return { ...state, linkedAmount: action.amount }
    case CHANGE_LINKED_CURRENCY:
      return { ...state, linkedCurrency: action.currency }
    case CHANGE_TAGS:
      return { ...state, tags: action.tags }
    case CHANGE_DATE:
      return { ...state, date: action.date }
    case CHANGE_NOTE:
      return { ...state, note: action.note }
    case CREATE_TRANSACTION:
      return initialState()
    default:
      return state
  }
}

const initialState = () => ({
  kind: DEFAULT_TRANSACTION_KIND,
  accountId: null,
  amount: '',
  currency: null,
  linkedAccountId: null,
  linkedAmount: '',
  linkedCurrency: null,
  tags: [],
  date: formatInternal(new Date()),
  note: ''
})
