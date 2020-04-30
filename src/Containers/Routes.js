import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Today from '../Components/Today'
import Weekly from '../Containers/Weekly/Weekly'

class Routes extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Switch>
                    <Route
                        path='/' exact
                        component={Weekly}
                    />
                    <Route
                        path='/today' exact
                        component={Today}
                    />
                    <Route
                        path='/week' exact
                        component={Weekly}
                    />
                </Switch>
            </React.Fragment>
        )
    }
}

export default Routes