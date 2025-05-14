import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { dimensions, dimensionsCalculation } from '../config/styleUtils';

export function SpectrumLogo() {

  const imageWidth = dimensions.WIDTH * 0.22;
  const imageHeight = imageWidth; 

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={styles.poweredByText}>Powered by</Text>
      <Image
        source={require('../assets/spectrum-logo.png')}
        style={[styles.logo, { width: imageWidth, height: imageHeight }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: dimensionsCalculation(16),
  },
  poweredByText: {
    color: '#797B89',
    marginRight: dimensionsCalculation(8),
  },
  logo: {
    resizeMode: 'contain',
  },
});
