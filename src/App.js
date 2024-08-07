import Clock from 'components/Clock/Clock';
import Search from 'components/Search/Search';
import Dollar from 'components/Dollar/Dollar';
import Wallpaper from 'components/Wallpaper/Wallpaper';
import useCheckConnection from 'hooks/useCheckConnection';
import './App.css';

function App() {
  const { online } = useCheckConnection();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-8 text-white bg-black">
      <Wallpaper />
      <Clock />
      <Search />
      {!!online ? <Dollar /> : (<p className='absolute bottom-0 left-0 right-0 p-4 mx-auto text-center'>Revisa tu conexión a internet</p>)}
    </div>
  );
}

export default App;
