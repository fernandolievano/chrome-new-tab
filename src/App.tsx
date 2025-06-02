
import Wallpaper from './components/Wallpaper/Wallpaper';
import Clock from './components/Clock/Clock';
import Search from './components/Search/Search';

function App() {

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black'>
      <Wallpaper />
      <Clock />
      <Search />
    </div>
  );
}

export default App;
