import { View, Text, Button } from 'react-native'

export default function Dashboard({ navigation }) {
  return <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
    <Text>Dashboard</Text>
    <Button title='Take a ride!' onPress={() => navigation.navigate('Pickup')} />
  </View>
}