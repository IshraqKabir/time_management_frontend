import React from 'react'
import classes from './Slot.module.css'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaTrash } from 'react-icons/fa'
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
        slotOnHover: false,
        onDelete: false

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

    handleDelete = (e) => { 
        console.log(`Delete button clicked on slot id : ${this.state.id} task : ${this.state.taskName}`)
        this.setState({onDelete:true})
    }

    render(){
        let slot = null
        if (this.state.onDelete) {
            slot = (
                <div className={classes.SlotOnDelete} onMouseLeave={() => this.setState({slotOnHover: false})}>
                <div className={classes.StartTime}>
                    Start  <span style={{color:'red'}}>{this.state.startHours}:{this.state.startMins === 0 ? '00' : this.state.startMins}</span>
                </div>
                <div className={classes.EndTime}>
                    End  <span style={{color:'red'}}>{this.state.endHours}:{this.state.endMins === 0 ? '00' : this.state.endMins}</span>
                </div>
                <div className={classes.DeleteConfirmation}>
                    <div>Are you sure you want to delete?</div>
                    <div style={{display:'inline'}}><span style={{color:'red'}} onClick={this.props.onDelete}>Yes</span> <span>No</span></div>
                </div>
                <div className={classes.Buttons}>
                    {/* <button>Delete
                    </button> */}
                    <FaTrash className={classes.Trash} onClick={this.handleDelete} />
                    {/* <button className={classes.DeleteButton} onClick={this.handleDelete}>-</button> */}
                    {/* <span ><FontAwesomeIcon id={this.state.id} onClick={this.handleDelete} icon={faInfo} style={{color:'blue'}}/></span> */}
                    {/* <FontAwesomeIcon icon={faTrash} style={{color:'red', marginLeft:'10px', marginRight:'5px'}}/> */}
                </div>
                <div className={classes.Task}>
                    {this.state.taskID ? 'Task: ' + this.state.taskName : 'blank'}
                </div>
                <div className={classes.Agenda}>
        
                </div>
                <div className={classes.Objective}>
                    
                </div>
                <div className={classes.Project}>
                    {this.state.projectName ? 'Project :' + this.state.projectName : null}
                </div>
            </div>
            )
        }
        else if (this.state.slotOnHover) {
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
                    <FaTrash className={classes.Trash} onClick={this.handleDelete} />
                    {/* <button className={classes.DeleteButton} onClick={this.handleDelete}>-</button> */}
                    {/* <span ><FontAwesomeIcon id={this.state.id} onClick={this.handleDelete} icon={faInfo} style={{color:'blue'}}/></span> */}
                    {/* <FontAwesomeIcon icon={faTrash} style={{color:'red', marginLeft:'10px', marginRight:'5px'}}/> */}
                </div>
                <div className={classes.Task}>
                    {this.state.taskID ? 'Task: ' + this.state.taskName : 'blank'}
                </div>
                <div className={classes.Agenda}>
        
                </div>
                <div className={classes.Objective}>
                    
                </div>
                <div className={classes.Project}>
                    {this.state.projectName ? 'Project :' + this.state.projectName : null}
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