import react,{useState} from 'react';
import './App.css';
import MetaMask from './components/MetaMask.js';

function App() {
  const [metaMaskAvailable, setMetaMaskAvailable] = useState(typeof window.ethereum !=="undefined")
  return (
    <div className="App">
      <div className="App-Item">
        {
          metaMaskAvailable?<MetaMask/>:"Looks metaMask is not installed or isn't enabled"
        }
        
      </div>
    </div>
  );
}

export default App;
