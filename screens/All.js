import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  NativeBaseProvider,
  Divider,
  Image,
  Spinner,
} from "native-base";
import { services } from "../services/services";
import moment from "moment";
import { ScrollView } from "react-native-virtualized-view";

const All = () => {
  const [newsData, setNewsData] = useState([]);
  const getItemKey = (item, index) =>
    `${item.url ?? item.title ?? item.publishedAt ?? "item"}-${index}`;
  useEffect(() => {
    services("general")
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView height={850}>
        {newsData.length > 0 ? (
          <FlatList
            data={newsData}
            renderItem={({ item }) => (
              <View>
                <View style={styles.newsContainer}>
                  {item.urlToImage ? (
                    <Image
                      width={550}
                      height={250}
                      resizeMode={"cover"}
                      source={{
                        uri: item.urlToImage,
                      }}
                      alt="General Image"
                    />
                  ) : null}
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.date}>
                    {moment(item.publishedAt).format("LLL")}
                  </Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>
                <Divider my={2} bg="#e0e0e0" />
              </View>
            )}
            keyExtractor={getItemKey}
          />
        ) : (
          <View style={styles.spinner}>
            <Spinner color="danger.400" size={80} />
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

//Estilos
const styles = StyleSheet.create({
  newsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});

export default All;
