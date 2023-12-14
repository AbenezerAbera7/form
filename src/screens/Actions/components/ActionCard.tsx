import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { actionCardStyles } from "../styles/actionCardStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ActionsModalContext } from "../../../context/ActionsContext";
import { useBottomSheet } from "@gorhom/bottom-sheet";

const ActionCard = ({
  iconName,
  Title,
  action,
}: {
  iconName: string;
  Title: string;
  action?: { type: string; ref?: any };
}) => {
  const {
    sellProductModalVisible,
    setSellProductModalVisible,
    setModalVisible,
    screenToRender,
    setScreenToRender,
  } = useContext(ActionsModalContext);
  const { close, expand } = useBottomSheet();
  const [expandOptions, setExpandOptions] = useState(false);
  const navigation = useNavigation<any>();
  const handleAction = () => {
    if (action) {
      if (action.type === "sell") {
        // setSellProductModalVisible(true);
        // setModalVisible(false);
        // close();
        setScreenToRender("Sell");
        expand();
      }
      if (action.type === "add") {
        setExpandOptions(!expandOptions);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={actionCardStyles.container}
        onPress={handleAction}
      >
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <View style={actionCardStyles.IconContainer}>
            <Icon name={iconName} size={25} color="black" />
          </View>

          <Text style={actionCardStyles.title}>{Title}</Text>
        </View>
        {action ? (
          action.type === "add" ? (
            <Icon
              name={expandOptions ? "chevron-up" : "chevron-down"}
              size={25}
              color="black"
              style={{ marginRight: 10 }}
            />
          ) : null
        ) : null}
      </TouchableOpacity>
      {expandOptions ? (
        <View style={actionCardStyles.optionsContainer}>
          <TouchableOpacity
            style={actionCardStyles.option}
            onPress={() => {
              navigation.navigate("Products" as never, {
                screen: "New-Product",
                initial: false,
              });
              setModalVisible(false);
              close();
            }}
          >
            <Text style={actionCardStyles.optionText}>Stock New Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={actionCardStyles.option}>
            <Text style={actionCardStyles.optionText}>
              Add More of Existing Stock
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ActionCard;
