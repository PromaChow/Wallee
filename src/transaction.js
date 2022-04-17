export default class Transaction {
  amount;
  creator;
  timeOfCreation;
  lastAccessTime;

  constructor(amount, creator) {
    this.amount = amount;
    this.creator = creator;
    this.timeOfCreation = new Date().toTimeString().slice(0, 5);
    this.lastAccessTime = this.timeOfCreation;
  }
}
