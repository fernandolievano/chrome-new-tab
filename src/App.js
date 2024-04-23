import Clock from 'components/Clock/Clock';
import Search from 'components/Search/Search';
import Dollar from 'components/Dollar/Dollar';
import Wallpaper from 'components/Wallpaper/Wallpaper';
import useCheckConnection from 'hooks/useCheckConnection';
import './App.css';

function App() {
  const { online } = useCheckConnection();

  return (
    <div className="bg-black text-white w-screen h-screen p-8 flex flex-col items-center justify-center">
      {!!online ? <Wallpaper /> : (<p className='absolute top-0 left-0 p-4 uppercase font-bold'>Sin conexión</p>)}
      <Clock />
      <Search />
      {!!online ? <Dollar /> : (<p className='absolute bottom-0 left-0 right-0 mx-auto text-center p-4'>Revisa tu conexión a internet</p>)}
    </div>
  );
}

export default App;
