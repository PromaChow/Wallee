export default class Transaction {
  amount;
  creator;
  paymentMethod;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;

  constructor(amount, creator = 'User', paymentMethod = 'Cash') {
    this.amount = amount;
    this.creator = creator;
    this.timeOfCreation =
      new Date().toTimeString().slice(0, 9) + new Date().toDateString();
    this.lastAccessTime = this.timeOfCreation;
  }
}
