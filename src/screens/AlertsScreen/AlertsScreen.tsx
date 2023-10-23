import { useContext } from 'react';
import { Text, View } from 'react-native';

import StockContext from '../../context/Stockcontext';
import {
  ALERTS_CURRENTLY_ACTIVATED,
} from '../../constants/Labels';
import * as S from './styles';
import { useFocusEffect } from '@react-navigation/native';

export const AlertsScreen = () => {
  const context = useContext(StockContext)
  const {stocksToWatch} = context!
  useFocusEffect(() => {
    const alreadyExistingStocks = context?.stocksToWatch ? context.stocksToWatch : []
    const socket = new WebSocket('wss://ws.finnhub.io?token=ckpki91r01qkitmj3tmgckpki91r01qkitmj3tn0');
    console.log('stocks',context?.stocksToWatch)
    if(context?.stocksToWatch !== undefined){
      // Connection opened -> Subscribe
      alreadyExistingStocks.map(stockToBeSuscribed => (
      socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': stockToBeSuscribed.stockToWatch}))
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
      })
    ))
    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
    }
    
    return () => {
      alreadyExistingStocks.map(stockToBeUnSuscribed => {
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': stockToBeUnSuscribed.stockToWatch}))
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': 'AAPL'}))
    })


      }
  })
  
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