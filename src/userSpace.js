import Transaction from './transaction';
import Journal, {IncomeJournal, ExpenseJournal} from './journal';

const listOfJournals = [new IncomeJournal()];

listOfJournals[0].addTransaction(new Transaction('500', 'User'));
listOfJournals[0].addTransaction(new Transaction('200', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));
listOfJournals[0].addTransaction(new Transaction('9847', 'User'));

console.log(listOfJournals[0].listOfTransactions);

export default listOfJournals;
