import useSystemPanel from './useSystemPanel';
import './system-panel.css';

const SystemPanel = () => {
  const { isOnline, tabsCount, mediaTabs, marqueeRef, isOverflowing, toggleDetailsModal } = useSystemPanel();

  return (
    <div className="text-sm text-white bg-black/30 backdrop-blur-md shadow absolute bottom-0 left-0 right-0 overflow-hidden">
      <div id="marquee" ref={marqueeRef} className={`w-fit min-w-full py-2 px-4 flex justify-between items-center gap-4 select-none ${isOverflowing ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => toggleDetailsModal(true)}>
        <div className="flex justify-start items-center gap-4">
          <div className='flex items-center justify-start gap-1 min-w-fit'>
            <span>🌐 Estado:</span>
            <span className='font-bold'>{isOnline ? 'En línea' : 'Offline'}</span>
            <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
          </div>
          <div className='flex items-center justify-start gap-1 min-w-fit'>
            <span>📑 Pestañas:</span>
            <span className="font-bold text-orange-300">{tabsCount}</span>
          </div>
          <div className='min-w-fit w-auto flex items-center justify-items-start gap-1'>
            {mediaTabs.length > 0 && (
              <>
                <span className='min-w-fit whitespace-nowrap pr-2'>🔊 Reproduciendo:</span>
                <div className="relative overflow-hidden whitespace-nowrap truncate">
                  <div className="flex items-start">
                    {mediaTabs.map((tab, index, array) => (
                      <div key={tab.id} className="text-gray-200 min-w-fit font-bold animate-pulse">
                        {tab.title}
                        {index < array.length - 1 && <span className="mx-2 text-indigo-500">•</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPanel;