class Journal {
  #listOfTransactions = [];
  #originator;

  addTransaction(transaction) {
    this.#listOfTransactions.push(transaction);
  }

  getListOfTransactions() {
    return this.#listOfTransactions;
  }
}

class IncomeJournal extends Journal {}

class ExpenseJournal extends Journal {}

export {IncomeJournal, ExpenseJournal};
