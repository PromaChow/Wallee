import Transaction from './transaction';

export class Journal {
  title;
  listOfTransactions = [];
  contribution;
  creator;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;

  constructor(title, contribution = 0, creator = 'User') {
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
    this.contribution = this.listOfTransactions.reduce(
      (partialSum, transaction) => partialSum + transaction.amount,
      0,
    );

    return this.contribution;
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

  setCreationTime(date) {
    this.timeOfCreation = date;
  }

  getContributionInRange(dateMin, dateMax) {
    let contrib = 0;

    for (const {amount, timeOfCreation} of this.listOfTransactions) {
      if (
        timeOfCreation.getTime() >= dateMin.getTime() &&
        timeOfCreation.getTime() <= dateMax.getTime()
      ) {
        contrib += amount;
        console.log('Here');
      }
    }

    return contrib;
  }
}

export class IncomeJournal extends Journal {
  type;

  constructor(title, creator = 'User') {
    super(title, creator);
    this.type = 'income';
  }

  contribute(netBalance) {
    netBalance += this.contribution;
  }
}

export class ExpenseJournal extends Journal {
  type;

  constructor(title, creator = 'User') {
    super(title, creator);
    this.type = 'expense';
  }

  contribute(netBalance) {
    netBalance -= this.contribution;
  }
}
