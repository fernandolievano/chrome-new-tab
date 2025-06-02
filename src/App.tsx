
import Wallpaper from './components/Wallpaper/Wallpaper';
import Clock from './components/Clock/Clock';
import Search from './components/Search/Search';

import useCheckConnection from './components/useCheckConnection';

function App() {
  const { isOnline } = useCheckConnection();
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black'>
      <Wallpaper />
      <Clock />
      <Search />

      <div className="absolute bottom-0 w-full h-8 bg-black/25 text-white backdrop-blur-lg text-center py-2 flex items-center justify-center">
        <span className="mr-2">Connection Status:</span>
        <span className={`inline-block w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </div>
    </div>
  );
}

export default App;
