/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      className="flex-row items-center justify-around bg-[#e1e2e4] h-[75px] shadow-3xl"
      style={{
        width,
        borderTopWidth: 2,
        borderTopColor: '#306902',
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const isMiddle = route.name === 'Search';

        const iconSource = isMiddle
          ? require('../Assets/TabIcons/Group.png')
          : isFocused
          ? getFocusedIcon(route.name)
          : getUnfocusedIcon(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className={
              isMiddle ? 'items-center ' : 'items-center justify-center'
            }>
            <View
              className={
                isMiddle
                  ? 'w-[70px] h-[70px] rounded-full bg-green-600 items-center justify-center shadow-md p-3'
                  : ''
              }>
              <Image
                source={iconSource}
                style={{
                  width: isMiddle ? 28 : 22,
                  height: isMiddle ? 28 : 28,
                  tintColor: isMiddle ? '#fff' : isFocused ? '#10790F' : '#666',
                  resizeMode: 'contain',
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getFocusedIcon = routeName => {
  switch (routeName) {
    case 'Home':
      return require('../Assets/TabIcons/Home.png');
    case 'Location':
      return require('../Assets/new/loc.png');
    case 'Scanner':
      return require('../Assets/new/scan.png');
    case 'filter':
      return require('../Assets/new/chk.png');
    case 'Profile':
      return require('../Assets/new/profile.png');
    default:
      return require('../Assets/new/chk.png');
  }
};

const getUnfocusedIcon = routeName => {
  switch (routeName) {
    case 'Home':
      return require('../Assets/TabIcons/Home.png');
    case 'Location':
      return require('../Assets/new/loc.png');
    case 'Scanner':
      return require('../Assets/new/scan.png');
    case 'filter':
      return require('../Assets/new/chk.png');
    case 'Profile':
      return require('../Assets/new/profile.png');
    default:
      return require('../Assets/new/chk.png');
  }
};

export default CustomTabBar;
