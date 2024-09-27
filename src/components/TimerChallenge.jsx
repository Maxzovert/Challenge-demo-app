import React, { useState , useRef } from 'react'
import ResultModal from './ResultModal.jsx'

// let timer;
const TimerChallenge = ({title, targetTime}) => {

    const timer = useRef()
    const dialog = useRef()

    const [timeRemains, setTimeRemains] = useState(targetTime * 1000)

    const timerActive = timeRemains > 0 && timeRemains < targetTime * 1000;

    if(timeRemains <= 0){
      clearInterval(timer.current)
      dialog.current.open();
    }

    function handleReset(){
      setTimeRemains(targetTime * 1000)
    }

    function handleStart (){
      timer.current = setInterval(()=>{
        setTimeRemains(prevTimeRemain => prevTimeRemain -10)
      },10)
    }
   
    function hanndleStop(){
      dialog.current.open();
      clearInterval(timer.current)  
    }
  return (
    <>
    <ResultModal 
      ref={dialog} 
      targetTime={targetTime} 
      remainingTime={timeRemains}
      onReset={handleReset}
      />
    <section className='challenge'>
      <h2>{title}</h2>
      <p className='challenge-time'>
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerActive ? hanndleStop : handleStart}>
            {timerActive ? 'Stop' : 'Start'}
        </button>
      </p>
      <p className={timerActive ? 'active' : undefined}>
        {timerActive ? "Time is runniing" : "Timer Inactive"}
      </p>
    </section>
    </>
  )
}

export default TimerChallenge
