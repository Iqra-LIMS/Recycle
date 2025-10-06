import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Categories from '../../../Components/Categories';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../../Components/SearchBar';

const Recycle = () => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  const categories = [
    {name: 'Metal', image: require('../../../Assets/new/metal.png')},
    {name: 'Plastic', image: require('../../../Assets/new/plastic.png')},
    {name: 'Paper', image: require('../../../Assets/new/paper.png')},
    {name: 'Glass', image: require('../../../Assets/new/glasses.png')},
    {name: 'Electronic', image: require('../../../Assets/new/electronic.png')},
    {name: 'Organic', image: require('../../../Assets/new/stink.png')},
  ];
  const action = [
    {
      name: 'Quick Actions',
      image: require('../../../Assets/TabIcons/review.png'),
    },
    {
      name: 'Nearest Centers',
      image: require('../../../Assets/TabIcons/location.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <Text style={styles.sectionTitle}>Categories:</Text>

      <Categories
        categories={categories}
        onSelect={name => {
          console.log('Selected:', name);
          navigation.navigate('RecycleGuide', {selectedName: name});
        }}
      />

      <Text style={styles.sectionTitle}>Quick Actions:</Text>

      <Categories
        categories={action}
        onSelect={name => console.log('Selected:', name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: 16},
  searchBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
    color: 'black',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 140, // optional fixed width
    elevation: 2, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  actionIcon: {
    width: 30,
    height: 30,
    tintColor: '#000000ff',
    marginBottom: 8,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default Recycle;
