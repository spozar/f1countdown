
import {React, useState, useEffect} from 'react';
import { getRemainingTImeUntilMsTimestamp } from './CountdownTimerUtils';
import {motion} from 'framer-motion'


const defaultRemainingTime = {
    seconds: '--',
    minutes: '--',
    hours: '--',
    days: '-'
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
        
        <motion.div                 initial={{ translateX:"-200px", opacity: 0}}
                animate={{ translateX:"0px", opacity: 1}}
                transition={{ duration: 1}} style={{display: "inline-block", textAlign:"center", marginRight:"20px", marginBottom:"20px"}}>
            <div style={{fontSize:"max(2.3em, 3.3em)", fontFamily:"monospace"}}>{remainingTime.days}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>days</div>
        </motion.div>
        <motion.div  initial={{ translateX:"-200px", opacity:0 }}
                animate={{ translateX:"0px", opacity: 1 }}
                transition={{ duration: 1 }}  style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
        <div style={{fontSize:"max(2.3em, 3.3em)", fontFamily:"monospace"}}>{remainingTime.hours}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>hours</div>
        </motion.div>
        <motion.div  initial={{ translateX:"200px", opacity:0 }}
                animate={{ translateX:"0px", opacity:1 }}
                transition={{ duration: 1 }}  style={{display: "inline-block", textAlign:"center", marginRight:"20px"}}>
        <div style={{fontSize:"max(2.3em, 3.3em)", fontFamily:"monospace"}}>{remainingTime.minutes}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>minutes</div>
        </motion.div>
        <motion.div  initial={{ translateX:"200px", opacity:0 }}
                animate={{ translateX:"0px", opacity:1 }}
                transition={{ duration: 1 }}  style={{display: "inline-block", textAlign:"center", zIndex:"2000"}}>
        
        <div style={{fontSize:"max(2.3em, 3.3em)", fontFamily:"monospace"}}>{remainingTime.seconds}</div>
            <div style={{fontSize:"max(0.7em, 1em)", marginTop:"-15px"}}>seconds</div>
            
        </motion.div>


        </>
    )
}


export default Countdown;