import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Categories from '../../../Components/Categories';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../../Components/SearchBar';
import TutorialCard from '../../../Components/TutorialCard';


const Reuse = () => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  const categories = [
    {name: 'Container', image: require('../../../Assets/TabIcons/cargo.png')},
    {name: 'Furniture', image: require('../../../Assets/TabIcons/furniture.png')},
    {name: 'Paper', image: require('../../../Assets/new/paper.png')},
    {name: 'Clothing', image: require('../../../Assets/TabIcons/brand.png')},
    {name: 'Electronics', image: require('../../../Assets/new/electronic.png')},
    {name: 'Garden', image: require('../../../Assets/TabIcons/flowers.png')},
  ];


  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <Text style={styles.sectionTitle}>Categories:</Text>

      <Categories
        categories={categories}
        onSelect={name => console.log('Selected:', name)}
      />

      <Text style={styles.sectionTitle}>Trending Projects:</Text>

      
     <ScrollView style={{marginTop:15}}>
        <TutorialCard
          title="Cardboard Organizer"
          description="Turn Shoe boxes into desk organizers"
          difficulty="Easy"
          youtubeUrl="https://www.youtube.com/shorts/Oy7vKhuj6aA"
          image={require("../../../Assets/new/box.png")}
        />
        <TutorialCard
          title="Tin can Planter"
          description="Turn old tin cans into planters"
          difficulty="Easy"
          youtubeUrl="https://www.youtube.com/shorts/MWiXR8vblu4"
          image={require("../../../Assets/new/canned.png")}
        />
        <TutorialCard
          title="Plastic Bottle Bird Feeder"
          description="Recycle plastic bottles into bird feeders"
          difficulty="Medium"
          youtubeUrl="https://www.youtube.com/shorts/31TqbI7hex8"
          image={require("../../../Assets/new/water.png")}
        />
      </ScrollView>

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
  sectionTitle: {fontWeight: 'bold', fontSize: 24, marginTop: 20, color:'black'},
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

export default Reuse;
