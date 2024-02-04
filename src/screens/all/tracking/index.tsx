import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
// import SocketService from '../../../utils/helpers/SocketService';
import SocketIOClient from 'socket.io-client';
import {
  SOCKET_ACTIONS,
  SocketService,
} from '../../../utils/helpers/SocketService';
import {Icons} from '../../../themes/Icons';
import {ProviderDetails} from './provider_details';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '50%',
  },
  provider_details: {
    width: '100%',
    height: '50%',
  },
});

type LatLng = {
  latitude: number;
  longitude: number;
};

export const Tracking = () => {
  const mapRef = useRef<any>(null);
  const routes = useRef<any[]>([]);
  const [directions, setDirections] = useState<any[]>([]);
  const [originLocation, setOriginLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 17.3676, longitude: 78.5246});
  const [destinationLocation, setDestinationLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 17.4374, longitude: 78.4487});

  const destinationStartPos = useRef<{
    latitude: number;
    longitude: number;
  }>({latitude: 17.3676, longitude: 78.5246});
  const destinationEndPos = useRef<{
    latitude: number;
    longitude: number;
  }>({latitude: 17.3676, longitude: 78.5246});

  useEffect(() => {
    const fitToCoordinates = (
      origin: {latitude: number; longitude: number},
      destination: {latitude: number; longitude: number},
    ) => {
      const allCoordinates = [...[origin], ...[destination]];

      mapRef.current.fitToCoordinates(allCoordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    };

    const decodePolyline = (encoded: any) => {
      const points = [];
      let index = 0,
        lat = 0,
        lng = 0;

      while (index < encoded.length) {
        let b,
          shift = 0,
          result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);

        const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);

        const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({latitude: lat / 1e5, longitude: lng / 1e5});
      }
      return points;
    };

    const handleDirections = (
      origin: {latitude: number; longitude: number},
      destination: {latitude: number; longitude: number},
    ) => {
      fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${`${originLocation.latitude},${originLocation.longitude}`}&destination=${`${destinationLocation.latitude},${destinationLocation.longitude}`}&key=AIzaSyD4huhdEHw0e8GWjZUsw3fjP9GrMDEyEbg`,
      )
        .then(response => response.json())
        .then(data => {
          console.log('Routes Data -- ', data);
          if (data.routes.length > 0) {
            const route = data.routes[0].overview_polyline.points;
            const decodedRoute = decodePolyline(route);
            console.log('Decode Polyline -- ', decodedRoute);
            routes.current = decodedRoute;
            setDirections(decodedRoute);
            fitToCoordinates(originLocation, destinationLocation);
          } else {
            console.log('No Routes Found -- ', origin, destination);
          }
        })
        .catch(error => {
          console.error('Error fetching directions:', error);
        });
    };

    handleDirections(originLocation, destinationLocation);

    // const updateDirections = () => {
    //   console.log('Routes Copy Length -- ', routes.current.length);
    //   setDirections(routes.current);
    //   fitToCoordinates(
    //     routes.current[0],
    //     routes.current[routes.current.length - 1],
    //   );
    //   setOriginLocation(routes.current[0]);
    //   setDestinationLocation(routes.current[routes.current.length - 1]);
    // };

    // const timeout = setTimeout(() => {
    //   clearTimeout(timeout);
    //   const interval = setInterval(() => {
    //     routes.current = [...routes.current].slice(5);
    //     if (routes.current.length <= 0) {
    //       clearInterval(interval);
    //       return;
    //     }
    //     updateDirections();
    //   }, 2000);
    // }, 2000);
  }, []);

  useEffect(() => {
    const socketSetvice = SocketService.getInstance();

    const trackSocketActions = (socketAction: SOCKET_ACTIONS, data: any) => {
      const action = {
        [SOCKET_ACTIONS.CONNNECTED]: () => {},
        [SOCKET_ACTIONS.DISCONNECTED]: () => {},
        [SOCKET_ACTIONS.RECONNECTED]: () => {},
        [SOCKET_ACTIONS.RECONNECTATTEMPT]: () => {},
        [SOCKET_ACTIONS.ERROR]: () => {},
        [SOCKET_ACTIONS.AUTORESPONSE]: () => {
          console.log('Received Socket Auto Response -- ', data);
        },
        default: () => {
          //
        },
      };

      action[socketAction] ? action[socketAction]() : action['default']();
    };

    socketSetvice.connect(trackSocketActions);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={{
              latitude: originLocation.latitude,
              longitude: originLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker.Animated
              coordinate={{
                latitude: originLocation.latitude,
                longitude: originLocation.longitude,
              }}
              title="Origin"
            />
            <Marker.Animated
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
              title="Destination"
              image={Icons.user_location}
              style={{bottom: '20%'}}
            />
            {/* <Marker.Animated
              coordinate={interpolatedPosition}
              title="Destination"
            /> */}
            {directions && (
              <Polyline
                coordinates={directions}
                strokeWidth={3}
                strokeColor="#5E17EB" // Choose your desired color
              />
            )}
          </MapView>
        </View>
        <View style={styles.provider_details}>
          <ProviderDetails />
        </View>
      </SafeAreaView>
    </View>
  );
};
