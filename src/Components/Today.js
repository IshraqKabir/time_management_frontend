import React from 'react'
import { Route } from 'react-router-dom'

import Slot from './Slot/Slot'
import axios from 'axios'

class Today extends React.Component{
    state = {
        slots: null,
        day: null,
        date: null,
        month: null,
        year: null
    }
    componentDidMount() {
        var d = new Date()
        let day
        console.log(d.getDay())
        switch(d.getDay()) {
            case 0:
                day = 'Sunday'
                break
            case 1:
                day = 'Monday'
                break
            case 2:
                day = 'Tuesday'
                break
            case 3:
                day = 'Wednesday'
                break
            case 4:
                day = 'Thursday'
                break
            case 5:
                day = 'Friday'
                break
            case 6:
                day = 'Saturday'
                break
            default:
                break
        }
        this.setState({
            day: day,
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear()
        })
        const slots = []
        axios.get(`http://localhost:8000/api/slots/?day=${d.getDate()}`)
            .then(response => {
                // console.log(response.data)
                let data = JSON.parse(JSON.stringify(response.data))
                data.map(res => slots.push(res.id))
                this.setState({slots:slots})
            })
                .catch(error => console.log(error))
    }
    render() {
        let slots = null

        if (this.state.slots) {
            slots = this.state.slots.map(id => {
                return <Slot slotID={id} key={id}>{id}</Slot>
            })
            
        }
        return(
            <div style={{margin: 'auto 100px'}}>
                    <h3 style={{backgroundColor:'grey', textAlign:'center'}}>{this.state.date}/{this.state.month+1}/{this.state.year} -> {this.state.day}</h3>
                    {slots}
            </div>
        )
    }
}

export default Today