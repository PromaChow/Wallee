export default class Transaction {
  amount;
  originator;
  timeOfCreation;
  lastAccessTime;

  constructor(amount, originator) {
    this.amount = amount;
    this.originator = originator;
    this.timeOfCreation = new Date();
    this.lastAccessTime = this.timeOfCreation;
  }
}
