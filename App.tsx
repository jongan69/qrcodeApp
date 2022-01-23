import React, { PureComponent, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration, Linking, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFillObject} type={type} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ></Camera>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      
      <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    alignItems: 'center',
  },
});
