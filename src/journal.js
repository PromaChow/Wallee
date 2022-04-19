import Transaction from './transaction';

export class Journal {
  title;
  listOfTransactions = [];
  contribution;
  creator;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;

  constructor(title, creator = 'User') {
    this.title = title;
    this.contribution = 0;
    this.creator = creator;
    this.timeOfCreation =
      new Date().toTimeString().slice(0, 9) + new Date().toDateString();
    this.lastAccessTime = this.timeOfCreation;
  }

  addTransaction(transaction) {
    this.listOfTransactions.push(transaction);
  }
}

export class IncomeJournal extends Journal {
  constructor() {
    super();
  }

  contribute() {}
}

export class ExpenseJournal extends Journal {
  constructor() {
    super();
  }

  contribute() {}
}
