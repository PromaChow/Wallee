import Transaction from './transaction';
import Journal, {IncomeJournal, ExpenseJournal} from './journal';

import {
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
} from './FireStoreHelperFunctions';

const listOfJournals = {};
export const listOfBudgets = {};
export let currency = 'BDT';

const uid = 'fiOgc2ghJOTWt0klUDmDHguM5c22';

export default listOfJournals;
