import React from 'react';
import styled from 'styled-components/native';
import colors from '../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  size: 'small' | 'large';
  disabled?:boolean
}

const ButtonContainer = styled.TouchableOpacity<{ width: string, disabled:boolean }>`
  align-items: center;
  justify-content: center;
  background-color: ${(props)=> props.disabled ? colors.primaryDisabled : colors.primary};
  border-radius: 10px;
  height: 50px;
  width: ${(props) => props.width};
`;

const ButtonLabel = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const Button: React.FC<ButtonProps> = ({ label, onPress, size ,disabled=false}) => {
  const width = size === 'small' ? '40%' : '90%';

  return (
    <ButtonContainer onPress={onPress} width={width} disabled={disabled}>
      <ButtonLabel>{label}</ButtonLabel>
    </ButtonContainer>
  );
};
