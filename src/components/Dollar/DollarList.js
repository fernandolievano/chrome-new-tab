import React from 'react';
import useDollarPrice from 'hooks/useDollarPrice';
import './dollar.css';

const DollarList = () => {
  const { dollarPrices, dollarErrors, isLoading } = useDollarPrice();
  if (isLoading) {
    return (
      <div className="flex py-1 px-0 w-full text-gray-600">
        Cargando...
      </div>
    )
  } else {
    if (dollarErrors) {
      return (
        <div className="flex py-1 px-0 w-full text-red-500">
          No se pudieron cargar los datos
        </div>
      )
    } else {
      return (
        <div className="overflow-hidden flex py-1 px-0 relative gap-4 select-none w-full">
          <div className="marquee flex flex-shrink-0 justify-around gap-[15px]">
            {
              dollarPrices.map(price => {
                return (
                  <div className="py-1" key={price.casa}>
                    <div className={(price.casa === 'oficial' ? 'text-[#0F9D58]' : 'text-gray-700')}>
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
                    <div className={(price.casa === 'oficial' ? 'text-[#0F9D58]' : 'text-gray-700')}>
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