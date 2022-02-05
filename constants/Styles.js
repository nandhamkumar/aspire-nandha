// Nandha - Created a master Styles sheet that is used by every screen 
import {
  StyleSheet
} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  defaultView: {
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  subHeading: {
    fontSize: 18,
    color: 'white'
  },
  textLight: {
    color: 'white'
  },
  textGrey: {
    color: 'grey'
  },
  textError: {
    color: 'red',
    marginTop: 10
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
})