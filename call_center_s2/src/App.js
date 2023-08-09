import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
const apikey = 'JEOSITe0KW0CSK5GkjLrSZil_pX7U6brlvA0Jy68QSU'
function App() {

  return (
    <div className="App">
       <div>
       <Map apikey={apikey} />
     </div>
    </div>
  );
}

export default App;
