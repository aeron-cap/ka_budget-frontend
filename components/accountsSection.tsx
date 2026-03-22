import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddAccountModal from "@/components/addAccountModal";

export default function AccountsSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveAccount = (accountData: { name: string; type: string; initialBalance: string }) => {
    console.log("Saving new account:", accountData);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>My Accounts</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.accountCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.iconBox}>
              <Ionicons name="wallet-outline" size={20} color="white" />
            </View>
            <Text style={styles.accountNumber}>**** 1234</Text>
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.accountLabel}>Checking Account</Text>
            <Text style={styles.accountBalance}>$12,400.00</Text>
          </View>
        </View>

        <View style={styles.accountCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.iconBox}>
              <Ionicons name="wallet-outline" size={20} color="white" />
            </View>
            <Text style={styles.accountNumber}>**** 5678</Text>
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.accountLabel}>Savings Account</Text>
            <Text style={styles.accountBalance}>$10,500.00</Text>
          </View>
        </View>
      </ScrollView>

      <AddAccountModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  accountCard: {
    backgroundColor: '#17202A',
    width: 160,
    height: 160,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountNumber: {
    color: '#94A3B8',
    fontSize: 13,
  },
  cardBottom: {},
  accountLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
  },
  accountBalance: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});