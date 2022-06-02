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
    this.timeOfCreation = new Date();
    this.lastAccessTime = this.timeOfCreation;
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
