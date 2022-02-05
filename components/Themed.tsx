// Nandha - Added additional themed components
// This helps to style the components as per the device theme - Dark/Light

import { Text as DefaultText, View as DefaultView, TouchableOpacity as DefaultTouchableOpacity, TextInput as DefaultTextInput, KeyboardTypeOptions } from 'react-native';
import { Ionicons as DefaultIonicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// Nandha - Created custom properties that are used by our components
type CustomProps = {
  header?: string;
  title?: string;
  onSwitch?: any;
  icon?: string;
  switchValue?: boolean;
  goBack?: any;
  onPress?: any;
  value?: string | number;
  text?: string;
  onChangeText?: any;
  placeholder?: string;
  detail?: string;
  keyboard?: KeyboardTypeOptions | undefined;
  name?: any;
  size?: number;
};

type CustomTextProps = {
  placeholder?: string;
  keyboard?: KeyboardTypeOptions | undefined;
  value?: string | undefined;
  onChangeText?: any;
}

export type TextProps = CustomTextProps & ThemeProps & DefaultText['props'];
export type ViewProps = CustomProps & ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}


// Nandha - Auto selects color based on the device theme
export function Ionicons(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ dark: darkColor, light: lightColor }, 'icon');
  return <DefaultIonicons color={color} style={[style]} {...otherProps} />;
}

// Nandha - Auto selects color based on the device theme
export function TouchableOpacity(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}


// Nandha - Auto selects color based on the device theme and style the Input Text as per our theme
export function TextInput(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput keyboardType={props.keyboard} style={[{ color, fontSize: 20, fontWeight: 'bold' }, style]} {...otherProps} />

}