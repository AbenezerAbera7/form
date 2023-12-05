import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { contactCardStyles } from "../styles/contactcard";

const ContactCard = (props: { contact: any }) => {
  return (
    <TouchableOpacity key={props.contact.id}>
      <View style={contactCardStyles.container}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={contactCardStyles.icon}>
            {props.contact.url ? (
              <Image
                source={{ uri: props.contact.url }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            ) : (
              <Ionicons name="person-outline" size={25} color="gray" />
            )}
          </View>

          <View>
            <Text style={contactCardStyles.companyName}>
              {props.contact.company}
            </Text>
            <Text style={contactCardStyles.name}>{props.contact.name}</Text>
          </View>
        </View>

        <View>
          <Ionicons name="call" size={25} color="#90afce" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
