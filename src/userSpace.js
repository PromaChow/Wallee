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
export const listOfAutoTransactions = [new Transaction(21, 'AutoPilot')];

export default listOfJournals;
