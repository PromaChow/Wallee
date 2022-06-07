import Transaction from './transaction';
import {update_doc, retrieve_data, getUserID} from './FireStoreHelperFunctions';

export var transactions = [];

var transaction = new Transaction(3000, 'Autopilot');
transaction.setRemarks('Demo Transaction');
transactions[0] = transaction;

export const add_sms_transactions = (amount, balance, date, type) => {
  console.log('hello');
  amount = amount.replace(',', '');
  var remarks = '';
  if (date !== 'undefined') var remarks = 'Date ' + date + ' ';
  if (balance !== 'undefined') {
    remarks += 'Balance ' + balance;
  }
  if (amount !== 'undefined' && amount !== '') {
    console.log(amount);
    console.log(parseFloat(amount));
    var transaction = new Transaction(parseFloat(amount), 'AutoPilot');
    //transaction.timeOfCreation = new Date(new Date(Date.now() * 1000));
    transaction.setRemarks(remarks);
    transaction.setType(type);
    transactions.splice(transactions.length, 0, transaction);
    console.log(transactions[0]);
    //update_doc(getUserID(), 'transactions', transactions);
  }
};

export const add_receipt_transactions = (
  amount = '',
  company,
  date,
  address,
) => {
  amount = amount.replace(',', '');

  var remarks = '';
  var remarks =
    'Date ' + date + ' ' + 'Address ' + address + 'Company ' + company;
  var transaction = new Transaction(parseFloat(amount), 'AutoPilot');
  transaction.setRemarks(remarks);
  transaction.setType('Expense');
  transactions.splice(transactions.length, 0, transaction);
};

export const save_transactions = () => {
  update_doc(getUserID(), 'transactions', transactions);
};

export const get_transactions = () => {
  //console.log(transactions.length);
  return transactions;
};

export const remove_transactions = index => {
  transactions.splice(index, 1);
  update_doc(getUserID(), 'transactions', transactions);
  // save_transactions();
};

export const retrieveTransactions = async () => {
  //update_doc(getUserID(), 'transactions', transactions);
  const data = await retrieve_data(getUserID());
  let temp = data['transactions'];

  if (temp !== '') processTransactions(temp);
};

const processTransactions = temp => {
  var tempTransaction = [];
  for (t of temp) {
    var transaction = new Transaction(t['amount'], t['creator']);
    transaction.setRemarks(t['remarks']);
    transaction.lastAccessTime = new Date(t['lastAccessTime']['nanoseconds']);
    transaction.timeOfCreation = new Date(t['timeOfCreation']['nanoseconds']);
    transaction.setType(t['type']);

    tempTransaction.splice(tempTransaction.length, 0, transaction);
  }
  console.log(tempTransaction);
  transactions = tempTransaction;
};
