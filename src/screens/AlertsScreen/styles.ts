import styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import colors from '../../constants/colors';
import { PixelRatio, Platform, StatusBar } from 'react-native';

  export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: ${Platform.OS === 'android'
    ? StatusBar.currentHeight
    : PixelRatio.getPixelSizeForLayoutSize(StatusBar.currentHeight || 0)}px;
`;


export const StyledImage = styled.Image`
  height: ${hp('35%')}px;
  width: ${wp('55%')}px;
  border-radius: ${hp('1%')}px;
`;

export const CardContainer = styled.View`
  padding: ${hp('4%')}px ${hp('2%')}px;
  border-radius: ${hp('1%')}px;
  background-color:${colors.white};
  margin-bottom: ${hp('2%')}px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: ${hp('40%')}px;
  width: ${wp('80%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${hp('1%')}px;
  background-color: ${colors.white};
`;

export const AlertsContainer = styled.View`
  width: ${wp('80%')}px;
  height: ${hp('80%')}px;
  justify-content: center;
`;

export const TextSecondary = styled.Text`
  color: ${colors.textSecondary};
  font-size: ${hp('2%')}px;
  font-weight: bold;
  margin-top: ${hp('3.5%')}px;
  margin-bottom: ${hp('2%')}px;
`;

export const H1 = styled.Text`
  font-size: ${hp('3%')}px;
  font-weight: bold;
`;
