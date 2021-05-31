import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.sass';
import AboutUs from './routes/about-us/AboutUs';
import DevelopmentServices from './routes/development-services/DevelopmentServices';
import Directory from './routes/directory/Directory';
import Home from './routes/home/Home';
import LocationDetail from './routes/location-detail/LocationDetail';
import Payment from './routes/payment/Payment';
import Footer from './shared/footer/Footer';
import Header from './shared/header/Header';
import ScrollToTop from './components/scrollToTop/ScrollToTop'

function App() {

  return (
    <BrowserRouter>
      <Route
        path='/'
        component={Header}
      />
      <ScrollToTop/>
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
        <Route
          path='/location/:slug'
          component={LocationDetail}
        />
        <Redirect to='/'/>
      </Switch>
      <Route
        path='/'
        component={Footer}
      />
    </BrowserRouter>
  );
}

export default App;
