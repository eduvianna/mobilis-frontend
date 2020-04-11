import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import Home from '../pages/Home';
import Monitor from '../pages/Monitor';
import Alarm from '../pages/Alarm';
import Report from '../pages/Report';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/monitoramento" component={Monitor} />
      <Route path="/alarme" component={Alarm} />
      <Route path="/relatorio" component={Report} />
    </Switch>
  );
}
