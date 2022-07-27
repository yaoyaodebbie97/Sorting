export function getBubbleSortAnimations(array) {
    let animations  = [];
    const n = array.length;
    for (let time = 1; time <= n-1; time++){ // do it n-1 times
        let swapped = false; //can break early if no swap happens 
        for (let i = 0; i<= n-1-time; i++){
            animations.push([i,i+1]); // first time change color 
            animations.push([i,i+1]);  // second time revert 
            if(array[i] > array[i+1]){
                animations.push([i, array[i + 1]]); //swap 
                animations.push([i + 1, array[i]]);
                swapped = true;
                swap(array, i,i+1);
            } else{
                animations.push([-1,-1])
                animations.push([-1,-1])
            }
        }
        if(!swapped) break;
    }
    return animations;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
	array[j] = temp;
}

