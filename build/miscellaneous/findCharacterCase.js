"use strict";
const findCharacterCase = (char) => {
    const regex = /^[A-Z]+$/;
    const regex2 = /^[a-z]+$/;
    if (regex.test(char))
        return 0;
    if (regex2.test(char))
        return 1;
    if (!(regex.test(char) && regex2.test(char)))
        return -1;
};
// const result = findCharacterCase("1");
// console.log(result);
const result = checkBracketPair('{{{}}[[}](})]{([');
//# sourceMappingURL=findCharacterCase.js.map