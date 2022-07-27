import React, { Component } from 'react'
import {getMergeSortAnimations} from '../algorithms/mergeSort'
import {getBubbleSortAnimations} from '../algorithms/bubbleSort'
import {getSelectionSortAnimations} from '../algorithms/selectionSort'
import {getInsertionSortAnimations} from '../algorithms/insertionSort'
import {getQuickSortAnimations} from '../algorithms/quickSort'


const PRIMARY_COLOR = 'lightgrey';
const SECONDARY_COLOR = 'darkblue';
const REGULAR_SPEED = 10;
// Change this value for the speed of the animations.
let animationSpeed = REGULAR_SPEED;


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
            arr.push(Math.floor(Math.random() * 400) + 1) // generate a random number between 1 and 400 (inclusive), allow duplicates 
        }
        this.setState({array : arr});
        //also set all buttons / select to default 
        animationSpeed = REGULAR_SPEED;
        document.getElementById('choose-speed').value = 'default';
        document.getElementById('slower-algo').value = 'default';
        document.getElementById('faster-algo').value = 'default';
    }
    handleEnableSelection(){ // enable the selection after generate a new array 
        const disableList = document.getElementsByClassName('mayDisable');
        for (let i = 0;i< disableList.length; i++){
            disableList[i].disabled= !disableList[i].disabled;
        }
    }
    handleEnableGenerate(){
        const generateButton = document.getElementById('generate')
        generateButton.disabled = !generateButton.disabled;
    }

    generateArrayAndEnableSelection(){
        this.generateArray();
        this.handleEnableSelection();
    }

    handleSelectSlowerAlgo (event){ // select slower algo 
        this.handleEnableSelection()//once selected, disable all the button 
        this.handleEnableGenerate();
        let val = event.target.value;
        if (val === 'bubbleSort') this.bubbleSort();
        else if (val ==='selectionSort') this.selectionSort();
        else if (val ==='insertionSort') this.insertionSort();
    }

    handleSelectFasterAlgo (event){ // select faster algo 
        this.handleEnableSelection() //once selected, disable all the button 
        this.handleEnableGenerate();
        let val = event.target.value;
        if (val === 'mergeSort')   this.mergeSort();
        else if (val === 'quickSort') this.quickSort();
    }
    handleSelectSpeed (event){
        let val = event.target.value;
        if (val === 'slow') animationSpeed = 30;
        else if (val === 'fast') animationSpeed = 1;
    }

    /////////////////////////////////////////// SORTING ///////////////////
    //O(nlogn) sort 
    mergeSort(){ 
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            // every three values is a set 
            // if first  - change color
            // if second  - change color back 
            // if third - overwrite 
            if (i % 3 === 0 || i % 3 === 1) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                // if (i === animations.length-1) this.handleEnable();
                }, i * animationSpeed);
            } else { 
                setTimeout(() => {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;
                barStyle.height = `${newHeight}px`;
                // if (i === animations.length-1) this.handleEnable();
                }, i * animationSpeed);
            }
        }
        setTimeout(() => this.handleEnableGenerate(), parseInt(animationSpeed*animations.length + 500));  
        console.log('after merge sort', this.state.array);
    }
    //O(n^2) sort 
    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (i % 4 === 0 || i % 4 === 1) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * animationSpeed);
            } else { 
                const [barIdx, newHeight] = animations[i];
                if (barIdx === -1) continue;
                setTimeout(() => {
                const barStyle = arrayBars[barIdx].style;
                barStyle.height = `${newHeight}px`;
                }, i * animationSpeed);
            }
        }
        setTimeout(() => this.handleEnableGenerate(), parseInt(animationSpeed*animations.length + 500));  
        console.log('after bubble sort', this.state.array);
    }
    selectionSort(){
        const animations = getSelectionSortAnimations(this.state.array);
       
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === 1 || animations[i][0] === 2) {
                const color = (animations[i][0] === 1) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneIdx = animations[i][1];
                const barTwoIdx = animations[i][2];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                },i * animationSpeed);
            }
            else {
                const barIdx = animations[i][1];
                const newHeight = animations[i][2];
                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                barStyle.height = `${newHeight}px`;
                },i * animationSpeed);  
            }
        }
        setTimeout(() => this.handleEnableGenerate(), parseInt(animationSpeed*animations.length + 500));  
        console.log('after selection sort', this.state.array);
    }

    insertionSort(){
        const animations = getInsertionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === 1 || animations[i][0] === 2) {
                const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneIdx = animations[i][1];
                const barTwoIdx = animations[i][2];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                },i * animationSpeed);
            }
            else {
                const barIdx = animations[i][1];
                const newHeight = animations[i][2];
                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                barStyle.height = `${newHeight}px`;
                },i * animationSpeed);  
            }
        }
        setTimeout(() => this.handleEnableGenerate(), parseInt(animationSpeed*animations.length + 500));  
        console.log('after insertion sort', this.state.array);

    }
    
    quickSort(){
        const animations= getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === 1 || animations[i][0] === 2) {
                const color = animations[i][0] === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneIdx = animations[i][1];
                const barTwoIdx = animations[i][2];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                },i * animationSpeed);
            }
            else {
                const barIdx = animations[i][1];
                const newHeight = animations[i][2];
                if (barIdx === -1) continue;
                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                barStyle.height = `${newHeight}px`;
                },i * animationSpeed);  
             }    
        }
        setTimeout(() => this.handleEnableGenerate(), parseInt(animationSpeed*animations.length + 500));  
        console.log('after quick sort', this.state.array);
    }
    
    render() {
        console.log('before sorting', this.state.array);
        return (
            <>
            <div className = 'all-container'>
                <h1 className = 'header'> Welcome to the Sorting Visualizer</h1> 
                <div className = 'info-panel'>
                    <span className = 'color1'>  </span>
                    <span> Original Color of the Bars </span>
                    <span className = 'color2'>  </span>
                    <span> Color of the Bars Being Processed Now </span>
                </div>

                <div className = 'array-container'>
                {this.state.array.map((num, idx) =>{
                    return <div className = 'array-bar' key = {idx} style={{height: `${num}px`, backgroundColor : PRIMARY_COLOR}}>
                    </div>
                })}
                </div>
                   
                <p >Click the button to generate a random array of length 50: 
                <button id = 'generate' onClick = {() => this.generateArrayAndEnableSelection()}> Generate A New Array</button>
                </p>

                <p>Choose your preferred speed: 
                <select  disabled = {true} id = 'choose-speed'className = 'mayDisable'  onChange = {(e) => this.handleSelectSpeed(e)}>
                    <option value = 'default'>  --Choose the Speed Below--</option>
                    <option value = 'slow'> Slow Speed</option>
                    <option value = 'normal' > Normal Speed</option>
                    <option value = 'fast'> Fast Speed</option>
                </select>
                </p>
                
                <p>Choose your sorting algorithm: 
                <select disabled = {true} id = 'slower-algo' className = 'mayDisable' onChange = {(e) => this.handleSelectSlowerAlgo(e)}>
                    <option value = 'default'>  --Avg. O(N^2) time-- </option>
                    <option value = 'bubbleSort'> Run Bubble Sort</option>
                    <option value = 'selectionSort'>Run Selection Sort</option>
                    <option value = 'insertionSort'>Run Insertion Sort</option>
                </select>
                <select  disabled = {true} id = 'faster-algo' className = 'mayDisable' onChange = {(e) => this.handleSelectFasterAlgo(e)}>
                    <option value = 'default'> --Avg. O(N*LogN) time-- </option>
                    <option value = 'mergeSort' > Run Merge Sort</option>
                    <option value = 'quickSort'> Run Quick Sort</option>
                </select>
                </p>
                
            </div>
            </>
        )
    }
}
