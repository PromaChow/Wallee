import Transaction from './transaction';
import Journal, {IncomeJournal, ExpenseJournal} from './journal';

import {
  ifExist,
  add_User,
  retrieve_data,
  update_doc,
  addToStorage,
} from './FireStoreHelperFunctions';

const listOfJournals = [new IncomeJournal()];

listOfJournals[0].addTransaction(new Transaction('2300', 'User'));
listOfJournals[0].addTransaction(new Transaction('55', 'User'));
listOfJournals[0].addTransaction(new Transaction('8666', 'User'));
listOfJournals[0].addTransaction(new Transaction('8666', 'User'));
listOfJournals[0].addTransaction(new Transaction('8666', 'User'));
listOfJournals[0].addTransaction(new Transaction('8666', 'User'));

const uid = 'fiOgc2ghJOTWt0klUDmDHguM5c22';
const key = 'journal';

export default listOfJournals;
