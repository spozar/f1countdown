
import {React, useState, useEffect} from 'react';
import { getRemainingTImeUntilMsTimestamp } from './CountdownTimerUtils';


const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}


function Countdown({countdownTimestampMS}){
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMS);
        }, 1000)
        return () => clearInterval(intervalId);
    },[countdownTimestampMS]);

    function updateRemainingTime(countdown){
        setRemainingTime(getRemainingTImeUntilMsTimestamp(countdown));
    }

    return (

        <>
        
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px", marginBottom:"20px"}}>
            <div style={{fontSize:"max(2.5em, 3.5em)", fontFamily:"monospace"}}>{remainingTime.days}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>days</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
        <div style={{fontSize:"max(2.5em, 3.5em)", fontFamily:"monospace"}}>{remainingTime.hours}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>hours</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
        <div style={{fontSize:"max(2.5em, 3.5em)", fontFamily:"monospace"}}>{remainingTime.minutes}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>minutes</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center", zIndex:"2000"}}>
        
        <div style={{fontSize:"max(2.5em, 3.5em)", fontFamily:"monospace"}}>{remainingTime.seconds}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>seconds</div>
            
        </div>


        </>
    )
}


export default Countdown;