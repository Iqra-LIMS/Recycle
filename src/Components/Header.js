import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import splash from '../Assets/new/splash.png'; // 👈 make sure your image path is correct

const Header = ({ title, subtitle, onBackPress }) => {
  return (
    <ImageBackground
      source={splash}
      resizeMode="cover"
      style={styles.headerBackground}
      imageStyle={styles.headerImage}>
      <View style={styles.headerContent}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Image
              source={require('../Assets/new/arrow.png')}
              style={styles.backImage}
            />
          </TouchableOpacity>
        )}
        <View style={{marginLeft:20}}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    height: 150,
    width: '100%',
  },
  headerImage: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 30, // optional for status bar spacing
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 25,
    height: 25,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    color: '#e8f5e9',
    fontSize: 20,
  },
});

export default Header;
