// Author: Nandha
// Debit Card screen - Linked to the bottom tab
// This screen allows the user to manage their debit cards
// For the demo, the data is fetched from a mock api
// Implemented Functionalities:
// 1. Data is fetched from the mock api
// 2. UI has been built precisely as per the designs provided (Icons & Colors might slightly differ as assets were not provided)
// 3. Enabled device them adoption - Dark / Light. UI colors are updated automatically based on the device theme
// 4. Implemented Hide/Show card number - First 12 digits of the card number and CVV are hidden when user chooses to hide
// 5. Weekly spending limit:
//        Spend indicator is enabled only when limits are turned on
//        When limit is switched on, the user is redericted to the select limit screen
//        When limit is turned off, the use is not redirect. Instead, only the switch flips
// 6. Freexe Card:
//        When turned on, the card color changes to grey
// All other menu options are dummmy and are not implemented for this demo


import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { updateStore } from '../actions/stores';
import { CurrencyBadge, Header, MenuOption } from '../components/Custom';
import { Text, TouchableOpacity, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { _formatCurrency, _getUserInfo } from '../helper';
import { CustProps } from '../types';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export class DebitCard extends React.Component<CustProps> {

  state = {
    hide_card_details: false

  }

  async componentDidMount() {
    // Fetch user data from the api and update the Redux Store
    let profile_data = await _getUserInfo('user_auth_token_here')
    this.props.updateStore(profile_data)

  }
  render() {
    let profile_data = this.props.store.profile_data
    let { hide_card_details } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.secondary }}>

        {/* Header component that slides under the card and options */}
        <View style={[Styles.defaultView, { padding: 25, paddingTop: 40, width: viewportWidth, position: 'absolute' }]}>
          {/* Reusable header component - Back is not enabled as this is the first screen of the tab */}
          <Header title='Debit Card' />
          <Text style={[Styles.textLight, { marginTop: 20 }]}>Available Credit</Text>
          <View style={[Styles.defaultView, { flexDirection: 'row', marginTop: 20 }]}>
            {/* Reusable currency badge component */}
            <CurrencyBadge />
            {/* Formatted amount with comma seperation */}
            {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
            <Text style={[Styles.title, { marginLeft: 10 }]}>{_formatCurrency(profile_data.card_balance, '') + ' '}</Text>
          </View>

        </View>

        {/* Lower sliding part of the UI that slides above the header */}
        <ScrollView style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'transparent', paddingTop: 10 }} contentContainerStyle={{ alignItems: 'center' }} >

          {/* View that contains the details - Card and options to manage */}
          <View style={{
            width: viewportWidth, minHeight: viewportHeight * 0.6, marginTop: viewportHeight * 0.40, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center'
          }}>

            {/* Credit Card Component with hide or show option */}
            <View style={[Styles.defaultView, { position: 'absolute', marginTop: -((viewportWidth < viewportHeight ? viewportWidth : viewportHeight) / 2 - 40) / 1.586, maxWidth: 500 }]}>
              {/* Option to Hide or Show card details */}
              <View style={{ width: viewportWidth - 40, maxWidth: 500, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 9, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                  onPress={() => this.setState({ hide_card_details: !hide_card_details })}>
                  {/* Flip icon and message as per the card number visibility status */}
                  <FontAwesome5 name={hide_card_details ? 'eye' : 'eye-slash'} color={Colors.tint} size={18} />
                  <Text style={{ marginLeft: 5, color: Colors.tint }}>{(hide_card_details ? 'Show' : 'Hide') + ' card number'}</Text>
                </TouchableOpacity>
              </View>
              {/* Credit Card component - Maximum size is limited for better user experience on iPad or Tabelet */}
              <View style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, zIndex: 5, alignItems: 'center', width: viewportWidth - 40, maxWidth: 500 }}>
                <View style={{ borderRadius: 15, padding: 15, backgroundColor: profile_data.card_frozen ? 'grey' : Colors.tint, width: viewportWidth - 40, height: (viewportWidth - 40) / 1.586, maxWidth: 500, maxHeight: 500 / 1.586, justifyContent: 'space-around' }}>
                  <View style={[Styles.defaultView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    {/* Aspire Logo */}
                    <View style={[Styles.defaultView, { flexDirection: 'row', alignItems: 'center' }]}>
                      <Image source={require('../assets/images/icon.png')} style={{ width: 25, height: 25, tintColor: 'white' }} />
                      <Text style={[Styles.subHeading, { marginLeft: 5 }]}>aspire</Text>
                    </View>

                  </View>
                  {/* Name of the card holder */}
                  {/* Added a space to end as Oneplus does not render the last char or Word when bold is used */}
                  <Text style={[Styles.title, { marginTop: 10 }]}>
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
                  <View style={[Styles.defaultView, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[Styles.subHeading, { marginTop: 20 }]}>{'Thru: ' + profile_data.card_expiry}</Text>
                    <Text style={[Styles.subHeading, { marginLeft: 25, marginTop: 20 }]}>{'CVV: ' + (hide_card_details ? '***' : profile_data.card_cvv)}</Text>
                  </View>
                  {/* Visa Logo - Used an image to replicate the exact design */}
                  <View style={[Styles.defaultView, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    <Image source={require('../assets/images/visa-logo.png')} style={{ width: 70, height: 20, marginRight: 10 }} />
                  </View>
                </View>

              </View>
            </View>
            {/* Card management options */}
            <View style={{ paddingHorizontal: 20, paddingBottom: 20, alignSelf: 'stretch', backgroundColor: 'transparent', marginTop: (viewportWidth - 40) > 500 ? (250 / 1.586) : (viewportWidth - 100) / 1.586, }}>

              {/* Show indicator only if limits are enabled */}
              {profile_data.card_limit_active ?
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Debit card spending limit</Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: Colors.tint }}>{_formatCurrency(profile_data.card_spent)}</Text>
                      <Text style={Styles.textGrey}>{' | ' + _formatCurrency(profile_data.card_limit)}</Text>
                    </View>

                  </View>
                  {/* Indicator is updated based on the % spent and using the screen width to render */}
                  <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <View style={{
                      width: (viewportWidth - 40) * profile_data.card_spent / profile_data.card_limit, borderTopLeftRadius: 20, borderBottomLeftRadius: 20,
                      //Below options to make the spent indicator slanting as per design
                      borderTopColor: Colors.tint, borderTopWidth: 20, borderRightWidth: 10, borderRightColor: Colors.tintColorMild
                    }}>
                    </View>

                    <View style={{ width: (viewportWidth - 40) - ((viewportWidth - 40) * profile_data.card_spent / profile_data.card_limit), borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: Colors.tintColorMild, height: 20 }}>
                    </View>
                  </View>
                </View>
                : null}
              {/* Reusable component for the options - Switch is enabled only for Weekly Spend Limit and Freeze Card */}

              {/* Top-up account */}
              <MenuOption header={'Top-up account'} icon={'upload'} detail={'Deposit money to your account to use with card'} onSwitch={false} />

              {/* Weekly spending limit */}
              <MenuOption header={'Weekly spending limit'} icon={'tachometer-alt'} detail={profile_data.card_limit_active ? ('Your weekly spending limit is ' + _formatCurrency(profile_data.card_limit)) : 'Set your weekly spending limit'}
                onSwitch={(v: any) => {
                  profile_data.card_limit_active = v
                  this.props.updateStore(profile_data)
                  // redirect only when enabled. No needed when it is disabled
                  if (v) {
                    this.props.navigation.navigate('SetSpendingLimit');
                  }
                }
                }
                switchValue={profile_data.card_limit_active} />

              {/* Freeze card - Grey out card when frozen */}
              <MenuOption header={'Freeze card'} icon={'snowflake'} detail={profile_data.card_frozen ? 'Your debit card is frozen' : 'Your debit card is currently active'}
                onSwitch={(v: any) => {
                  profile_data.card_frozen = v
                  this.props.updateStore(profile_data)
                }
                }
                switchValue={profile_data.card_frozen} />

              {/* Get a new Card - Not implemented yet */}
              <MenuOption header={'Get a new card'} icon={'credit-card'} detail={'This deactivates your current debit card'} />

              {/* Deactivated cards - Not implemented yet */}
              <MenuOption header={'Deactivated cards'} icon={'ban'} detail={'Your previously deactivated cards'} onSwitch={false} />


            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}



const mapStateToProps = (state: { store: any; }) => {
  const { store } = state
  return { store }
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => (
  bindActionCreators({
    updateStore
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DebitCard);