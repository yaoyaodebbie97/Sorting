export function getQuickSortAnimations(array) {
    let animations  = [];
    quickSortHelper(array, 0, array.length -1, animations)
    return animations;
}

function quickSortHelper(array, left, right, animations){
    if (left >= right) return;
    let pivotIdx = partition(array, left, right, animations);
    quickSortHelper(array, left, pivotIdx -1, animations);
    quickSortHelper(array, pivotIdx+1, right, animations);
}

// function partition(array,left, right, animations){
//     let pivotIdx = Math.floor(Math.random(right- left + 1) + left) // random int from interval 
//     let pivot = array[pivotIdx];
//     animations.push([1, pivotIdx,right]);
//     animations.push([2, pivotIdx,right])
//     // step 1: put the randomly chosen to the right 
//     animations.push([3, pivotIdx, array[right]]); //for swap 
//     animations.push([3, right, pivot])
//     swap (array, pivotIdx, right);
//     let i = left;
//     let j = right-1;
//     // step 2: continue searching make pivot on the right position 
//     while (i<=j){
//         animations.push([1, i, j])
//         animations.push([2, i, j])
//         if (array[i] < pivot) {
//             animations.push([1,i,right]);
//             animations.push([2,i,right]);
//             i++;
//         }
//         else if (array[j]> pivot) {
//             animations.push([1,j,right]);
//             animations.push([2,j,right]);
//             j--;
//         }
//         else {
//             animations.push([3,i,array[j]]);
//             animations.push([3,j,array[i]]);
//             swap (array, i, j);
//             i++;
//             j--;
//         }
//     }
//     animations.push([3,i,array[right]]);
//     animations.push([3,right, array[i]]);
//     swap (array, i, right);
//     return i; 
// }


function partition(array, startIndex, endIndex, animations) {
    let pivotIndex = Math.floor(Math.random(endIndex- startIndex + 1) + startIndex)
    
    animations.push([1, pivotIndex, endIndex]);
    animations.push([3, pivotIndex, array[endIndex]]);
    animations.push([3, endIndex, array[pivotIndex]]);
    animations.push([2, pivotIndex, endIndex]);
    swap(array, pivotIndex, endIndex);

    let smallerThanTail = startIndex;

    for(let i = startIndex; i < endIndex; i++) {
        animations.push([1, i, endIndex]); //endIndex doesn' change,
        animations.push([2, i, endIndex]);
        if(array[i] <= array[endIndex]) {
            animations.push([1, i, smallerThanTail]);
            animations.push([3, i, array[smallerThanTail]]);
            animations.push([3, smallerThanTail, array[i]]);
            animations.push([2, i, smallerThanTail]);
            swap(array, i, smallerThanTail);
            smallerThanTail++;
        }
    }
    animations.push([1, smallerThanTail, endIndex]);
    animations.push([3, endIndex, array[smallerThanTail]]);
    animations.push([3, smallerThanTail, array[endIndex]]);
    animations.push([2, smallerThanTail, endIndex]);
    
    swap(array, smallerThanTail, endIndex);
    return smallerThanTail;
}

function swap(array, i, j) {
    let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}