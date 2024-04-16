import { useEffect, useState } from 'react';

const useDollarPrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dollarPrices, setDollarPrices] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://dolarapi.com/v1/dolares")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDollarPrices(data);
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    dollarPrices
  };
};

export default useDollarPrice;