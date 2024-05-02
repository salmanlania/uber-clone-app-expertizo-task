import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as  Location from 'expo-location';

export default function Destination({ route, navigation }) {
  const { pickupLocation } = route.params;
  const [location, setLocation] = useState(null)
  const [queryData, setQueryData] = useState([])

  useEffect(() => {
    (async () => {
      let location =
        await Location.getCurrentPositionAsync({});
      setLocation(location); 
     
    })();
  }, []);

  const getLocationsFromText = (text) => {
    const options = { method: 'GET',
     headers: { accept: 'application/json',
      Authorization: 'fsq3IIUFkHHlhow9igVpkNs/uRV91i/cc0THlDFlBjPpjhU=' }
     };
    const { latitude, longitude } = location.coords
    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}`,
      options)
      
      .then(response => response.json())
      .then(response => setQueryData(response.results))
      .catch(err => console.error(err));
    

  }
  if(!location){
    return <Text>...loading</Text>
  }
 
 
  return <View style={styles.container}>
    <Text>Pickup Location: {pickupLocation.name}</Text>
    <TextInput placeholder="Enter destination"
      onChangeText={getLocationsFromText}
    />

    <View>
    
      {queryData && queryData.map((item, index) => {

        return <TouchableOpacity onPress={() => setLocation({coords: {
            latitude: item.geocodes.main.latitude,
            longitude: item.geocodes.main.longitude,
            location: item
          }
        })}>

          <Text>{index + 1} {item.name} | {item.location.address}</Text>
        </TouchableOpacity>
      })}
    </View>

    <MapView
      region={{

        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005

      }}
      style={styles.map}>
      <Marker
        coordinate={{

          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
      />
    </MapView>
    <Button title='Select a Car' onPress={() => navigation.navigate('CarSelection', {
      pickupLocation,
      destinationLocation: location
    })} />
  </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  }
})
