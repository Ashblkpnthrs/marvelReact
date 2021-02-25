import React, { useState, useEffect } from "react";
import { View, ImageBackground, Image, ActivityIndicator, Text, ScrollView } from "react-native";
import char from "./3dman.json";
import api from "../services/api.js";
import moment from "moment";

const Detail = ({ navigation }) => {

  const [character, setCharacter] = useState(char);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = navigation.getParam("id");

    async function loadCharacter() {
      const response = await api.get(`/v1/public/comics/${id}`);
      const [char] = response.data.data.results;
      setCharacter(char);
      setLoading(false);
    }

    loadCharacter();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="red" />
      </View>
    );
  }

  const creator = character.creators.items;
  const date = character.dates;
  const releaseDate = moment(date[0].date).format('DD-MMMM-yyyy');

  return (

      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/comics_bg.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <ScrollView>
          <View>
              <Image
                source={{ uri: `${character.thumbnail.path}.${character.thumbnail.extension}` }}
                resizeMode="contain"
                style={{ height:400}}
              >
              </Image>
            <View
              opacity={0.7}
              style={{
                backgroundColor: "#fff",
                marginTop:15,
                marginBottom: 5,
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                paddingHorizontal: 30,
                borderRadius: 20
              }}
            >
              <Text style={{ paddingLeft: 10, paddingRight: 10, fontSize: 15, fontWeight: "bold" }}>
                {character.title}
              </Text>
            </View>
                <View
                  opacity={0.7}
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 30,
                    paddingHorizontal: 20,
                    borderRadius: 20
                  }}
                >
                  <Text style={{
                    height: 15,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "#000000"
                  }}>
                    Date: {releaseDate} Diamond Code: {character.diamondCode}
                  </Text>
                </View>
            <View
              opacity={0.7}
              style={{ alignItems: "center", marginTop: 5 }}>
                {creator.map((item, key) => (
                    <View
                      style={{
                        backgroundColor: "#fff",
                        marginBottom: 5,
                        marginLeft: 10,
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 30,
                        paddingHorizontal: 20,
                        borderRadius: 20
                      }}
                    >
                      <Text style={{
                        height: 15,
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#000000"
                      }}>
                        {item.name} / {item.role}
                      </Text>
                    </View>
                  )
                )}
            </View>
          </View>
          </ScrollView>
        </ImageBackground>
      </View>
  );
};

export default Detail;
