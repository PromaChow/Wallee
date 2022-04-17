import Transaction from './src/transaction';
import Journal from './src/transaction';
import JournalView from './src/components/JournalView';

const Journalist = [new Journal()];

Journalist[0].addTransaction(new Transaction('500', 'User'));
Journalist[0].addTransaction(new Transaction('200', 'User'));
Journalist[0].addTransaction(new Transaction('9847', 'User'));

export default Journalist;
