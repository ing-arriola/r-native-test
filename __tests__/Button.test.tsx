import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../src/components/Button';

describe('Button', () => {
  it('should render the button with the given label', () => {
    const { getByText } = render(
      <Button label="Submit" onPress={() => {}} size="small" />
    );
    const label = getByText('Submit');
    expect(label).toBeDefined();
  });

  it('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button label="Submit" onPress={onPressMock} size="small" />
    );
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should render a small button if size prop is small', () => {
    const { getByTestId } = render(
      <Button label="Submit" onPress={() => {}} size="small" />
    );
    const button = getByTestId('button');
    expect(button.props.style).toMatchObject({ width: '40%' });
  });

  it('should render a large button if size prop is large', () => {
    const { getByTestId } = render(
      <Button label="Submit" onPress={() => {}} size="large" />
    );
    const button = getByTestId('button');
    expect(button.props.style).toMatchObject({ width: '90%' });
  });
});
