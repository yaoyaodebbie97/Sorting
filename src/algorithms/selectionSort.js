export function getSelectionSortAnimations(array) {
    let animations  = [];
    const n = array.length;
    // each time starts from i, look for the min, and then swap 
    for (let i = 0; i <= n - 2; i++) { 
        let minIndex = i; 
        for (let j = i + 1; j <= n-1; j++) {
            animations.push([1,j, minIndex]); //type 1: change color 
            animations.push([2,j, minIndex]); //type 2: revert
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        animations.push([3,i, array[minIndex]]); //type 3: swap 
        animations.push([3,minIndex, array[i]]);
        swap(array, minIndex, i);
    }
    return animations;
}

function swap(array, i, j) {
    let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}