import {IncomeJournal, ExpenseJournal} from './journal';

export class Budget {
  referenceJournal;
  amount;
  expiryDate;

  constructor(referenceJournal, amount) {
    this.referenceJournal = referenceJournal;
    this.amount = amount;
    this.expiryDate = null;
  }
}

export class Goal {
  referenceJournal;
  amount;

  constructor(referenceJournal, amount) {
    this.referenceJournal = referenceJournal;
    this.amount = amount;
  }
}
