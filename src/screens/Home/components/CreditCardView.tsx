import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { creditCardViewStyles } from "../styles/creditCardViewStyles";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../../context/UserContext";
import DailyPerformanceCard from "./DailyPerformanceCard";
import { getBusinessDetails } from "../../../api-endpoints/user-endpoint";

const CreditCardView = () => {
  const { user, businessDetails, setBusinessDetails } = useContext(UserContext);
  const firstName = user.FirstName ? user.FirstName : "";
  const lastName = user.LastName ? user.LastName : "";
  const [hideBalance, setHideBalance] = useState(true);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const changeBalanceVisibility = () => {
    setHideBalance(!hideBalance);
  };
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!user.uid) return;
      await getBusinessDetails(user.uid).then((res) => {
        if (res) {
          setBusinessDetails(res);
        }
      });
    };
    fetchBusinessDetails();
  }, []);
  return (
    <View style={creditCardViewStyles.background}>
      <DailyPerformanceCard />
      <View style={{ flexDirection: "row" }}>
        <View style={creditCardViewStyles.imageContainer}>
          {isImageSelected ? (
            <Image
              style={creditCardViewStyles.image}
              source={require("../../../api/DevData/pictures/Elon.png")}
            />
          ) : (
            <Image
              style={creditCardViewStyles.image}
              source={require("../../../api/DevData/pictures/Elon.png")}
            />
          )}
        </View>
        <View style={creditCardViewStyles.logoContainer}>
          <Text style={creditCardViewStyles.headerText}>
            {businessDetails ? businessDetails.BusinessName : ""}
          </Text>
          <Text style={creditCardViewStyles.name}>
            {firstName + " " + lastName}
          </Text>
        </View>
      </View>

      <View style={creditCardViewStyles.balanceContainer}>
        <Text style={creditCardViewStyles.balanceText}>Balance</Text>
        <TouchableOpacity
          onPress={() => {
            changeBalanceVisibility();
          }}
        >
          {hideBalance ? (
            <Ionicons name="eye-outline" size={22} color="white" />
          ) : (
            <Ionicons name="eye-off-outline" size={22} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={creditCardViewStyles.amountContainer}>
        <Text style={creditCardViewStyles.amountText}>
          {hideBalance ? "******" : "2,720,450 Birr"}
        </Text>
      </View>

      <Text style={creditCardViewStyles.date}>16 Sept, 2023</Text>
    </View>
  );
};

export default CreditCardView;
