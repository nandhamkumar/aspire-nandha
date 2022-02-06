// Author: Nandha
// Default Screen - All tabs except Debit Cards is redirected to this page
// This is just a placeholder
import { Text, View } from '../components/Themed';
import { Image } from 'react-native';
import Styles from '../constants/Styles';
import { RootTabScreenProps } from '../types';



export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={[Styles.container,{alignItems:'center', justifyContent:'center'}]}>
      <Image source={require('../assets/images/icon.png')} style={{ width: 100, height: 100 }} />
      <Text style={{ textAlign: 'center', margin: 20 }}>This page is not implemented for this demo. Only debit card has been implemented</Text>

    </View>
  );
}


