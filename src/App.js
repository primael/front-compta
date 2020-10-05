import React from 'react';
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ListCv from './cv/ListCv';
import AppClient from './client/AppClient';
import AppStructure from './structure/AppStructure';
import AppMission from './mission/AppMission';

function App() {
  return (
    <React.StrictMode>
      <div>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/clients" render={() => <AppClient editing={false} adding={false} listing={true} />} />
              <Route exact path="/cvs" component={ListCv} />
              <Route exact path="/structures" render={() => <AppStructure editing={false} adding={false} listing={true} />} />
              <Route exact path="/missions" render={() => <AppMission editing={false} adding={false} listing={true} />} />
            </Switch>
          </div>
        </div>
      </React.StrictMode>
  );
}

export default App;
