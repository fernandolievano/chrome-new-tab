import Clock from 'components/Clock/Clock';
import Search from 'components/Search/Search';
import Dollar from 'components/Dollar/Dollar';
import './App.css';

function App() {
  return (
    <div className="main p-8 flex flex-col items-center justify-center">
      <Clock />
      <Search />
      <Dollar />
    </div>
  );
}

export default App;
