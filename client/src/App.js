import logo from './logo.svg';
import './App.css';

const localHost = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3005';

function App() {

  const fetchServerData = () => {
    fetch(localHost + '/api/')
      .then(response => {
        console.log('response :>> ', response);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={fetchServerData}>
          Test API
        </button>
      </header>
    </div>
  );
}

export default App;
