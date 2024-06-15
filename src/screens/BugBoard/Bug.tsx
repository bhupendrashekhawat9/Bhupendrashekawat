import React, { useEffect, useRef } from 'react';
import './bug.css';
import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, Bug } from 'lucide-react';
import { move } from './methods/bugMovement';

export interface IAppProps {}

let getCoordinates : (element: HTMLElement|null)=> [number,number] = (element)=>{
  if(!element) return [-1,-1]
  let {gridRowStart,gridColumnStart} = window.getComputedStyle(element)
  return [parseInt(gridRowStart),parseInt(gridColumnStart)]
}
export function BugBoard() {
  const activeKeys = useRef<Set<string>>(new Set());

  const checkIfFoodEaten = ()=>{
    let food = document.getElementById("Food")
    let bug = document.getElementById("Bug")
    if(!bug || !food) return;
    let bugCoordinates = getCoordinates(bug)
    let foodCoordinates = getCoordinates(food)
      // debugger
    if(bugCoordinates[0] == foodCoordinates[0] && bugCoordinates[1] == foodCoordinates[1]){
      bug.style.color = "red"
      food.style.display= 'none'
    }

  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      activeKeys.current.add(e.key);
      e.preventDefault();
      move({ direction: e.key, activeKeys: activeKeys.current });
      checkIfFoodEaten()
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (activeKeys.current.has(e.key)) {
      activeKeys.current.delete(e.key);
      e.preventDefault();
      console.log(activeKeys.current);
    }
  };

  let handleTouchStart = (e: React.TouchEvent<HTMLDivElement>,key:string)=>{
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      activeKeys.current.add(key);
    
      move({ direction: key, activeKeys: activeKeys.current });
      checkIfFoodEaten()
    }
  }
  let handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>,key:string)=>{
    if (activeKeys.current.has(key)) {
      activeKeys.current.delete(key);
    
      console.log(activeKeys.current);
    }
  }
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e as any);
    const keyUpHandler = (e: KeyboardEvent) => handleKeyUp(e as any);

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return (
    <div className="bug-board">
      <div id="Bug">
        <Bug color="white" style={{position:'absolute',top:"50%",left:"50%", transform:'translate(-50%,-50%)'}} />
      </div>
        <div id='Food' />
        <div id='Name'>
          <h3 className='gradient-text'>
           <span style={{color:"white"}}>Hello, from</span> Bhupendra Singh Shekawat
          </h3>
          <p style={{color:"white"}}>There's not much happening here at the moment. Why don't you have some fun with this bug for now?</p>
        </div>
        <div id="Keypad">
          <div className='arrowUp'  onTouchStart={(e)=>handleTouchStart(e,"ArrowUp")} onTouchEnd={(e)=> handleTouchEnd(e,'ArrowUp')}>
            <ArrowBigUp color='white'/>
          </div>
          <div className='arrowDown' onTouchStart={(e)=>handleTouchStart(e,"ArrowDown")} onTouchEnd={(e)=> handleTouchEnd(e,'ArrowDown')}>
            <ArrowBigDown color='white'/>
          </div>
          <div className='arrowLeft' onTouchStart={(e)=>handleTouchStart(e,"ArrowLeft")} onTouchEnd={(e)=> handleTouchEnd(e,'ArrowLeft')}>
            <ArrowBigLeft color='white'/>
          </div>
          <div className='arrowRight' onTouchStart={(e)=>handleTouchStart(e,"ArrowRight")} onTouchEnd={(e)=> handleTouchEnd(e,'ArrowRight')}>
            <ArrowBigRight color='white'/>
          </div>
          
        </div>
    </div>
  );
}
