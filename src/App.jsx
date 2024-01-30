import './App.css';
import Header from './Components/Header';
import Ratgame from './Components/Ratgame';

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col space-y">
<Header/>
      <Ratgame/>
    </div>
  );
}

export default App;
