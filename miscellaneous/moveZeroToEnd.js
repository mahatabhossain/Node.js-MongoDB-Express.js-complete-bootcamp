// function moveZeroToEnd(arr) {
//     let nonZeroIndex = 0
//     for(let i = 0; i < arr.length; i++){
//         if(arr[i] !== 0){
//             arr[nonZeroIndex] = arr[i]
//             nonZeroIndex ++
//         }
//     }

//     while(nonZeroIndex < arr.length){
//         arr[nonZeroIndex] = 0
//         nonZeroIndex++
//     }

//     return arr;
// }

function moveZeroToEnd(arr){
    const nonZero = []
    const zeroArr = []

    for(let i = 0; i < arr.length; i++){
        if(arr[i] !== 0){
            nonZero.push(arr[i])
        }else{
            zeroArr.push(arr[i])
        }
    }

    const margedArr = [nonZero,...zeroArr]
    console.log(margedArr)
}


const arr = [0, 1, 4, 0, 5, 0, 15]
const result = moveZeroToEnd(arr)
// console.log(result)