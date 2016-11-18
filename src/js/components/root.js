
import React, { Component } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../utils/configure-store'
import { path } from '../routes'
//We work with `redux`, so our app will need a reducer
import mainReducer from '../reducers/index'
//We need to import the components attached to the routes
//`App` is our main component. It can contain for instance an application bar.
//It will embed all the other components, thanks to `react-router` mechanism.
import App from './app'
import Login from './login'
import GSBPMExplorer from './gsbpm-explorer'
import GSIMExplorer from './gsim-explorer'
import NSIExplorer from './nsi-explorer'
import ExplorerChoice from './explorer-choice'
import Service from './service'
import Services from './services'
import ServiceCreator from './service-creator'
import GSIMGroupSelector from './gsim-group-selector'
import GSIMClassSelector from './gsim-class-selector'
import GSBPMSubProcessDetails from './gsbpm-subprocess-details'
import GSBPMPhaseDetails from './gsbpm-phase-details'
import GSIMClassDetails from './gsim-class-details'
import NSIDetails from './nsi-details'
import { requireAuth } from '../utils/authentication'

//We need to create a store. `configureStore` add a little extra config to
//allow to work with asyncrhonous actions and to use the redux dev tools.
const store = configureStore(mainReducer)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/login" component={Login} />
          <Route path="/"
            component={App}
            onEnter={requireAuth} >
            {/* default component if the route does not match any over
            route */}
            <IndexRoute component={Services} />
            <Route path={path.create}
              component={ServiceCreator} />
            <Route path={path.serviceDetails}
              component={Service} />
            <Route path="/gsbpm">
              <IndexRoute component={GSBPMExplorer} />
              <Route path="subprocess/:GSBPMSub"
                component={GSBPMSubProcessDetails} />
              <Route path="phase/:GSBPMPhase"
                component={GSBPMPhaseDetails} />
            </Route>
            <Route path="/gsim">
                <IndexRoute component={GSIMExplorer} />
                <Route path=":GSIMClass"
                       component={GSIMClassDetails}/>
            </Route>
            <Route path="/nsis">
                <IndexRoute component={NSIExplorer} />
                <Route path=":NSIId"
                       component={NSIDetails}/>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
