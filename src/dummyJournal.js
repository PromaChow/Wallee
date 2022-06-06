import {Journal} from './journal';
import Transaction from './transaction';

let journals = [];
let transactions = [];

let min_Date = new Date();
let max_Date = new Date();

export const GetJournal = () => {
  transactions.splice(transactions.length, 0, new Transaction(100.0, 'user'));
  transactions.splice(transactions.length, 0, new Transaction(200.0, 'user'));
  transactions.splice(transactions.length, 0, new Transaction(1000.0, 'user'));
  transactions.splice(transactions.length, 0, new Transaction(300.0, 'user'));
  transactions.splice(transactions.length, 0, new Transaction(900.0, 'user'));

  journals.splice(
    journals.length,
    0,
    new Journal('Electricity Bills', 1000.0, 'user'),
  );
  journals[0].addTransaction(transactions[0]);
  journals[0].addTransaction(transactions[1]);
  journals[0].addTransaction(transactions[2]);

  journals.splice(journals.length, 0, new Journal('Food', 1000.0, 'user'));
  journals[1].addTransaction(transactions[0]);
  journals[1].addTransaction(transactions[1]);
  journals[1].addTransaction(transactions[2]);

  journals.splice(journals.length, 0, new Journal('Clothes', 1000.0, 'user'));
  journals[2].addTransaction(transactions[1]);
  journals[2].addTransaction(transactions[2]);
  journals[2].addTransaction(transactions[3]);

  return journals;
};

export const insertJournal = journal => {
  journals.splice(journals.length, 0, journal);
};

export const setDates = (min, max) => {
  min_Date = min;
  max_Date = max;
};
function checkTime(journal) {
  return (
    min_Date.getTime() <= journal.timeOfCreation.getTime() &&
    max_Date.getTime() >= journal.timeOfCreation.getTime()
  );
}
export const filterJournals = () => {
  if (journals.length == 0) GetJournal();
  console.log(journals);
  console.log(min_Date, max_Date);
  let filteredJournals = journals.filter(checkTime);
  return filteredJournals;
};
