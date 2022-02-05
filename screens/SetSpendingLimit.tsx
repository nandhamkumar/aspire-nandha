// Author: Nandha
// Set Spending Limit screen - navigated from the Debit Cards screen
// This screen allows the user to enter a value for the limit
// Data is retrieved from the redux store and is update back to the same
// Implemented Functionalities:
// 1. Data is fetched from Redux
// 2. UI has been built precisely as per the designs provided (Icons & Colors might slightly differ as assets were not provided)import React from 'react';
// 3. Back button will take the user to the Debit Card screen
// 4. Save button will save the amount and send the user back to the Debit Cards screen
// 5. Added validations for amount
// 6. The amount input field is a number keyboard field and is formatted with commas
// 7. Auto suggeted amounts, save button and the input text are all reusable components
// 8. The suggested amounts can be udpated based on the API response in future as needed
// 9. Enabled Keyboard avoiding save button to reduce additiona touches for the user
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { updateStore } from '../actions/stores';
import { AmountButton, AmountInput, Button, Header } from '../components/Custom';
import { Ionicons, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { _formatCurrency } from '../helper';
import { CustProps } from '../types';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export class SetSpendingLimit extends React.Component<CustProps> {

  state = {
    card_limit: '',
    //Added suggestion in state so that we can display the response from API later based on the user history
    suggestedAmounts: [5000, 10000, 20000],
    error: null
  }

  componentDidMount() {
    let { card_limit } = this.props.store.profile_data
    this.setState({ card_limit })
  }

  render() {
    let { card_limit, suggestedAmounts, error } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
        <View style={[Styles.defaultView, { padding: 25, paddingTop: 40, width: viewportWidth }]}>
          {/* Reusable header component leveraged and back is enabled */}
          <Header title='Spending Limit' goBack={() => this.props.navigation.goBack()} />

        </View>

        {/* Details section */}
        {/* Keyboard avoiding to get the Save button move aboove keyboard. Reduces one additional tap for the user*/}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, alignSelf: 'stretch', backgroundColor: 'transparent', paddingTop: 10 }} >


          <View style={{
            flex: 1, width: viewportWidth, marginTop: 25, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center'
          }}>


            {/* Justify - space between : Save button is always in the bottom */}
            <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20, alignSelf: 'stretch', marginTop: 30, justifyContent: 'space-between' }}>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='speedometer-outline' size={20} />
                  <Text style={{ marginLeft: 10 }}>Set a weekly debit card spending limit</Text>
                </View>

                {/* Reusable Amount Input field that includes the currency badge & the value is comma formatted */}
                <AmountInput
                  value={_formatCurrency(parseFloat(card_limit), '')}
                  placeholder="Spending limit"
                  keyboard="numeric"
                  onChangeText={(text: string) => { this.setState({ card_limit: text.replace(/,/g, '') }) }}
                />
                {/* Show validation error message if any */}
                {error ?
                  <Text style={Styles.textError}>{error}</Text> :
                  null}

                <Text style={{ color: Colors.silver, marginTop: 10 }} >Here weekly means the last 7 days - not the calendar week</Text>
                <View style={[Styles.defaultView, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, maxWidth: 500 }]}>
                  {suggestedAmounts.map((item, key) => {
                    return (
                      <AmountButton key={key} value={item} onPress={(v: string) => this.setLimit(v)} />
                    )
                  })
                  }
                </View>
              </View>

              <Button text={'Save'} onPress={() => this.save()} />

            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // Updates the amount input field when the users select the suggested amount
  setLimit(amount: string) {
    this.setState({ card_limit: amount })
  }

  // Saved the amount entered to the Redux Store and go back to Debit Card page.
  // Should be updated to also call the api to update the data to the backend
  save() {
    let { card_limit } = this.state
    if (card_limit && card_limit > 0) {
      let profile_data = this.props.store.profile_data
      profile_data.card_limit = this.state.card_limit
      this.props.updateStore(profile_data)

      // Go back to the previous page
      this.props.navigation.goBack();
    } else {
      // Show error message
      this.setState({ error: 'Enter a valid amount' })
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(SetSpendingLimit);