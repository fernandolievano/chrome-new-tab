
import Clock from './components/Clock/Clock';
import Wallpaper from './components/Wallpaper/Wallpaper';

function App() {

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black'>
      <Wallpaper />
      <Clock />
    </div>
  );
}

export default App;
