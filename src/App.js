import './App.css';
import Admin from "./routes/Admin/Admin";
import StepForm from './routes/Admin/otp/StepForm';
import NewPhoneInput from './routes/Admin/otp/NewPhoneInput';
import CityStepForm from './routes/CityAdmin/components/otp/StepForm';
import SOStepForm from './routes/SellOrders/components/otp/StepForm';
import auth from './auth';
import adminAuth from './adminAuth';
import cityAuth from './auth/cityAuth';
import sellOrderAuth from './auth/sellOrderAuth';
import HomePage from './routes/Home/HomePage';
import SingleProduct from './routes/Home/components/SingleProduct/SingleProduct';
import Checkout from './routes/Home/components/Checkout/Checkout';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Payment from './routes/Home/components/SuccessPayment/Payment';
import Payment from './routes/Home/components/SuccessPayment/SuccessPayment';
import UserDetail from './routes/Home/components/UserDetail/UserDetail';
import { message } from 'antd';
import CityAdmin from './routes/CityAdmin/CityAdmin';
import SellOrders from './routes/SellOrders/SellOrders';


function App() {

  return (
    // <Payment />
    <Router>
      <Switch>
        <Route path="/cityadmin">
          {/* <CityAdmin /> */}
          {cityAuth.isAuthenticated() ? <CityAdmin /> : <CityStepForm />}
        </Route>
        <Route path="/sellorders">
          {/* <SellOrders /> */}
          {sellOrderAuth.isAuthenticated() ? <SellOrders /> : <SOStepForm />}
        </Route>
        <Route path="/admin">
          {adminAuth.isAuthenticated() ? <Admin /> : <NewPhoneInput />}
          {/* <Admin /> */}
        </Route>
        <Route exact path="/checkout/:productId">
          {/* {auth.isAuthenticated() ? <Checkout /> : <HomePage /> } */}
          {auth.isAuthenticated() ? <Checkout /> : () => message.error("Please Login First") }
        </Route>
        <Route exact path="/product/:productId">
          <SingleProduct />
        </Route>
        <Route exact path="/user">
          {/* {auth.isAuthenticated() ? <UserDetail /> : <HomePage /> } */}
          {auth.isAuthenticated() ? <UserDetail /> : () => message.error("Please Login First") }
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
