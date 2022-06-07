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

var listOfJournals = {};
export const listOfBudgets = {};
//export const listOfAutoTransactions = [new Transaction(21, 'AutoPilot')];
export const listOfGoals = {};

//const uid = 'fiOgc2ghJOTWt0klUDmDHguM5c22';
export const fillJournals = async () => {
  //update_doc(getUserID(), '', transactions);
  let fetchData = await retrieve_data(getUserID());
  let temp = fetchData['journals'];

  if (temp !== '') {
    processJournals(temp);
    //console.log(listOfJournals);
  }
};

export const setJournals = async temp => {
  if (temp !== '') processJournals(temp);
};

export const getJournals = () => {
  fillJournals();
  return listOfJournals;
};

const createTransactionList = transactionList => {
  console.log('hello');
  var tempTransaction = [];
  for (let t of transactionList) {
    //console.log(trans);
    var transaction = new Transaction(t['amount'], t['creator']);
    transaction.setRemarks(t['remarks']);
    transaction.lastAccessTime = new Date(t['lastAccessTime']['nanoseconds']);
    transaction.timeOfCreation = new Date(t['timeOfCreation']['nanoseconds']);
    transaction.setType(t['type']);

    tempTransaction.splice(tempTransaction.length, 0, transaction);
  }
  return tempTransaction;
  // for (let trans of Object.keys(transactionList)) {
  //   console.log(trans);
  // }
};
const processJournals = temp => {
  var journalList = [];
  console.log('temp');
  for (let t of Object.keys(temp)) {
    //console.log(t + temp[t]['listOfTransactions']);
    var transactionList = createTransactionList(temp[t]['listOfTransactions']);
    //console.log(transactionList);

    var title = temp[t]['title'];
    //console.log(title);

    if (temp[t]['type'] === 'expense') {
      var journal = new ExpenseJournal(title);
    }

    if (temp[t]['type'] === 'income') {
      var journal = new IncomeJournal(title);
    }

    journal.listOfTransactions = transactionList;
    journal.creator = temp[t]['creator'];
    journal.timeOfCreation = new Date(temp[t]['timeOfCreation']['nanoseconds']);
    journal.lastAccessTime = new Date(temp[t]['lastAccessTime']['nanoseconds']);
    journal.contribution = parseFloat(temp[t]['contribution']);
    journalList.splice(journalList.length, 0, journal);
    // var journal = new Journal(title, 0, 'Autopilot');
  }
  // console.log(journalList[0] instanceof ExpenseJournal);
  // listOfJournals = [...journalList];

  // Cloing into listOfJournals
  for (const [key, value] of Object.entries(journalList)) {
    Object.assign(listOfJournals[key], value);
  }

  console.log('\n\n\n' + listOfJournals[0].contribution);
  return journalList;

  // var tempJournal = [];
  // for (t of temp) {
  //   var journal = new Transaction(t['amount'], t['creator']);
  //   transaction.setRemarks(t['remarks']);
  //   transaction.lastAccessTime = new Date(t['lastAccessTime']['nanoseconds']);
  //   transaction.timeOfCreation = new Date(t['timeOfCreation']['nanoseconds']);
  //   transaction.setType(t['type']);

  //   tempTransaction.splice(tempTransaction.length, 0, transaction);
  // }
  // console.log(tempTransaction);
  // transactions = tempTransaction;
};

export function updateJournals() {
  update_doc(getUserID(), 'journals', listOfJournals);
}

export default listOfJournals;
