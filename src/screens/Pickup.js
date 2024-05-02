import React from 'react';
import { useState, useEffect } from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, View,Platform, TextInput,Text, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';

export default function Pickup({navigation}){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [queryData, setQueryData] = useState([])

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          
        Location.watchPositionAsync({
            accuracy:6,
            distanceInterwal:0.5,
            timeInterwal:100
        },(location)=>{
            setLocation(location)
        })
        })();
      }, []);
    
      const getLocationsFromText = async (text) => {
        //fsq3IIUFkHHlhow9igVpkNs/uRV91i/ccOTHlDFlBjPpjhU=
        try {
          const { latitude, longitude } = location.coords
          const searchParams = new URLSearchParams({
            query: text,
            ll: `${latitude},${longitude}`,
            sort: 'DISTANCE'
          });
          const results = await fetch(
            `https://api.foursquare.com/v3/places/search?${searchParams}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: 'fsq3IIUFkHHlhow9igVpkNs/uRV91i/ccOTHlDFlBjPpjhU=',
              }
            }
          );
          const data = await results.json();
          setQueryData(data.results)
          return data;
        } catch (err) {
          console.error(err);
        }
      }
    
      if (errorMsg) {
        return <Text>{errorMsg}</Text>
      }
    
      if (!location) {
        return <Text>Location not found</Text>
      }
      
      

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }

    return (
        <View style={styles.container}>
   <TextInput
      placeholder='Enter any location...'
      onChangeText={getLocationsFromText}
    />

<MapView
style={styles.map}
      region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title={'My location'}
        description={"I'm standing here"}
        image={{ uri: 'https://static.thenounproject.com/png/191851-200.png' }}
      />
</MapView>
<View style={styles.absolute}>
      {queryData.map((item, index) => {
        return <TouchableOpacity onPress={() => navigation.navigate('Destination',{
            pickupLocation:item  })}>
              
         <Text>{index + 1} {item.name}</Text>
         </TouchableOpacity>
      })}
    
    </View>
        </View>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     justifyContent:'space-around',
     alignItems:'center'
    },
    map: {
      width: '100%',
      height: '80%',
    },
    absolute: {
        position: 'absolute',
        width: 200,
        top: 60,
        backgroundColor: 'white'
    }
  });