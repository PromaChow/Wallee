var wink = require('wink-pos-tagger');
var tagger = wink(); // Create an instance of the pos tagger.

const suggestTransaction = {
    journal_category : '',
    type : 'user select',
    amount : 'user select'
}

const incomeDictionary = [
   'accredit' 
]

const expendDictionary = [
    'decrease'
]

// Tag the sentence using the tag sentence api.
// const sentence = tagger.tagSentence('Your internet account has been accredited by BDT 5000');
const sentence = tagger.tagSentence('Your internet account has been decreased by BDT 5000');

for (const {pos : type, lemma : word, tag, value} of sentence) {
    if (tag == 'number')
        suggestTransaction.amount = value;
    if (type == 'VBN') {
        if (word in incomeDictionary)
            suggestTransaction.type = 'income journal';
        else 
            suggestTransaction.type = 'expense journal';
    }
    if (type == 'NN')
        suggestTransaction.journal_category += word + ' ';
}

console.log(suggestTransaction);
