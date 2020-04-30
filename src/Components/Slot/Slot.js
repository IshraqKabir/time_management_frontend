import React from 'react'
import classes from './Slot.module.css'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
class Slot extends React.Component {
    state = {
        id: null,
        day: null,
        month: null,
        year: null,
        startHours: null,
        startMins: null,
        endHours: null,
        endMins: null,
        isDone: null,
        taskId: null,
        taskName: null,
        projectID: null,
        projectName: null,
        objectiveID: null,
        objectiveName: null,
        agendaID: null,
        agendaName: null,
        slotOnHover: false

    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/slots/${this.props.slotID}/`)
            .then(response => {
                let id = response.data.id
                let day = response.data.day
                let month = response.data.month
                let year = response.data.year
                let startHours = response.data.start_time_hours
                let startMins = response.data.start_time_mins
                let endHours = response.data.end_time_hours
                let endMins = response.data.end_time_mins
                let isDone = response.data.is_done
                let taskID = response.data.task
                let taskName = null
                if(response.data.task) {
                    axios.get(`http://localhost:8000/api/tasks/${taskID}/`)
                    .then(response => {
                        taskName = response.data.name
                        let projectID = response.data.project
                        if (projectID) {
                            axios.get(`http://localhost:8000/api/projects/${projectID}/`)
                                .then(response => this.setState({projectName: response.data.name}))
                        }
                        this.setState({
                            id:id,
                            day:day,
                            month:month,
                            year:year,
                            startHours:startHours,
                            startMins:startMins,
                            endHours:endHours,
                            endMins:endMins,
                            isDone:isDone,
                            taskID:taskID,
                            taskName:taskName,
                            projectID: projectID
                        })
                    })
                } else {
                    this.setState({
                        id:id,
                        day:day,
                        month:month,
                        year:year,
                        startHours:startHours,
                        startMins:startMins,
                        endHours:endHours,
                        endMins:endMins,
                        isDone:isDone,
                        taskID:taskID,
                        taskName:taskName
                    })
                }
                
            })
    }

    render(){
        let slot = null
        if (this.state.slotOnHover) {
            slot = (<div className={classes.SlotOnHover} onMouseLeave={() => this.setState({slotOnHover: false})}>
                <div className={classes.StartTime}>
                    Start  <span style={{color:'red'}}>{this.state.startHours}:{this.state.startMins === 0 ? '00' : this.state.startMins}</span>
                </div>
                <div className={classes.EndTime}>
                    End  <span style={{color:'red'}}>{this.state.endHours}:{this.state.endMins === 0 ? '00' : this.state.endMins}</span>
                </div>
                <div className={classes.Buttons}>
                    {/* <button>Delete
                    </button> */}
                    <FontAwesomeIcon icon={faInfo} style={{color:'blue'}}/>
                    <FontAwesomeIcon icon={faTrash} style={{color:'red', marginLeft:'10px', marginRight:'5px'}}/>
                </div>
                <div className={classes.Task}>
                    {this.state.taskID ? 'Task: ' + this.state.taskName : 'blank'}
                </div>
                <div className={classes.Agenda}>
        
                </div>
                <div className={classes.Objective}>
                    
                </div>
                <div className={classes.Project}>
                    Project : {this.state.projectName ? this.state.projectName : null}
                </div>
            </div>)
        } else {
            slot = (
                <div className={classes.Slot} onMouseOver={() => this.setState({slotOnHover:true})}>
                    <div className={classes.StartTime}>
                    Start  <span style={{color:'red'}}>{this.state.startHours}:{this.state.startMins === 0 ? '00' : this.state.startMins}</span>
                </div>
                <div className={classes.EndTime}>
                    End  <span style={{color:'red'}}>{this.state.endHours}:{this.state.endMins === 0 ? '00' : this.state.endMins}</span>
                </div>
                    <div className={classes.Task}>
                        {this.state.taskID ? 'Task: ' + this.state.taskName : 'blank'}
                    </div>
                </div>
            )
        }
        return(
            <React.Fragment>
                {slot}
            </React.Fragment>
        )
    }
}

export default Slot