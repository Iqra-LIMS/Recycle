import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('Privacy');

  const renderContent = () => {
    switch (activeTab) {
      case 'Privacy':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.updated}>Last Updated: October 7,2025</Text>
            <Text style={styles.text}>
              This Privacy Policy describes how the 3Re (Reduce, Reuse, Recycle) Waste
              Management App ("we," "our," or "the App") collects, uses, and protects your
              information when you use our services.
            </Text>

            <Text style={styles.subtitle}>1. Information We Collect:</Text>
            <Text style={styles.text}>- Personal Information: nameand  email address.</Text>
            <Text style={styles.text}>- Waste Data: images/media uploaded for AI categorization.</Text>
            <Text style={styles.text}>- Location Data: to show nearest collection/recycling points.</Text>
            <Text style={styles.text}>- Usage Data: pickup requests, contribution history.</Text>

            <Text style={styles.subtitle}>2. How We Use Your Information:</Text>
            <Text style={styles.text}>- Categorize waste using AI/ML.</Text>
            <Text style={styles.text}>- Provide recycling, reuse, and reduction recommendations.</Text>
            <Text style={styles.text}>- Suggest nearby collection points.</Text>
            <Text style={styles.text}>- Schedule and manage pickups.</Text>
            <Text style={styles.text}>- Track contribution history and provide eco-friendly tips.</Text>
          </ScrollView>
        );

      case 'Terms':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.updated}>Last Updated: October 7,2025</Text>
            <Text style={styles.subtitle}>1. Use of the App:</Text>
            <Text style={styles.text}>Assist in waste identification, scheduling pickups, and eco-friendly recommendations.</Text>

            <Text style={styles.subtitle}>2. User Accounts:</Text>
            <Text style={styles.text}>Users must provide accurate information and keep credentials safe.</Text>

            <Text style={styles.subtitle}>3. Waste Identification & AI Assistance:</Text>
            <Text style={styles.text}>AI is advisory only. Users must verify results.</Text>

            <Text style={styles.subtitle}>4. Location & Maps:</Text>
            <Text style={styles.text}>Requires location access. Accuracy not guaranteed.</Text>

            <Text style={styles.subtitle}>5. Pickup Scheduling:</Text>
            <Text style={styles.text}>Subject to third-party availability.</Text>

            <Text style={styles.subtitle}>6. User Responsibilities:</Text>
            <Text style={styles.text}>No misuse, illegal uploads, or interference.</Text>
          </ScrollView>
        );

      case 'Disclaimer':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Disclaimer</Text>
            <Text style={styles.updated}>Last Updated: October 7,2025</Text>
            <Text style={styles.text}>
              The 3Re Waste Management App provides tools for waste identification, eco-tips, and pickup scheduling.
            </Text>

            <Text style={styles.subtitle}>1. AI Recommendations:</Text>
            <Text style={styles.text}>Advisory only. May not always be accurate. Users must verify results.</Text>

            <Text style={styles.subtitle}>2. Location Services:</Text>
            <Text style={styles.text}>Accuracy not guaranteed. Users should confirm details independently.</Text>

            <Text style={styles.subtitle}>3. Pickup Services:</Text>
            <Text style={styles.text}>Dependent on third-party providers. App not responsible for delays or failures.</Text>

            <Text style={styles.subtitle}>4. Data & Connectivity:</Text>
            <Text style={styles.text}>Requires internet. Not liable for service interruptions.</Text>

            <Text style={styles.subtitle}>5. Compliance:</Text>
            <Text style={styles.text}>Users must follow local waste management laws.</Text>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Privacy', 'Terms', 'Disclaimer'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    margin: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 12,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#374151',
  },
  updated: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 6,
  },
});

export default PrivacyPolicy;
