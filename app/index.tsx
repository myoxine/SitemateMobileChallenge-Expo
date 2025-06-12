import Card from '@/components/card';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [search, setSearch] = useState(query);
  const [datas, setDatas] = useState<Array<any>>();

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=183daca270264bad86fc5b72972fb82a`)
        .then(function (response) {
          // handle success
          setDatas(response.data.articles)
        })
        .catch(function (error) {
          // handle error
          setError("failed to load content")
        })
        .finally(function () {
          setIsLoading(false)
        });
    }
  }, [query]);
  return <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      {isLoading ? <Text>Loading...</Text> : query ? (datas ?
        <View
          style={styles.container2}
        >

          <View style={styles.container2header}>
            <TextInput
              defaultValue={search}
              onChangeText={search => {
                setSearch(search);
              }}
              placeholderTextColor="#A0A0A0"
              placeholder="Search"
              style={styles.input}
            />
            <TouchableOpacity style={styles.customButton} onPress={() => {
              router.setParams({ query: search });
            }} >
              <Text style={styles.customButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flexGrow: 1, display: "flex", flexDirection:"column" }}>
            {datas.length > 0 ?
              datas.map((data, index) => <Card key={`card${index}`} title={data.title} content={data.description} />
              )
              :
              <Text>Not found result</Text>
            }
          </ScrollView>
        </View> : <Text>{query}</Text>) :
        <View
          style={{
            ...styles.container, flexDirection: "column", flex: 1,
          }}
        >
          {error && <View>
            <Text>Errorsss</Text>
          </View>
          }

          <View
            style={styles.container}
          >

            <TextInput
              defaultValue={search}
              onChangeText={search => {
                setSearch(search);
              }}
              placeholderTextColor="#A0A0A0"
              placeholder="Search"
              style={styles.input}
            />
            <TouchableOpacity style={styles.customButton} onPress={() => {
              router.setParams({ query: search });
            }} ><Text style={styles.customButtonText}>Search</Text></TouchableOpacity>
          </View></View>}</SafeAreaView>
  </SafeAreaProvider>



}
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  container2header: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    padding: 16,
    fontSize: 24,
  },
  customButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 24
  },
});