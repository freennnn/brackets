function check(str, bracketsConfig) {

  let openingBrackets = bracketsConfig.reduce((acc,v) => acc += v[0], "");
  let closingBrackets = bracketsConfig.reduce((acc,v) => acc += v[1], "");

  //they will have same index since bracketsConfig have them in pairs
  function openingBracketPair(closingBracket) {
      return openingBrackets[closingBrackets.indexOf(closingBracket)];
  }

  let bracketStack = [];
  for (let i=0; i< str.length; i++) {

    //Author @valerydluski most likely doesn't even realize the ambiguity of same open/close bracket symbol condition
    // so just adding priority to closing behavior here in order to pass the tests

    // console.log(closingBrackets.includes(str[i]));
    // console.log(bracketStack.length);
    // console.log(bracketStack[bracketStack.length-1] === openingBracketPair(str[i]));

    if (closingBrackets.includes(str[i])
       && bracketStack.length > 0 
       && bracketStack[bracketStack.length-1] === openingBracketPair(str[i])) {
      bracketStack.pop();
      continue;
    }

    // main algorithm
    if (openingBrackets.includes(str[i])) {
      bracketStack.push(str[i]);
    } else if (closingBrackets.includes(str[i])) {
      if (bracketStack[bracketStack.length-1] === openingBracketPair(str[i])) {
        bracketStack.pop();
      } else {
        return false; // closing bracket doesn't have preceding opening bracket in sequence
      }
    } else {
      return false; //symbol/bracket is not from the config
    }
  }
  if (bracketStack.length === 0) {
    return true;
  } else {
    return false;
  }
}

module.exports =  check ;


// const config2 = [['(', ')'], ['[', ']']];
// const config4 = [['|', '|']];
// const config5 = [['(', ')'], ['|', '|']];
// const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
// const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];

//console.log(check('[]()(', config2));
//console.log(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]));    // -> true
//console.log(check('||', config4));
//assert.equal(check('||', config4), true);
//assert.equal(check('|()|', config5), true);
//console.log(check('111115611111111222288888822225577877778775555666677777777776622222', config6));