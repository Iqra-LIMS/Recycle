import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {
  recycleDataMap,
  nonRecycleDataMap,
} from '../../../Assets/constant/RecycleData'; // 👈 import constants

const RecycleScreen = ({route}) => {
  const [selectedTab, setSelectedTab] = useState('Recycle');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {selectedName} = route.params;

  // Pick correct dataset
  const recycleData = recycleDataMap[selectedName] || [];
  const nonRecycleData = nonRecycleDataMap[selectedName] || [];

  const handleCardPress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{item.id}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
        <Image
          source={require('../../../Assets/new/move.png')}
          style={styles.moveIcon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedName} Recycling Guide</Text>

      {/* Toggle buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedTab === 'Recycle' && styles.activeRecycle,
          ]}
          onPress={() => setSelectedTab('Recycle')}>
          <Text style={styles.toggleText}>Recycle ✅</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedTab === 'NonRecycle' && styles.activeNonRecycle,
          ]}
          onPress={() => setSelectedTab('NonRecycle')}>
          <Text style={styles.toggleText}>Non-Recycle ❌</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={selectedTab === 'Recycle' ? recycleData : nonRecycleData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: 20}}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <View
                  style={[
                    styles.statusBox,
                    selectedTab === 'Recycle'
                      ? styles.activeRecycle
                      : styles.activeNonRecycle,
                  ]}>
                  <Text style={styles.statusText}>
                    {selectedTab === 'Recycle'
                      ? 'Recycle ✅'
                      : 'Non-Recycle ❌'}
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>What it is?</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>

                <Text style={styles.sectionTitle}>Disposal Data</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text
                    style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RecycleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  toggleButton: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeRecycle: {
    backgroundColor: '#A5D6A7',
  },
  activeNonRecycle: {
    backgroundColor: '#EF9A9A',
  },
  toggleText: {
    fontWeight: '600',
    color: '#222',
    fontSize: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  numberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  numberText: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 24,
    color: '#222',
  },
  cardDesc: {
    fontSize: 16,
    color: '#666',
  },
  moveIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  statusBox: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  sectionTitle: {
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
    fontSize: 16,
    color: 'black',
  },
  modalDesc: {
    fontSize: 14,
    color: '#0c0c0cff',
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2d8a43',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
