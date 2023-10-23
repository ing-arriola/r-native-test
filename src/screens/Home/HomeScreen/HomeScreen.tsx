import { useContext, useState } from 'react';
import { View, Keyboard} from 'react-native';

import { Button } from '../../../components/Button';
import * as S from './styles';
import {
  ADD_AN_ALERT,
  SELECT_STOCK_TO_WATCH
} from '../../../constants/Labels';
import DropDownPicker from 'react-native-dropdown-picker';
import { InputText } from '../../../components/Input';
import StockContext from '../../../context/Stockcontext';
import Modal from "react-native-modal";

export const HomeScreen = () => {
  const context = useContext(StockContext)
  const [priceAlert, setpriceAlert] = useState<string>('');
  const availableStocks = [{"description":"Binance ASTR/BTC","displaySymbol":"ASTR/BTC","symbol":"BINANCE:ASTRBTC"},{"description":"Binance WBTC/USDT","displaySymbol":"WBTC/USDT","symbol":"BINANCE:WBTCUSDT"},{"currency":"USD","description":"AMAZON.COM INC","displaySymbol":"AMZN","figi":"BBG000BVPV84","isin":null,"mic":"XNAS","shareClassFIGI":"BBG001S5PQL7","symbol":"AMZN","symbol2":"","type":"Common Stock"},{"currency":"USD","description":"MICROSOFT CORP","displaySymbol":"MSFT","figi":"BBG000BPH459","isin":null,"mic":"XNAS","shareClassFIGI":"BBG001S5TD05","symbol":"MSFT","symbol2":"","type":"Common Stock"}]
  
  const [isModalVisible, setisModalVisible] = useState(false)
  //Dropdown
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [items, setItems] = useState(availableStocks.map(item => ({
    label: item.displaySymbol,
    value: item.symbol
  })));

  
  const AddNewAlert = () => {
    //navigation.navigate('ProductDetail', { product: product });
    Keyboard.dismiss()
    setisModalVisible(true)
    const alreadyExistingStocks = context?.stocksToWatch ? context.stocksToWatch : []
    const newStockTobeWatched = {
      alert:priceAlert,
      stockToWatch:selectedStock
    }
    const stocksToSet = [...alreadyExistingStocks,newStockTobeWatched]
    context?.setstocksToWatch(stocksToSet)
    
  };
  

  

  return (
    <S.Container>
      <View style={{padding:20}} >
        <S.TitleContainer>
          <S.TitleBold>{ADD_AN_ALERT}</S.TitleBold>
        </S.TitleContainer>
        <S.TextSecondary>{SELECT_STOCK_TO_WATCH}</S.TextSecondary>
        <DropDownPicker
          open={open}
          value={selectedStock }
          items={items}
          setOpen={setOpen}
          setValue={setSelectedStock}
          setItems={setItems}
          placeholder='Select a stock to watch'
        />
        <InputText
           label='price alert'
           placeholderText='price alert'
           value={priceAlert}
           onchange={(value) => setpriceAlert(value)}

        />
        <S.ButtonContainer>
        <Button
              label="Add"
              onPress={selectedStock === '' || priceAlert === '' ? ()=>{} :() => AddNewAlert()}
              size="large"
              disabled={selectedStock === '' || priceAlert === ''}
            />
        </S.ButtonContainer>
      </View>
      <Modal isVisible={isModalVisible}>
        <S.CardContainer >
          <S.Title>Added new a new alert</S.Title>
          <S.TextSecondary >{`Added an alert for ${selectedStock}`}
          </S.TextSecondary>
          <Button 
            label='Accept' 
            onPress={()=>setisModalVisible(false)}
            size='small'  
          />
        </S.CardContainer>
      </Modal>
    </S.Container>
  );
};
