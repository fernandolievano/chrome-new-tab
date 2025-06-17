
import Wallpaper from './components/Wallpaper/Wallpaper';
import Clock from './components/Clock/Clock';
import Search from './components/Search/Search';
import SystemPanel from './components/SystemPanel/SystemPanel';
import SystemPanelDetails from './components/SystemPanel/SystemPanelDetails';

function App() {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black'>
      <Wallpaper />
      <Clock />
      <Search />

      <SystemPanelDetails />
      <SystemPanel />
    </div>
  );
}

export default App;
