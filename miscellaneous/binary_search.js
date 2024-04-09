function binarySearch(arr, el){
    if(arr.length <= 0) return 'Array is empty'

    let start = 0
    let end = arr.length - 1
  

    while(start <= end){
        const mid = Math.floor((start + end) / 2)
        if(arr[mid] == el) return mid

        if(el < arr[mid]) end = mid - 1
        if(el > arr[mid]) start = mid + 1
        
    }
    return -1
}
const arr = [3, 4, 8, 14, 24, 30]
const result = binarySearch(arr, 4)
console.log(result)