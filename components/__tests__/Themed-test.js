// Author: Nandha
// Unit Test Themed Components - Snapshot Testing

import * as React from 'react';
import renderer from 'react-test-renderer';
import { Ionicons, Text, TouchableOpacity, View } from '../Themed';


//Test Text Component
it(`Text renders correctly`, async() => {
  const tree = renderer.create(<Text>Snapshot Test</Text>).toJSON();

  expect(tree).toMatchSnapshot();
});


//Test View Component
it(`View renders correctly`, async() => {
  const tree = renderer.create(<View><Text>Snapshot Test</Text></View>).toJSON();

  expect(tree).toMatchSnapshot();
});


//Test Ionicons Component
it(`Ionicons renders correctly`, async() => {
  const tree = renderer.create(<Ionicons ></Ionicons>).toJSON();

  expect(tree).toMatchSnapshot();
});

//Test TouchableOpacity Component
it(`TouchableOpacity renders correctly`, async() => {
  const tree = renderer.create(<TouchableOpacity><Text>Snapshot Test</Text></TouchableOpacity>).toJSON();

  expect(tree).toMatchSnapshot();
});
