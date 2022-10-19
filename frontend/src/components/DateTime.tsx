import '../styles/datetime.css'

import {useState, useEffect} from 'react'

export const DateTime = () => {
    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup(){
            clearInterval(timer)
        }
    });

    return(
        <div className = "outer-datetime">
            <p> Time: {date.toLocaleTimeString()}, Date: {date.toLocaleDateString()}</p>
        </div>
    )
}

