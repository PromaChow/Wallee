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

const uid = 'fiOgc2ghJOTWt0klUDmDHguM5c22';

export default listOfJournals;