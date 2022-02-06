//This file has custom components that can be reused as needed

import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions, Image, Platform, Switch, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { _formatCurrency } from '../helper';
import { Text, TextInput, TextProps, View, ViewProps } from './Themed';
import { CARD_RATIO, MAX_CARD_WIDTH } from '../constants';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

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
            testID={props.switchTestId}
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
    <View style={[Styles.defaultView, { flexDirection: 'row', alignItems: 'center', marginTop: 20, borderBottomColor: Colors.lightGrey, borderBottomWidth: 1, paddingBottom: 5 }]}
      testID={props.testID}>

      <CurrencyBadge />
      <TextInput style={{ marginLeft: 10, flex: 1 }} placeholder={props.placeholder ? props.placeholder : ''} keyboard={props.keyboard} value={props.value ? props.value.toString() : ''}
        onChangeText={(text: string) => props.onChangeText(text)}
      />
    </View>
  )
}

// This component is used to display the auto suggestion of amount values
// has a theme and formats the amount as needed
export function AmountButton(props: ViewProps) {
  return (
    <TouchableOpacity style={{ backgroundColor: Colors.tintColorMild, padding: 10, borderRadius: 5, flexDirection: 'row', width: 100, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => props.onPress(props.value)}
      testID={props.testID}
    >
      {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
      <Text style={{ color: Colors.tint, fontWeight: 'bold' }}>{_formatCurrency(props.value ? props.value : 0, 'S$ ') + '  '}</Text>
    </TouchableOpacity>
  )
}


// This is a default button component that has been styled per our theme
export function Button(props: ViewProps) {
  return (
    <TouchableOpacity disabled={props.disable == undefined ? false : props.disable} style={{ alignSelf: 'center', marginTop: 10, marginBottom: 25, backgroundColor: props.disable ? 'grey' : Colors.tint, height: 45, borderRadius: 22, width: 250, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => props.onPress(props.value)}>
      <Text style={{ color: 'white', fontSize: 18 }}>{props.text}</Text>
    </TouchableOpacity>
  )
}

{/* Debit Card component - Maximum size is limited for better user experience on iPad or Tabelet */ }
export function Card(props: ViewProps) {

  let profile_data = props.profile_data
  let hide_card_details = props.hide_card_details
  return (

    <View style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, zIndex: 5, alignItems: 'center', width: viewportWidth - 40, maxWidth: MAX_CARD_WIDTH, height: (viewportWidth - 40) / CARD_RATIO, maxHeight: MAX_CARD_WIDTH / CARD_RATIO }}>
      <View style={{ borderRadius: 15, padding: 15, backgroundColor: profile_data.card_frozen ? 'grey' : Colors.tint, width: viewportWidth - 40, height: (viewportWidth - 40) / CARD_RATIO, maxWidth: MAX_CARD_WIDTH, maxHeight: MAX_CARD_WIDTH / CARD_RATIO, justifyContent: 'space-around' }}>
        <View style={[Styles.defaultView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          {/* Aspire Logo */}
          <View style={[Styles.defaultView, Styles.viewCenterRow]}>
            <Image source={require('../assets/images/icon.png')} style={{ width: 25, height: 25, tintColor: 'white' }} />
            <Text style={[Styles.subHeading, { marginLeft: 5 }]}>aspire</Text>
          </View>

        </View>
        {/* Name of the card holder */}
        {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
        <Text style={[Styles.title, { marginTop: 10 }]} testID={'DebitCard.CardName'}>
          {profile_data.Name + ' '}
        </Text>

        {/* Card Number & functionality to mask when the user opts to hide 
          Card Number is seperated into 4 parts. Used different text components to spread evenly on all devices
      */}
        <View style={[Styles.defaultView, { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', maxWidth: 300 }]}>
          <Text style={Styles.subHeading}>{(hide_card_details || !profile_data.card_number ? '****' : profile_data.card_number.substring(0, 4))}</Text>
          <Text style={Styles.subHeading}>{(hide_card_details || !profile_data.card_number ? '****' : profile_data.card_number.substring(4, 8))}</Text>
          <Text style={Styles.subHeading}>{(hide_card_details || !profile_data.card_number ? '****' : profile_data.card_number.substring(8, 12))}</Text>
          <Text style={Styles.subHeading}>{!profile_data.card_number ? '****' : profile_data.card_number.substring(12, 16)}</Text>
          <View></View>
        </View>
        {/* Card CVV - Also masked when user chooses to hide card number */}
        <View style={[Styles.defaultView, Styles.viewCenterRow]}>
          <Text style={[Styles.subHeading, { marginTop: 20 }]}>{'Thru: ' + profile_data.card_expiry}</Text>
          <Text style={[Styles.subHeading, { marginLeft: 25, marginTop: 20 }]}>{'CVV: ' + (hide_card_details ? '***' : profile_data.card_cvv)}</Text>
        </View>
        {/* Visa Logo - Used an image to replicate the exact design */}
        <View style={[Styles.defaultView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
          <Image source={require('../assets/images/visa-logo.png')} style={{ width: 70, height: 20, marginRight: 10 }} />
        </View>
      </View>

    </View>
  )
}

// Progress Indicator component that displays progress
export function ProgressIndicator(props: ViewProps) {

  let spend_percent = props.spend_percent ? props.spend_percent : 0
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{props.header}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: Colors.tint }}>{props.completed}</Text>
          <Text style={Styles.textGrey}>{' | ' + props.total}</Text>
        </View>

      </View>
      {/* Indicator is updated based on the % spent and using the screen width to render */}
      <View style={{ marginTop: 10, flexDirection: 'row' }}>
        <View style={{
          maxWidth: viewportWidth - 40,
          width: (viewportWidth - 40) * spend_percent, borderTopLeftRadius: 20, borderBottomLeftRadius: 20,
          //Below options to make the spent indicator slanting as per design
          borderTopColor: Colors.tint, borderTopWidth: 20, borderRightWidth: 10, borderRightColor: (spend_percent) >= 1 ? Colors.tint : Colors.tintColorMild, borderTopRightRadius: (spend_percent) >= 1 ? 20 : 0, borderBottomRightRadius: (spend_percent) >= 1 ? 20 : 0
        }}>
        </View>

        <View style={{ width: (viewportWidth - 40) - ((viewportWidth - 40) * spend_percent), borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: Colors.tintColorMild, height: 20 }}>
        </View>
      </View>
    </View>
  )
}