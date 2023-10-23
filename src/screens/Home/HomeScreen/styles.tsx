import { StatusBar, Platform, PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../../constants/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: ${Platform.OS === 'android'
    ? StatusBar.currentHeight
    : PixelRatio.getPixelSizeForLayoutSize(StatusBar.currentHeight || 0)}px;
`;

export const TitleContainer = styled.View`
  margin-bottom: ${hp('1.5%')}px;
`;

export const TitleBold = styled.Text`
  font-size: ${hp('3%')}px;
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: ${hp('3%')}px;
`;

export const CardContainer = styled.View`
  padding: ${hp('4%')}px ${hp('2%')}px;
  border-radius: ${hp('1%')}px;
  background-color:${colors.white};
  margin-bottom: ${hp('2%')}px;
  align-items: center;
`;

export const Card = styled.View`
  background-color: ${colors.primary};
  width: ${wp('70%')}px;
  height: ${hp('18%')}px;
  border-radius: 20px;
`;

export const WhiteText = styled.Text`
  color: ${colors.white};
  font-size: ${hp('2%')}px;
  font-weight: bold;
  margin-left: ${wp('4%')}px;
  margin-bottom: ${hp('1%')}px;
  margin-top: ${hp('3%')}px;
`;


export const TextSecondary = styled.Text`
  color: ${colors.textSecondary};
  font-size: ${hp('2%')}px;
  font-weight: bold;
  margin-top: ${hp('2%')}px;
  margin-bottom: ${hp('2.5%')}px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-top: ${hp('1%')}px;
`;
