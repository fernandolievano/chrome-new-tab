
import Wallpaper from './components/Wallpaper/Wallpaper';
import Clock from './components/Clock/Clock';
import Search from './components/Search/Search';
import SystemPanel from './components/SystemPanel/SystemPanel';

function App() {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black'>
      <Wallpaper />
      <Clock />
      <Search />

      <SystemPanel />
    </div>
  );
}

export default App;
