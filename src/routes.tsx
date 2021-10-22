import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';

export default (): React.ReactElement => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home}/>
        </Switch>
    </BrowserRouter>
);