import Clock from 'components/Clock/Clock';
import Search from 'components/Search/Search';
import './App.css';

function App() {
  return (
    <div className="main p-8 flex flex-col items-center justify-center">
      <Clock />
      <Search />
    </div>
  );
}

export default App;
