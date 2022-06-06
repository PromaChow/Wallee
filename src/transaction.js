export default class Transaction {
  amount;
  creator;
  paymentMethod;
  timeOfCreation;
  dateOfCreation;
  lastAccessTime;
  remarks;
  type;

  constructor(amount, creator = 'User') {
    this.amount = amount;
    this.creator = creator;
    this.timeOfCreation = new Date();
    this.lastAccessTime = this.timeOfCreation;
  }
  setRemarks(remarks) {
    this.remarks = remarks;
  }

  setType(type) {
    this.type = type;
  }

  setCreationTime(time) {
    this.timeOfCreation = time;
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
