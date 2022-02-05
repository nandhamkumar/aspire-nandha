//This file has custom components that can be reused as needed

import Colors from '../constants/Colors';
import { Text, View, ViewProps, TextProps, TextInput } from './Themed';
import Styles from '../constants/Styles';
import { Switch, Platform, TouchableOpacity, Image } from 'react-native'
import { _formatCurrency } from '../helper'

import { FontAwesome5 } from '@expo/vector-icons';

//This component rendes a badge with the Currency
export function CurrencyBadge(props: TextProps) {
  return <View style={[props.style, { width: 45, backgroundColor: Colors.light.tint, paddingHorizontal: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]}>
    <Text style={{ fontFamily: 'space-mono', color: 'white', fontSize: 16, textAlign: 'center' }} >
      S
    </Text>
    <Text style={{ fontFamily: 'space-mono', color: 'white', fontSize: 20, textAlign: 'center' }} >
      $
    </Text>
  </View>;
}

//This component is used as a header on every screen
//Back button can be enabled optionally
export function Header(props: ViewProps) {
  return (
    <View style={Styles.defaultView}>
      <View style={[Styles.defaultView, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
        {props.goBack ?
          <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 10 }} onPress={props.goBack}>
            <FontAwesome5 name='angle-left' color='white' size={25} />
          </TouchableOpacity> :
          <View />}
        <Image source={require('../assets/images/icon.png')} style={{ width: 25, height: 25 }} />
      </View>
      {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
      <Text style={[Styles.title, { marginTop: 20 }]}>{props.title + ' '}</Text>
    </View>
  )
}


//This component renders a menu row
//Switch is an optional parameter
export function MenuOption(props: ViewProps) {
  return <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', }}>
    <View style={{ backgroundColor: Colors.button, width: 40, height: 40, borderRadius: 40 / 2, alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome5 name={props.icon} color={'white'} size={20} />
    </View>
    <View style={{ marginLeft: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{props.header}</Text>
        {props.onSwitch ?
          <Switch
            // Transform to smaller only in IOS as it appears large in IOS
            style={{ transform: [{ scaleX: Platform.OS == 'ios' ? .7 : 1 }, { scaleY: Platform.OS == 'ios' ? .7 : 1 }] }}
            trackColor={{ false: 'grey', true: Colors.tint }}
            thumbColor={'white'}
            value={props.switchValue}
            onValueChange={
              props.onSwitch
            }
          />
          : null}

      </View>
      <Text style={[Styles.textGrey, { marginTop: Platform.OS == 'android' && props.onSwitch ? -30 : (Platform.OS == 'ios' && props.onSwitch ? -10 : 0) }]}>{props.detail}</Text>
    </View>

  </TouchableOpacity>
}

//This component is used to capture amount information from the user
//it has the currency badge to the left and the text input adapts to the device theme
//The amount is formatted with commas
export function AmountInput(props: ViewProps) {
  return (
    <View style={[Styles.defaultView, { flexDirection: 'row', alignItems: 'center', marginTop: 20, borderBottomColor: Colors.lightGrey, borderBottomWidth: 1, paddingBottom: 5 }]}>

      <CurrencyBadge />
      <TextInput style={{ marginLeft: 10, flex: 1 }} placeholder={props.placeholder ? props.placeholder : ''} keyboard={props.keyboard} value={props.value?props.value.toString():''}
        onChangeText={(text: string) => props.onChangeText(text)} />
    </View>
  )
}

// This component is used to display the auto suggestion of amount values
// has a theme and formats the amount as needed
export function AmountButton(props: ViewProps) {
  return (
    <TouchableOpacity style={{ backgroundColor: Colors.tintColorMild, padding: 10, borderRadius: 5, flexDirection: 'row', width: 100, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => props.onPress(props.value)}>
      {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
      <Text style={{ color: Colors.tint, fontWeight: 'bold' }}>{_formatCurrency(props.value ? props.value : 0, 'S$ ') + '  '}</Text>
    </TouchableOpacity>
  )
}


// This is a default button component that has been styled per our theme
export function Button(props: ViewProps) {
  return (
    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10, marginBottom: 25, backgroundColor: Colors.tint, height: 45, borderRadius: 22, width: 250, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => props.onPress(props.value)}>
      <Text style={{ color: 'white', fontSize: 18 }}>{props.text}</Text>
    </TouchableOpacity>
  )
}

