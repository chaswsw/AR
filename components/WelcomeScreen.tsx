import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;
  const isLandscape = width > height;

  return (
    <View style={styles.container}>
      {/* TOP SECTION */}
      <View
        style={[
          styles.topSection,
          {
            height: isLandscape ? "45%" : "60%",
            borderBottomLeftRadius: isTablet ? 64 : 48,
            borderBottomRightRadius: isTablet ? 64 : 48,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/Welcome_page.png")}
          style={[
            styles.image,
            {
              width: isTablet ? "70%" : "90%",
              height: isTablet ? "70%" : "90%",
            },
          ]}
          resizeMode="contain"
        />
      </View>

      {/* BOTTOM SECTION */}
      <View
        style={[
          styles.bottomSection,
          {
            paddingHorizontal: isTablet ? 48 : 24,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: isTablet ? 32 : 22,
              marginBottom: isTablet ? 16 : 12,
            },
          ]}
        >
          PNC MAIN BUILDING{"\n"}NAVIGATION
        </Text>

        <Text
          style={[
            styles.description,
            {
              fontSize: isTablet ? 18 : 14,
              marginBottom: isTablet ? 32 : 24,
              maxWidth: isTablet ? 520 : "100%",
            },
          ]}
        >
          A smart mobile app that helps students easily navigate the
          school&apos;s main building.
        </Text>

        <Pressable
          style={[
            styles.button,
            {
              paddingVertical: isTablet ? 20 : 16,
              maxWidth: isTablet ? 360 : 320,
            },
          ]}
          onPress={() => router.replace("/floor-selection")}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: isTablet ? 18 : 16,
              },
            ]}
          >
            GET STARTED
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topSection: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
  },
  bottomSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 999,
    width: "100%",
  },
  buttonText: {
    color: "#111",
    fontWeight: "bold",
    textAlign: "center",
  },
});
