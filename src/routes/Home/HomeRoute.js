import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import SingleProduct from './components/SingleProduct/SingleProduct';
import HomePage from './HomePage';

export default function HomeRoute() {
  let match = useRouteMatch();

    return (
        <div>
            <Switch>
              {/* <Route path={`${match.path}/purchase`}>
                <Purchase />
              </Route>
              <Route path={`${match.path}/stock`}>
                <Stock />
              </Route>
              <Route path={`${match.path}/soldstock`}>
                <SoldStock />
              </Route> */}
              {/* <Route path={`${match.path}/singleproduct`}> */}
              <Route path='/singleproduct' exact>
                <SingleProduct />
              </Route>
              {/* <Route path={match.path}> */}
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
        </div>
    )
}
