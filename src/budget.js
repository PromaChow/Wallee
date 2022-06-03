import {IncomeJournal, ExpenseJournal} from './journal';

export class Budget {
  referenceJournal;
  amount;

  constructor(referenceJournal, amount) {
    this.referenceJournal = referenceJournal;
    this.amount = amount;
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
