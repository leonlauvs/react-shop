import logo from './logo.svg';
import './App.css';
import RegisterComponent from './component/register';

function Header({name, age}){
  return(
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
          Nama : {name}
          Umur : {age}
        </a>
      </header>
  );
}

function App() {
  return (
    // <div className="App">
    //   <Header name="Reza Tri" age ="17"/>
    // </div>
    <RegisterComponent />
  );
}

export default App;
