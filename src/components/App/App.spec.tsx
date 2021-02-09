import React from 'react';
import { render } from '@testing-library/react';
import {
  inputTestkitFactory,
  checkboxTestkitFactory,
  buttonTestkitFactory,
  textTestkitFactory,
  dropdownTestkitFactory,
  inputAreaTestkitFactory,
} from 'wix-style-react/dist/testkit';
import App from './App';

const getTextDrivers = (baseElement: Element) => {
  const nameTextDriver = textTestkitFactory({
    wrapper: baseElement,
    dataHook: 'name-text',
  });
  const colorTextDriver = textTestkitFactory({
    wrapper: baseElement,
    dataHook: 'color-text',
  });
  const funFactTextDriver = textTestkitFactory({
    wrapper: baseElement,
    dataHook: 'fun-fact-text',
  });

  return {
    nameTextDriver,
    colorTextDriver,
    funFactTextDriver,
  };
};

const getButtonDriver = (baseElement: Element) =>
  inputTestkitFactory({
    wrapper: baseElement,
    dataHook: 'name-input',
  });

const getCheckboxDriver = (baseElement: Element) =>
  checkboxTestkitFactory({
    wrapper: baseElement,
    dataHook: 'terms-of-use-checkbox',
  });

const getDropdownDriver = (baseElement: Element) =>
  dropdownTestkitFactory({
    wrapper: baseElement,
    dataHook: 'color-dropdown',
  });

const getInputAreaDriver = (baseElement: Element) =>
  inputAreaTestkitFactory({
    wrapper: baseElement,
    dataHook: 'fun-fact-input-area',
  });

const getSubmitButtonDriver = (baseElement: Element) =>
  buttonTestkitFactory({
    wrapper: baseElement,
    dataHook: 'submit-button',
  });

describe('App', () => {
  it('should show correct submitted data', async () => {
    const { baseElement } = render(<App />);
    const inputDriver = getButtonDriver(baseElement);
    const checkboxDriver = getCheckboxDriver(baseElement);
    const { driver: dropdownDriver } = getDropdownDriver(baseElement);
    const inputAreaDriver = getInputAreaDriver(baseElement);
    const submitButtonDriver = getSubmitButtonDriver(baseElement);

    await inputDriver.enterText('Egidijus');
    await checkboxDriver.click();
    await dropdownDriver.selectOptionById(2);
    await inputAreaDriver.enterText('Some fun fact');
    await submitButtonDriver.click();

    const {
      nameTextDriver,
      colorTextDriver,
      funFactTextDriver,
    } = getTextDrivers(baseElement);

    expect(nameTextDriver.getText()).toBe('Egidijus');
    expect(colorTextDriver.getText()).toBe('Blue');
    expect(funFactTextDriver.getText()).toBe('Some fun fact');
  });

  it('should not show submitted data if terms of use is not selected', async () => {
    const { baseElement, debug } = render(<App />);
    const inputDriver = getButtonDriver(baseElement);
    const submitButtonDriver = getSubmitButtonDriver(baseElement);

    await inputDriver.enterText('Egidijus');
    await submitButtonDriver.click();

    const {
      nameTextDriver,
      colorTextDriver,
      funFactTextDriver,
    } = getTextDrivers(baseElement);

    expect(nameTextDriver.exists()).toBe(false);
    expect(colorTextDriver.exists()).toBe(false);
    expect(funFactTextDriver.exists()).toBe(false);
  });

  it('should clear the form', async () => {
    const { baseElement } = render(<App />);
    const inputDriver = getButtonDriver(baseElement);
    const checkboxDriver = getCheckboxDriver(baseElement);
    const {
      driver: dropdownDriver,
      inputDriver: dropdownInputDriver,
    } = getDropdownDriver(baseElement);
    const inputAreaDriver = getInputAreaDriver(baseElement);

    await inputDriver.enterText('Egidijus');
    await checkboxDriver.click();
    await dropdownDriver.selectOptionById(2);
    await inputAreaDriver.enterText('Some fun fact');

    expect(inputDriver.getValue()).toBe('Egidijus');
    expect(checkboxDriver.isChecked()).toBe(true);
    expect(dropdownInputDriver.getValue()).toBe('Blue');
    expect(inputAreaDriver.getValue()).toBe('Some fun fact');

    const clearButtonDriver = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: 'clear-button',
    });

    await clearButtonDriver.click();

    expect(inputDriver.getValue()).toBe('');
    expect(checkboxDriver.isChecked()).toBe(false);
    expect(dropdownInputDriver.getValue()).toBe('');
    expect(inputAreaDriver.getValue()).toBe('');
  });
});
