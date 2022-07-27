export function getMergeSortAnimations(array) { // returns an animation array 
    if (array.length <= 1) return array;
    const animations = []; // array of arrays
    const helperArray = [];
    mergeSortHelper(array, helperArray, 0, array.length - 1, animations);
    return animations;
  }
  

function mergeSortHelper(array, helperArray, left, right, animations) {
   // base case 
    if (left === right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(array, helperArray, left, mid, animations);
    mergeSortHelper(array, helperArray, mid+1, right, animations);
    merge(array, helperArray, left, right, animations);
  }
  
function merge(array, helperArray, left, right, animations) {
    const mid = Math.floor((left + right) / 2);
    // deep copy the  original array into the helper array 
    helperArray = array.slice();
    // i pointer and j pointer traverse through the helper array 
    let i = left;
    let j  = mid + 1;
    // k pointer used to traverse the original/result array
    let k = left;
    
    while (i <= mid && j <= right) {
      // Currently comparing value at index i and index j, push them into animations first time to change color 
      animations.push([i, j]);
      // Push them the second time to revert to original color
      animations.push([i, j]);
      if (helperArray[i] <= helperArray[j]) {
        animations.push([k, helperArray[i]]);
        array[k++] = helperArray[i++];
      } else {
        animations.push([k, helperArray[j]]);
        array[k++] = helperArray[j++];
      }
    }
    // if remaining elements are on the left side 
    while (i <= mid) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, helperArray[i]]);
      array[k++] = helperArray[i++];
    }
    // if remainingelements are on the right side, actually no need to compare 
    while (j <= right) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, helperArray[j]]);
      array[k++] = helperArray[j++];
    }
  }