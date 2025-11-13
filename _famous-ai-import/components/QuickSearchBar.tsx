import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function QuickSearchBar({ onSearch, placeholder = 'Search procedures...' }: Props) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {query.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchText}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  clearBtn: {
    padding: 8,
  },
  clearText: {
    fontSize: 18,
    color: '#999',
  },
  searchBtn: {
    padding: 8,
  },
  searchText: {
    fontSize: 20,
  },
});
