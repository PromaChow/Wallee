import Transaction from './transaction';
import Journal, {IncomeJournal, ExpenseJournal} from './journal';

import {
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
  getUserID,
} from './FireStoreHelperFunctions';
import {setCurrency} from './CurrencyService';
import {rates} from './data/rates';

const listOfJournals = {};
export const listOfBudgets = {};
export const listOfGoals = {};
export const listOfAutoTransactions = [new Transaction(21, 'AutoPilot')];
export var preferredCurrency = 'BDT';
export let rate = '';

const uid = 'fiOgc2ghJOTWt0klUDmDHguM5c22';

export function setPrefferedCurrencyMode(curr) {
  preferredCurrency = curr.currency.code;
  console.log(preferredCurrency);
}

export async function updatePreferredCurrency() {
  const data = await retrieve_data(getUserID());
  let currency = data['preferredCurrency'];
  setPrefferedCurrencyMode(currency);
  console.log(preferredCurrency);
}

export default listOfJournals;
