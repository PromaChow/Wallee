import Transaction from './transaction';

export class Journal {
  title;
  listOfTransactions = [];
  contribution;
  creator;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;

  constructor(title, contribution, creator = 'User') {
    this.title = title;
    this.contribution = contribution;
    this.creator = creator;
    this.timeOfCreation = new Date();
    this.lastAccessTime = this.timeOfCreation;
  }

  addTransaction(transaction) {
    this.listOfTransactions.push(transaction);
    this.calculateContribution();
  }

  calculateContribution() {
    for (const transaction of this.listOfTransactions) {
      this.contribution += transaction.amount;
    }
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
  constructor(title, creator = 'User') {
    super(title, creator);
  }

  contribute(netBalance) {
    netBalance += this.contribution;
  }
}

export class ExpenseJournal extends Journal {
  constructor(title, creator = 'User') {
    super(title, creator);
  }

  contribute(netBalance) {
    netBalance -= this.contribution;
  }
}
