import {transformSync} from '@babel/core';
import Transaction from './transaction';
import {update_doc, retrieve_data, getUserID} from './FireStoreHelperFunctions';

export var transactions = [];

export const add_sms_transactions = (amount = '', balance, date, type) => {
  console.log('hello');
  amount = amount.replace(',', '');
  var remarks = '';
  if (date !== 'undefined') var remarks = 'Date ' + date + ' ';
  if (balance !== 'undefined') {
    remarks += 'Balance ' + balance;
  }
  if (amount !== 'undefined') {
    var transaction = new Transaction(parseFloat(amount), 'AutoPilot');
    transaction.setRemarks(remarks);
    transaction.setType(type);
    transactions.splice(transactions.length, 0, transaction);
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
  return transactions;
  console.log(transactions);
};

export const retrieveTransactions = async () => {
  const data = await retrieve_data(getUserID());
  let temp = data['transactions'];

  if (temp !== '') transactions = temp;
};
