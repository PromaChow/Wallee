export default class Transaction {
  amount;
  creator;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;

  constructor(amount, creator) {
    this.amount = amount;
    this.creator = creator;
    this.timeOfCreation =
      new Date().toTimeString().slice(0, 9) + new Date().toDateString();
    this.lastAccessTime = this.timeOfCreation;
  }
}
