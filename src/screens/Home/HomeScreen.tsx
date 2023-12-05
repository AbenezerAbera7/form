import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../../styles/common";
import HomeNameCard from "./components/HomeNameCard";
import ScreenIntroCard from "../../components/ScreenIntroCard";
import ITR from "./components/Analytics/InventoryTurnoverRatio/ITR";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeScreenStyles } from "./styles/homescreen";
import GROI from "./components/Analytics/GrossMarginsROI/GROI";
import FAB from "./components/FAB";
import ProductModal from "./components/ProductModal";
import { UserContext } from "../../context/UserContext";
import CreditCardView from "./components/CreditCardView";
import DailyPerformanceCard from "./components/DailyPerformanceCard";
import TransactionsCard from "./components/TransactionsCard";
import OnboardingScreen from "../Onboarding/Onboarding/OnboardingScreen";
import Paginator from "./components/Paginator";
import { colors } from "../../config/global";
const { width, height } = Dimensions.get("window");

const HomeScreen = (props: any) => {
  const navigation = useNavigation();
  const { user, showOnboarding, setShowOnboarding } = useContext(UserContext);

  const name = user ? user.FirstName : "";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const data = [
    <ITR navigation={navigation} />,
    <GROI />,
    <ITR navigation={navigation} />,
    <GROI />,
    <ITR navigation={navigation} />,
    <GROI />,
  ];
  // create an array of numbers with length of data array
  const dataLengthArray = Array.from(Array(data.length).keys());
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [isLooping, setIsLooping] = useState(false);
  const [prevScrollX, setPrevScrollX] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<string>("right");

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);
  };

  return showOnboarding ? (
    <OnboardingScreen />
  ) : (
    <View style={homeScreenStyles.background}>
      <FAB navigation={navigation} />
      <HomeNameCard Name={name} />
      <ScrollView>
        <CreditCardView />
        <Animated.FlatList
          data={data}
          renderItem={({ item }) => item}
          snapToAlignment="start"
          snapToInterval={width}
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled
          bounces={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={dataLengthArray} scrollX={scrollX} />
        <TransactionsCard />
      </ScrollView>

      <ProductModal />
    </View>
  );
};

export default HomeScreen;
