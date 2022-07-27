export function getInsertionSortAnimations(array) {
    let animations  = [];
    const n = array.length;
    for (let i = 1; i<= n-1; i++){
        let val = array[i];
        let j = i-1;
        animations.push([1, j, i]) // type 1: change color
        animations.push([2, j, i]) // type 2: revert color back 
        while (j>=0 && array[j] > val){
            animations.push([3, j+1, array[j]]) // type 3: overwrite 
            array[j+1] =array[j] // copy backwards
            j--;
            if ( j>= 0){
                animations.push([1, j, i]);
                animations.push([2, j, i])
            }
        }
        animations.push([3, j+1, val])
        array[j+1] = val;
    }
    
    return animations;
}

