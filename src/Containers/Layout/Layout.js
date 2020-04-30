import React from 'react'
import classes from './Layout.module.css'
import Navbar from '../../Components/Navbar/Navbar'

class Layout extends React.Component {
    render(){
        return(
            <div className={classes.Wrapper}>
                <div className={classes.Header}>
                    <Navbar />
                </div>
                <div className={classes.Main} style={{marginTop:'10px'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout