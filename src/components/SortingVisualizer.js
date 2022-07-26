import React, { Component } from 'react'
import {getMergeSortAnimations} from '../algorithms/mergeSort'


// Change this value for the speed of the animations.
let regularSpeed = 15;
let animationSpeed = regularSpeed;

// Disable the button one sorting is in progress  
const PRIMARY_COLOR = 'lightgrey';
const SECONDARY_COLOR = 'darkblue';


export default class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state  ={
            array:[],
        }
    }

    componentDidMount(){
        this.generateArray();   
    }

    generateArray(){
        const arr = [];
        for (let i = 0; i<50; i++){ // making 50 bars
            arr.push(Math.floor(Math.random() * 500) + 1) // generate a random number between 1 and 500 (inclusive), allow duplicates 
        }
        this.setState({array : arr});
        //also set all buttons / select to default 
        document.getElementById('normal-speed').selected = true;
        document.getElementById('slower-algo').selected = true;
        document.getElementById('faster-algo').selected = true;

    }

    handleSelection1 (event){ // select slower algo 
        this.handleEnable();
        let val = event.target.value;
        if (val === 'bubbleSort') this.bubbleSort();
    }
    handleSelection2 (event){ // select faster algo 
        this.handleEnable();
        let val = event.target.value;
        if (val === 'mergeSort')   this.mergeSort();
        // set back choices after sort 
        // event.target.value = 'original'
        // ANIMATION_SPEED_MS = regularSpeed;
        // document.getElementById('normal-speed').selected = true;
    }
    handleSelectionSpeed (event){
        let val = event.target.value;
        if (val === 'slow') animationSpeed = regularSpeed + 85;
        else if (val === 'fast') animationSpeed = regularSpeed - 13;

    }
    handleEnable(){
        const disableList = document.getElementsByClassName('mayDisable');
        for (let i = 0;i< disableList.length; i++){
            disableList[i].disabled= !disableList[i].disabled;
        }
    }

    
    //O(n^2) sort 
    bubbleSort(){
    }
    selectionSort(){
    }
    insertionSort(){
    }
    //O(nlogn) sort 
    mergeSort(){ 
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            // every three values is a set 
            // if first value - change color
            // if second value - change color back 
            if (isColorChange) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * animationSpeed);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * animationSpeed);
            }
        }
        console.log('after merge sort', this.state.array);
    }
    quickSort(){
    }
    heapSort(){
    }
  
    render() {
        console.log('before sorting', this.state.array);
        return (
            <div className = 'array-container'>
                {this.state.array.map((num, idx) =>{
                    return <div className = 'array-bar' key = {idx} style={{height: `${num}px`, backgroundColor : PRIMARY_COLOR}}>
                    </div>
                })}
                <div className = 'user-choice'>
                    <p>Click the button to generate a random array of length 50: 
                    <button className = 'mayDisable' onClick = {() => this.generateArray()}> Generate A New Array</button>
                    </p>

                    <p>Choose your preferred speed (Default: Normal): 
                    <select  className = 'mayDisable' onChange = {(e) => this.handleSelectionSpeed(e)}>
                        <option value = 'slow'> Slow</option>
                        <option id = 'normal-speed' value = 'normal' selected> Normal</option>
                        <option value = 'fast'> Fast</option>
                    </select>
                    </p>
                    
                    <p>Choose your sorting algorithm: 
                    <select className = 'mayDisable' onChange = {(e) => this.handleSlection1(e)}>
                        <option id = "slower-algo" value = 'original'>  Avg. O(N^2) time </option>
                        <option value = 'bubbleSort'> Bubble Sort</option>
                        <option value = 'selectionSort'> Selection Sort</option>
                    </select>
                    <select  className = 'mayDisable' onChange = {(e) => this.handleSelection2(e)}>
                        <option id = 'faster-algo' value = 'original'> Ave. O(N*LogN) time  </option>
                        <option value = 'mergeSort'> Merge Sort</option>
                        <option value = 'quickSort'> Quick Sort</option>
                    </select>
                    </p>
                  
                    <p>Click the button when you are finished and want to start another round: 
                    <button id = 'restart-btn' onClick = {() => this.handleEnable()}> Start Over</button>
                    </p>


                </div>
            </div>
        )
    }
}
