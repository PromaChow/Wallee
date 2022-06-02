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
    this.timeOfCreation = new Date();
    this.lastAccessTime = this.timeOfCreation;
  }

  addTransaction(transaction) {
    this.listOfTransactions.push(transaction);
  }

  calculateContribution() {
    for (const transaction of this.listOfTransactions) {
      this.contribution += transaction.amount;
    }
  }

  getCreationTimeSliced(startIndex, endIndex) {
    return (
      this.timeOfCreation.toTimeString().slice(startIndex, endIndex) +
      new Date().toDateString()
    );
  }

  getLastAccessTimeSliced(startIndex, endIndex) {
    return (
      this.lastAccessTime.toTimeString().slice(startIndex, endIndex) +
      new Date().toDateString()
    );
  }
}

export class IncomeJournal extends Journal {
  constructor() {
    super();
  }

  contribute(netBalance) {
    netBalance += this.contribution;
  }
}

export class ExpenseJournal extends Journal {
  constructor() {
    super();
  }

  contribute(netBalance) {
    netBalance -= this.contribution;
  }
}
