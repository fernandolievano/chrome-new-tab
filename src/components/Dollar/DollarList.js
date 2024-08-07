import React from 'react';
import useDollarPrice from 'hooks/useDollarPrice';
import './dollar.css';

const DollarList = () => {
  const { dollarPrices, dollarErrors, isLoading } = useDollarPrice();
  if (isLoading) {
    return (
      <div className="flex w-full px-2 py-1 text-gray-400">
        Cargando...
      </div>
    )
  } else {
    if (dollarErrors) {
      return (
        <div className="flex w-full px-2 py-1 text-red-400">
          No se pudieron cargar los datos
        </div>
      )
    } else {
      return (
        <div className="relative flex w-full gap-4 px-0 py-1 overflow-hidden select-none">
          <div className="marquee flex flex-shrink-0 justify-around gap-[15px]">
            {
              dollarPrices.map(price => {
                return (
                  <div className="py-1" key={price.casa}>
                    <div className={(price.casa === 'oficial' ? 'text-green-300' : 'text-white')}>
                      <span>{price.nombre}:</span>{' '}<strong>${price.venta}</strong>
                    </div>
                  </div>
                );
              })
            }

          </div>
          <div className="marquee flex flex-shrink-0 justify-around gap-[15px]" aria-hidden="true">
            {
              dollarPrices.map(price => {
                return (
                  <div className="py-1" key={price.casa}>
                    <div className={(price.casa === 'oficial' ? 'text-green-300' : 'text-white')}>
                      <span>{price.nombre}:</span>{' '}<strong>${price.venta}</strong>
                    </div>
                  </div>
                );
              })
            }

          </div>
        </div>
      );
    }
  }
};

export default DollarList;