import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import AboutUs from './routes/about-us/AboutUs';
import DevelopmentServices from './routes/development-services/DevelopmentServices';
import Directory from './routes/directory/Directory';
import Home from './routes/home/Home';
import Payment from './routes/payment/Payment';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path='/'
          exact
          component={Home}
        />
        <Route
          path='/about-us'
          exact
          component={AboutUs}
        />
        <Route
          path='/development-services'
          exact
          component={DevelopmentServices}
        />
        <Route
          path='/directory'
          exact
          component={Directory}
        />
        <Route
          path='/payment'
          exact
          component={Payment}
        />
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
