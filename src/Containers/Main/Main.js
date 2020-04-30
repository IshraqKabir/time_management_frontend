import React from 'react'
import classes from './Main.module.css'

import axios from 'axios'
import Slot from '../../Components/Slot/Slot'

class Main extends React.Component{
    state = {
        slots: null
    }
    componentDidMount() {
        var d = new Date()
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
        
        return(
            <React.Fragment>
                <div className={classes.Search}>
                    <input type="date" />
                </div>
                <div className={classes.Main}>
                    {slots}
                </div>
            </React.Fragment>
        )
    }
}

export default Main