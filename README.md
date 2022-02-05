![alt text](https://github.com/nandhamkumar/aspire-nandha/blob/master/assets/images/icon.png?raw=true)

# Aspire - Nandha Assignment
  
  As a part of the interview assignemnt, have implemented Debit Card Screen and Set weekly spending limit screen.
  This project has been built with React Native - Expo Framework. Has been carefully developed to 
  
  1. Run on all 3 platforms (IOS / Android /Web) 
  2. Work with any device size.
  3. Adapt to the device theme Dark/Light
  4. Reuse components & styles as much as possible
  
  Used Redux & Typescript as per the requirement

  ## Debit Card Screen
  Implemented the desgin provided with the below functionalities:
  1. Hiding and showing card details - First 12 digits of the card number and all 3 digits of CVV will be maked when the user selects hide  
  2. Freeze / Unfreeeze card - The card color changes to grey when frozen
  4. Set weekly spending limit - When enabled, the user will be navigated to Set weekly spending limit screen. Will not be navigated when disabling
  5. Spend indicator will be visible only if weekly spending limit is enabled
  6. The slanting progress on the spend indicator as per the design (Without using external packages or images)

  ## Set weekly spending limit screen
  Implemented the desgin provided with the below functionalities:
  1. Input Text is formatted to display amount with thousands seperator
  2. Back button enabled to go back to previous screen
  3. Valdiation to ensure the amount is entered and is > $0 and display an error message if not
  4. Update the redux store with the amount so that it reflects on the previous screen aswell
  5. Go back to previous screen when the limit is saved successfully
  6. As per the design provided, the screen is displayed outside the tabs and hence the tab will not be visible when this is open
 
  ## Screenshots of the assignment on different devices & themes
  
  ![alt text](https://github.com/nandhamkumar/aspire-nandha/blob/master/screenshots/1.png?raw=true)

  ![alt text](https://github.com/nandhamkumar/aspire-nandha/blob/master/screenshots/2.png?raw=true)

  ![alt text](https://github.com/nandhamkumar/aspire-nandha/blob/master/screenshots/3.png?raw=true)
