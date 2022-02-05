// Nandha - Update the configurations as per our screens

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../types';


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'Home',
            },
          },
          DebitCard: {
            screens: {
              DebitCard: 'DebitCard',
            },
          },
        },
      },
    },
  },
};

export default linking;
