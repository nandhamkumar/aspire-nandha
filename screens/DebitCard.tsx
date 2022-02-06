// Author: Nandha
// Debit Card screen - Linked to the bottom tab
// This screen allows the user to manage their debit cards
// For the demo, the data is fetched from a mock api
// Implemented Functionalities:
// 1. Data is fetched from the mock api
// 2. UI has been built precisely as per the designs provided (Icons & Colors might slightly differ as assets were not provided)
// 3. Enabled device theme adoption - Dark / Light. UI colors are updated automatically based on the device theme
// 4. Implemented Hide/Show card number - First 12 digits of the card number and CVV are hidden when user chooses to hide
// 5. Weekly spending limit:
//        Spend indicator is enabled only when limits are turned on
//        When limit is switched on, the user is redericted to the select limit screen
//        When limit is turned off, the use is not redirect. Instead, only the switch flips
// 6. Freeze Card:
//        When turned on, the card color changes to grey
//        Seti Limit switch is disabled when card is frozen
// All other menu options are dummmy and are not implemented for this demo


import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { updateStore } from '../actions/stores';
import { CurrencyBadge, Header, MenuOption, Card, ProgressIndicator } from '../components/Custom';
import { Text, TouchableOpacity, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { CARD_RATIO, MAX_CARD_WIDTH } from '../constants';
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
    let spend_percent = profile_data.card_spent && profile_data.card_limit ? (profile_data.card_spent / profile_data.card_limit) : 0

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
          {/* Debit Card Component with hide or show option */}
          <View style={[Styles.defaultView, { zIndex: 10, position: 'absolute', maxWidth: MAX_CARD_WIDTH, top: 220 }]}>
            {/* Option to Hide or Show card details */}
            <View style={{ width: viewportWidth - 40, maxWidth: MAX_CARD_WIDTH, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 9, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                onPress={() => this.setState({ hide_card_details: !hide_card_details })}>
                {/* Flip icon and message as per the card number visibility status */}
                <FontAwesome5 name={hide_card_details ? 'eye' : 'eye-slash'} color={Colors.tint} size={18} />
                <Text style={{ marginLeft: 5, color: Colors.tint }}>{(hide_card_details ? 'Show' : 'Hide') + ' card number'}</Text>
              </TouchableOpacity>
            </View>
            {/* Debit Card component - Maximum size is limited for better user experience on iPad or Tabelet */}
            <Card profile_data={profile_data} hide_card_details={hide_card_details}/>
          </View>
          {/* View that contains the details - Card and options to manage */}
          <View style={{
            width: viewportWidth, minHeight: viewportHeight * 0.7, marginTop: 325, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center'
          }}>


            {/* Card management options */}
            <View style={{ paddingHorizontal: 20, paddingBottom: 20, alignSelf: 'stretch', backgroundColor: 'transparent', marginTop: (((viewportWidth > MAX_CARD_WIDTH ? MAX_CARD_WIDTH : viewportWidth) - 85) / CARD_RATIO) }}>

              {/* Show indicator only if limits are enabled */}
              {profile_data.card_limit_active ?
                <ProgressIndicator spend_percent={spend_percent} completed={_formatCurrency(profile_data.card_spent)}  total={_formatCurrency(profile_data.card_limit)} header={'Debit card spending limit'}/>
                : null}
              {/* Reusable component for the options - Switch is enabled only for Weekly Spend Limit and Freeze Card */}

              {/* Top-up account */}
              <MenuOption header={'Top-up account'} icon={'upload'} detail={'Deposit money to your account to use with card'} onSwitch={false} />

              {/* Weekly spending limit */}
              <MenuOption header={'Weekly spending limit'} icon={'tachometer-alt'} detail={profile_data.card_limit_active ? ('Your weekly spending limit is ' + _formatCurrency(profile_data.card_limit)) : 'Set your weekly spending limit'}
                onSwitch={profile_data.card_frozen ? null : (v: any) => {
                  profile_data.card_limit_active = v
                  this.props.updateStore(profile_data)
                  // redirect only when enabled. No needed when it is disabled
                  if (v) {
                    this.props.navigation.navigate('SetSpendingLimit');
                  }
                }
                }
                switchValue={profile_data.card_limit_active}
                switchTestId={'DebitCard.WSL.Sw'} />

              {/* Freeze card - Grey out card when frozen */}
              <MenuOption header={'Freeze card'} icon={'snowflake'} detail={profile_data.card_frozen ? 'Your debit card is frozen' : 'Your debit card is currently active'}
                onSwitch={(v: any) => {
                  profile_data.card_frozen = v
                  if (v) {
                    profile_data.card_limit_active = false
                  }
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