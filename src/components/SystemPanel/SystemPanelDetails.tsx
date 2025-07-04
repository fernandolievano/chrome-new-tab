import useSystemPanel from './useSystemPanel';

const SystemPanelDetails = () => {
  const { toggleDetailsModal, isOnline, tabsCount, tabs, mediaTabs } = useSystemPanel();

  return (
    <div id="system-panel-details" className="fixed w-full h-full -z-40 flex items-center justify-center transition-all duration-1000 py-4 px-4 md:px-8 opacity-0 invisible backdrop-blur-lg">
      <div className="bg-black/75 backdrop-blur-lg rounded w-full max-w-[480px] px-4 py-8 shadow-xl shadow-white/25 text-white z-50 relative">
        <button className="absolute top-2 right-2 text-indigo-400 hover:text-rose-700 transition-colors cursor-pointer" onClick={() => toggleDetailsModal(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="py-4 my-4 w-full border-b border-white/15">
          <h3 className='text-xl font-bold pb-1'>🌐 Estado de conexión</h3>
          <p className='text-sm pl-2'>
            {isOnline ? '✅ En línea' : '❌ Sin conexión'}
          </p>
        </div>

        <div className="pb-4 mb-4 w-full border-b border-white/15">
          <h3 className='text-xl font-bold pb-1'>📑 Pestañas abiertas ({tabsCount})</h3>
          {tabs.map((tab => (
            <p key={tab.id} className='text-sm pl-2'>➡️ {tab.title}</p>
          )))}
        </div>

        <div className="pb-4 mb-4 w-full border-b border-white/15">
          <h3 className='text-xl font-bold pb-1'>🔊 Reproduciendo ({mediaTabs.length})</h3>
          {mediaTabs.map((tab => (
            <p key={tab.id} className='text-sm pl-2'>🎵 {tab.title}</p>
          )))}
        </div>
      </div>
    </div>
  );
};

export default SystemPanelDetails;