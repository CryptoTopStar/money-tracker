import { settingsDB, remoteSettingsDB } from './pouchdb'
import { fetchExchangeRates } from '../currency'
import { DEFAULT_BASE_CURRENCY } from '../../constants/currency'
import union from 'lodash/union'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'

const defaultSettings = {
  _id: 'settings',
  currency: { base: DEFAULT_BASE_CURRENCY, secondary: [] },
  exchangeRate: { [DEFAULT_BASE_CURRENCY]: 1 }
}

export async function retrieveSettings() {
  return settingsDB()
    .get('settings')
    .then(local => local, err => defaultSettings)
    .then(async local => {
      if (!remoteSettingsDB()) return local

      try {
        const remote = await remoteSettingsDB().get('settings')
        return mergeSettings(local, remote)
      } catch (error) {
        return local
      }
    })
}

export async function persistSettings(settings) {
  if (remoteSettingsDB()) {
    await remoteSettingsDB()
      .get('settings')
      .then(remote => remote, err => defaultSettings)
      .then(doc => remoteSettingsDB().put({ ...doc, ...settings }))
  }

  return settingsDB()
    .get('settings')
    .then(local => local, err => defaultSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }))
}

async function mergeSettings(local, remote) {
  const base = remote.currency.base
  const secondary = union(
    local.currency.base,
    local.currency.secondary,
    remote.currency.secondary
  ).filter(code => code !== base)

  const merged = {
    collapsedSections: union(local.collapsedSections, remote.collapsedSections),
    currency: { base, secondary },
    exchangeRate: local.currency.base === base
      ? { ...local.exchangeRate, ...remote.exchangeRate }
      : await fetchExchangeRates(base, secondary),
    isSetupComplete: remote.isSetupComplete
  }

  if (!isEqual(pick(local, Object.keys(merged)), merged)) {
    await persistSettings(merged)
  }

  return merged
}
