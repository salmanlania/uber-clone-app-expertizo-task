import 'react-native-gesture-handler';
import styles from './style'
import Navigation from './src/config/Navigation'
import { View ,Text} from 'react-native'


export default function App() {
  return (
    <View style={styles.container}>
    <Navigation />
  </View>
  );
}



