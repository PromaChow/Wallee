import Transaction from "./transaction";

class Journal {
  listOfTransactions = [];
  originator;

  addTransaction(transaction) {
    this.listOfTransactions.push(transaction):
  }
}

class IncomeJournal extends Journal {}

class ExpenseJournal extends Journal {}

export {IncomeJournal, ExpenseJournal};
