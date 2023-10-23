import { useCallback, useContext, useState } from 'react';
import { Text, View } from 'react-native';

import StockContext from '../../context/Stockcontext';
import {
  ALERTS_CURRENTLY_ACTIVATED,
} from '../../constants/Labels';
import * as S from './styles';
import { useFocusEffect } from '@react-navigation/native';

export const AlertsScreen = () => {
  const [currentStockPrice, setcurrentStockPrice] = useState(0)
  const [marginalchange, setmarginalchange] = useState(0)
  const context = useContext(StockContext)
  const {stocksToWatch} = context!
  
  useFocusEffect(
    useCallback(() => {
      const alreadyExistingStocks = context?.stocksToWatch ? context.stocksToWatch : []
      const socket = new WebSocket('wss://ws.finnhub.io?token=ckpki91r01qkitmj3tmgckpki91r01qkitmj3tn0');
  
      socket.addEventListener('open', function (event) {
        // Subscribe to WebSocket when it's open
        alreadyExistingStocks.forEach(stockToBeSuscribed => {
          socket.send(JSON.stringify({'type':'subscribe', 'symbol': stockToBeSuscribed.stockToWatch}));
        });
      });
  
      socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);
  
        if (socket.readyState === WebSocket.OPEN) {
          // Handle messages
          if (data.data && data.data.length > 0) {
            const currentPrice = parseFloat(data.data[0].c[0]);
            setcurrentStockPrice(currentPrice);
            const previousPrice = data.data[0].p;
            const change = currentPrice - previousPrice;
            const percentageChange = (change / previousPrice) * 100;
            setmarginalchange(percentageChange);
          }
        }
      });
  
      return () => {
        // Cleanup: Unsubscribe and close the WebSocket
        alreadyExistingStocks.forEach(stockToBeUnSuscribed => {
          socket.send(JSON.stringify({'type':'unsubscribe','symbol': stockToBeUnSuscribed.stockToWatch}));
        });
        socket.close();
      };
    }, [])
  );
  
  return (
    <S.Container
    >
      <S.H1>{ALERTS_CURRENTLY_ACTIVATED}</S.H1>
      <S.AlertsContainer>
        {
          stocksToWatch ? stocksToWatch.map((stock,index) => (
            <View key={index}>
              <S.CardContainer>
                <Text>
                  {JSON.stringify(stock.stockToWatch)}
                </Text>
                <Text>
                  {`Current price: ${currentStockPrice}`}
                </Text>
                <Text>
                  {`Marginal change: ${marginalchange}`}
                </Text>
              </S.CardContainer>
            </View>
          )) : <View style={{ display:'flex',justifyContent:'center',alignItems:'center'}} >
            <S.StyledImage source={require('../../../assets/void.png')}/>
            <Text>There are no alerts currently activated</Text>
            </View>
        }
      </S.AlertsContainer>
      
    </S.Container>
  );
};