import { useEffect, useState } from 'react';

const useDollarPrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dollarPrices, setDollarPrices] = useState([]);
  const [dollarErrors, setDollarErrors] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    try {
      fetch("https://dolarapi.com/v1/dolares")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDollarPrices(data);
        setIsLoading(false);
      });
    } catch (error) {
      setDollarErrors(error)
    }
  }, []);

  return {
    isLoading,
    dollarPrices,
    dollarErrors
  };
};

export default useDollarPrice;