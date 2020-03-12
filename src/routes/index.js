import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import Home from '../pages/Home';
import DashboardMonitor from '../pages/DashboardMonitor';
import DashboardAlarm from '../pages/DashboardAlarm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/monitoramento" component={DashboardMonitor} />
      <Route path="/alarme" component={DashboardAlarm} />
    </Switch>
  );
}
