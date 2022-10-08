import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);

export function getRemainingTImeUntilMsTimestamp(timestampMs) {
    
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    return {
        seconds :getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes : getRemainingMinutes(nowDayjs, timestampDayjs),
        hours : getRemainingHours(nowDayjs, timestampDayjs),
        days : getRemainingDays(nowDayjs, timestampDayjs)
    }
}

function getRemainingSeconds(nowDayjs, timestampDayjs){
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return seconds > 0 ? padWithZeros(seconds, 2) : "00";

}
function getRemainingMinutes(nowDayjs, timestampDayjs){
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return minutes > 0 ? padWithZeros(minutes, 2) : "00";

}
function getRemainingHours(nowDayjs, timestampDayjs){
    const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
    return hours > 0 ? padWithZeros(hours, 2) : "00";

}
function getRemainingDays(nowDayjs, timestampDayjs){
    const days = timestampDayjs.diff(nowDayjs, 'days');
    return padWithZeros(days, 2);

}

function padWithZeros(number, minLength){
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
}