
import {React, useState, useEffect} from 'react';
import { getRemainingTImeUntilMsTimestamp } from './CountdownTimerUtils';
import { Card, Button, Text, Image} from '@mantine/core';

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
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
            <div style={{fontSize:"3.5em", fontFamily:"monospace"}}>{remainingTime.days}</div>
            <div style={{fontSize:"0.7em", marginTop:"-10px"}}>days</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
            <div style={{fontSize:"3.5em", fontFamily:"monospace"}}>{remainingTime.hours}</div>
            <div style={{fontSize:"0.7em", marginTop:"-10px"}}>hours</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
            <div style={{fontSize:"3.5em", fontFamily:"monospace"}}>{remainingTime.minutes}</div>
            <div style={{fontSize:"0.7em", marginTop:"-10px"}}>minutes</div>
        </div>
        <div style={{display: "inline-block", textAlign:"center"}}>
            <div style={{fontSize:"3.5em", fontFamily:"monospace"}}>{remainingTime.seconds}</div>
            <div style={{fontSize:"0.7em", marginTop:"-10px"}}>seconds</div>
        </div>


        </>
    )
}


export default Countdown;