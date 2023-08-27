import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TransactionHistoryScreen = () => {
  const transactions = [
    { id: '1', date: '2023-08-01', subscription: 'Subscription 1' },
    { id: '2', date: '2023-08-15', subscription: 'Subscription 2' },
    // Add more transactions here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.subscription}>{item.subscription}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subscription: {},
});

export default TransactionHistoryScreen;
