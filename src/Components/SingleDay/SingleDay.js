import React from 'react'
import classes from './SingleDay.module.css'

import axios from 'axios'
import Slot from '../Slot/Slot'

class SingleDay extends React.Component {
    state = {
        slots: null
    }
    componentDidMount() {
        // console.log(this.props.month)
        let slots = []
        axios.get(`http://localhost:8000/api/slots/?day=${this.props.date}&month=${this.props.month+1}&year=${this.props.year}`)
            .then(response => {
                let data = JSON.parse(JSON.stringify(response.data))
                data.map(response => {
                    slots.push(response.id)
                })
                this.setState({slots:slots})
                // data.map(res => slots.push(res.id))
                // this.setState({slots:slots})
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
            <div className={classes.SingleDay}>
                <h3 style={{backgroundColor:'grey', textAlign:'center', padding:'0px', margin:'0px', color: 'black'}}>{this.props.date}/{this.props.month+1}/{this.props.year} {this.props.dayName}</h3>
                {slots}
            </div>
        )
    }
}
export default SingleDay