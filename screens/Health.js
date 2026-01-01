import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-elements";
import { services } from "../services/services";
import moment from "moment";
import { ScrollView } from "react-native-virtualized-view";

const Health = () => {
  const [newsData, setNewsData] = useState([]);

  const getItemKey = (item, index) =>
    `${item.url ?? item.title ?? item.publishedAt ?? "item"}-${index}`;

  useEffect(() => {
    services("health")
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <ScrollView style={{ height: 850 }}>
      {newsData.length > 0 ? (
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <View>
              <View style={styles.newsContainer}>
                {item.urlToImage ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: item.urlToImage }}
                  />
                ) : null}

                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.date}>
                  {moment(item.publishedAt).format("LLL")}
                </Text>

                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>

              <Divider style={styles.divider} />
            </View>
          )}
          keyExtractor={getItemKey}
        />
      ) : (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  newsContainer: {
    padding: 10,
  },
  image: {
    width: 550,
    height: 250,
    alignSelf: "center",
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
  divider: {
    marginVertical: 8,
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  spinner: {
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});

export default Health;
