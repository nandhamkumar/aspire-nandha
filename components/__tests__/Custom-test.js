import * as React from 'react';
import renderer from 'react-test-renderer';
// Author: Nandha
// Unit Test Custom Components - Snapshot Testing

import { AmountButton, AmountInput, Button, CurrencyBadge, Header, MenuOption, Card, ProgressIndicator } from '../Custom';

//Test AmountButton Component
it(`AmountButton renders correctly`, async () => {
  const tree = renderer.create(<AmountButton></AmountButton>).toJSON();

  expect(tree).toMatchSnapshot();
});


//Test AmountInput Component
it(`AmountInput renders correctly`, async () => {
  const tree = renderer.create(<AmountInput></AmountInput>).toJSON();

  expect(tree).toMatchSnapshot();
});


//Test CurrencyBadge Component
it(`CurrencyBadge renders correctly`, async () => {
  const tree = renderer.create(<CurrencyBadge></CurrencyBadge>).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test Header Component
it(`Header renders correctly`, async () => {
  const tree = renderer.create(<Header></Header>).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test MenuOption Component
it(`MenuOption renders correctly`, async () => {
  const tree = renderer.create(<MenuOption></MenuOption>).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test Button Component
it(`Button renders correctly`, async () => {
  const tree = renderer.create(<Button></Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test CARD Component
it(`Card renders correctly`, async () => {
  const tree = renderer.create(<Card profile_data={{
    "Name": "Nandha Kumar",
    "card_cvv": "432",
    "card_expiry": "12/22",
    "card_limit": 5000,
    "card_number": "8374097534569843",
    "card_spent": 450,
    "card_limit_active": true,
    "card_frozen": false,
    "card_balance": 3000
  }} hide_card_details={false} />).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test CARD Component Hidden Number
it(`Card hidden number renders correctly`, async () => {
  const tree = renderer.create(<Card profile_data={{
    "Name": "Nandha Kumar",
    "card_cvv": "432",
    "card_expiry": "12/22",
    "card_limit": 5000,
    "card_number": "8374097534569843",
    "card_spent": 450,
    "card_limit_active": true,
    "card_frozen": false,
    "card_balance": 3000
  }} hide_card_details={true} />).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test ProgressIndicator Component
it(`ProgressIndicator renders correctly`, async () => {
  const tree = renderer.create(<ProgressIndicator spend_percent={0.4} completed={'$10'} total={'$100'} header={'Test Indicator'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
