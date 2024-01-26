import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.sass';
import AboutUs from './routes/about-us/AboutUs';
import DevelopmentServices from './routes/development-services/DevelopmentServices';
import Directory from './routes/directory/Directory';
import Home from './routes/home/Home';
import LocationDetail from './routes/location-detail/LocationDetail';
import Payment from './components/payment/Payment';
import Footer from './shared/footer/Footer';
import Header from './shared/header/Header';
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import Store from './context/Store';
import Seminar from './routes/seminar/Seminar';

function App() {

  return (
    <Store>
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
          path='/location/preview/:id'
          component={LocationDetail}
        />
        <Route
          path='/location/:slug'
          component={LocationDetail}
        />
        <Route
          path='/seminar'
          component={Seminar}
        />
        <Route
          path='/privacy-policy'
          render={() => (<img src="https://cdn.dribbble.com/users/1044993/screenshots/13234956/media/e83a3fdf897bcdd4762048aa58c8a68e.png" />)}
        />
        <Redirect to='/'/>
      </Switch>
      <Route
        path='/'
        component={Footer}
      />
    </BrowserRouter>
    </Store>
  );
}

export default App;
