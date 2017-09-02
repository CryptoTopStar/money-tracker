import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  loadAccounts,
  loadAccountsSuccess,
  saveAccount,
  saveAccountSuccess,
  saveAccountFailure,
  removeAccount,
  removeAccountSuccess
} from '../actions/accounts'
import { saveTransaction } from '../actions/transactions'
import { getAccount } from '../selectors/accounts'
import AccountsStorage from '../util/storage/accounts'

export function* loadAccountsSaga() {
  const accounts = yield call(AccountsStorage.loadAll)
  yield put(loadAccountsSuccess(accounts))
}

export function* saveAccountSaga(action) {
  const account = action.payload
  try {
    yield call(AccountsStorage.save, account)
    yield put(saveAccountSuccess())
  } catch (error) {
    yield put(saveAccountFailure(account.id))
  }
}

export function* saveTransactionSaga(action) {
  const transaction = action.payload
  const account = yield select(getAccount(transaction.accountId))
  yield call(AccountsStorage.save, account)
  if (transaction.linkedAccountId) {
    const linkedAccount = yield select(getAccount(transaction.linkedAccountId))
    yield call(AccountsStorage.save, linkedAccount)
  }
}

export function* removeAccountSaga(action) {
  const id = action.payload
  yield call(AccountsStorage.remove, id)
  yield put(removeAccountSuccess())
}

export default [
  takeLatest(loadAccounts, loadAccountsSaga),
  takeLatest(saveAccount, saveAccountSaga),
  takeLatest(saveTransaction, saveTransactionSaga),
  takeLatest(removeAccount, removeAccountSaga)
]
