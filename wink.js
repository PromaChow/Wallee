var wink = require('wink-pos-tagger');
var tagger = wink(); // Create an instance of the pos tagger.

const incomeDictionary = [
    
]

const expendDictionary = [
    
]

// Tag the sentence using the tag sentence api.
const sentence = tagger.tagSentence('Your internet account has been accredited by BDT 5000');


console.log(sentence);
