import React from 'react'
import classes from './Weekly.module.css'

import SingleDay from '../../Components/SingleDay/SingleDay'

class Weekly extends React.Component {
    render() {
            let d = new Date()
            d.setTime(d.getTime() - (3*24*3600*1000))
            
            let days = []

            for (let i = 0; i < 7; i++) {
                d.setTime(d.getTime() + (24*60*60*1000))
                let day = d.getDay()
                let dayName = null
                let date = d.getDate()
                let month = d.getMonth()
                let year = d.getFullYear()
                switch(day) {
                    case 0:
                        dayName='Sunday'
                        break
                    case 1:
                        dayName='Monday'
                        break
                    case 2:
                        dayName='Tuesday'
                        break
                    case 3:
                        dayName='Wednesday'
                        break
                    case 4:
                        dayName='Thursday'
                        break
                    case 5:
                        dayName='Friday'
                        break
                    case 6:
                        dayName='Saturday'
                        break
                }
                days.push(<SingleDay 
                    dayName={dayName}
                    date={date}
                    month={month}
                    year={year}
                    key={date+'/'+month+'/'+year}
                />)
            }
        return(
            <div className={classes.Wrapper}>
                {days}
            </div>
        )
    }
}
export default Weekly