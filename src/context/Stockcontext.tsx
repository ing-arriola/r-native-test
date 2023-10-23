import React, { createContext, useState, useContext, SetStateAction } from "react";

interface StockContextType {
    stocksToWatch: stockTobeWatched[] | undefined; 
    setstocksToWatch: React.Dispatch<React.SetStateAction<stockTobeWatched[] | undefined>>;
}

const StockContext = createContext<StockContextType|undefined>(undefined);

interface Props {
    children:JSX.Element
}

type stockTobeWatched = {
    stockToWatch: string;
    alert: string;
}

export const StockProvider = ({ children }:Props) => {
  const stock = [
    {
      stockToWatch:'',
      alert:''
  },
  {
    stockToWatch:'',
    alert:''
},

  ]
  const [stocksToWatch, setstocksToWatch] = useState<stockTobeWatched[] | undefined>();

  return (
    <StockContext.Provider value={{ stocksToWatch, setstocksToWatch }}>
      {children}
    </StockContext.Provider>
  );
};

// Crear un custom hook para acceder al contexto
export  const useStockContext = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}

export default StockContext;
