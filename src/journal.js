import Transaction from './transaction';

export class Journal {
  title;
  listOfTransactions = [];
  contribution;
  creator;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;
  type;

  constructor(title, contribution = 0, creator = 'User') {
    this.title = title;
    this.contribution = contribution;
    this.creator = creator;
    this.timeOfCreation = Date.now();
    this.lastAccessTime = this.timeOfCreation;
  }

  addTransaction(transaction) {
    this.listOfTransactions.push(transaction);
    this.calculateContribution();
  }

  calculateContribution() {
    this.contribution = this.listOfTransactions.reduce(
      (partialSum, transaction) => partialSum + transaction.amount,
      0,
    );
  }
  getCreationTimeSliced(startIndex, endIndex) {
    return this.timeOfCreation.toTimeString().slice(startIndex, endIndex);
  }

  getLastAccessTimeSliced(startIndex, endIndex) {
    return this.lastAccessTime.toTimeString().slice(startIndex, endIndex);
  }

  getCreationDateSliced(startIndex, endIndex) {
    return this.timeOfCreation.toDateString().slice(startIndex, endIndex);
  }

  getLastAccessDateSliced(startIndex, endIndex) {
    return this.lastAccessTime.toDateString().slice(startIndex, endIndex);
  }
}

export class IncomeJournal extends Journal {
  type = 'income';
  constructor(title, creator = 'User') {
    super(title, creator);
  }

  contribute(netBalance) {
    netBalance += this.contribution;
  }
}

export class ExpenseJournal extends Journal {
  type = 'expense';
  constructor(title, creator = 'User') {
    super(title, creator);
  }

  contribute(netBalance) {
    netBalance -= this.contribution;
  }
}
