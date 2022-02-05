import Colors from '../constants/Colors';
import { Text, TextProps } from './Themed';

export function Header(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

// Nandha - this component displays currency as a badge and is styled per our theme 
export function CurrencyBadge(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', backgroundColor: Colors.light.tint, padding: 10, paddingHorizontal: 20, borderRadius: 10, color: 'white' }]} >
    S$
  </Text>;
}
