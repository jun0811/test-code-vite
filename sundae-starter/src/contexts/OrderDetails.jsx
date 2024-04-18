import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants/index';
import OrderEntry from '../pages/entry/OrderEntry';
const OrderDetail = createContext();
// custom hook
// check whether we're in a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetail);

  if (!context) throw new Error('use OrderDetail must be called in Provider');
  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionsCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateOrderItemCount = (itemName, newItemCount, optionType) => {
    const newOptionCounts = { ...optionsCounts };

    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionType) => {
    const values = Object.values(optionsCounts[optionType]);

    const totalCnt = values.reduce((pre, cur) => {
      return +cur + pre;
    }, 0);
    return totalCnt * pricePerItem[optionType];
  };

  const total = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = {
    total,
    optionsCounts,
    updateOrderItemCount,
    resetOrder,
  };
  return <OrderDetail.Provider value={value} {...props} />;
};
