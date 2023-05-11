import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Payment from './payment/payumoney';

import Response from './payment/response' 
import './bootstrap.min.css';

export default function App() {

    return (

        <Router>

            <div>
                <Switch>
                    <Route exact path="/">
                        <Payment />
                    </Route>
                    <Route path="/response">
                        <Response />
                    </Route>
                </Switch>
            </div>

        </Router>
    )
}