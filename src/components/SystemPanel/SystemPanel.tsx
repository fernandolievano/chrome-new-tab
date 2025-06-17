import useSystemPanel from './useSystemPanel';

const SystemPanel = () => {
  const { isOnline, tabsCount, mediaTabs } = useSystemPanel();

  return (
    <div className="text-sm text-white bg-black/30 p-2 rounded-lg w-full grid grid-rows-1 grid-cols-[auto_auto_1fr] items-center gap-4 backdrop-blur-md shadow absolute bottom-0 left-0 right-0">
      <div className='flex items-center justify-start gap-1'>
        <span>🌐 Estado:</span>
        <span className='font-bold'>{isOnline ? 'En línea' : 'Offline'}</span>
        <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
      </div>
      <div className='flex items-center justify-start gap-1'>
        <span>📑 Pestañas:</span>
        <span className="font-bold text-orange-300">{tabsCount}</span>
      </div>
      {mediaTabs.length > 0 && (
        <div className="w-full flex items-center justify-items-start gap-1">
          🔊 Reproduciendo:
          {mediaTabs.map((tab) => (
            <div key={tab.id} className="italic text-gray-200 truncate max-w-full font-bold animate-pulse">
              {tab.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemPanel;