"use strict";
function anagram(str1, str2) {
    if (str1.length !== str2.length)
        return false;
    const str1Arr = str1.split("");
    const str2Arr = str2.split("");
    str1Arr.sort();
    str2Arr.sort();
    for (let i = 0; i < str1Arr.length; i++) {
        if (str1Arr[i] !== str2Arr[i])
            return false;
    }
    return true;
}
const str1 = "triangle";
const str2 = "integral";
const result = anagram(str1, str2);
console.log(result);
//# sourceMappingURL=anagram.js.map