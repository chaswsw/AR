import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

export default function FloorSelectionScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFloor, setExpandedFloor] = useState<number | null>(null);

  const floors = [
    { id: 1, name: "Ground Floor", icon: "briefcase-outline" },
    { id: 2, name: "Second Floor", icon: "flask-outline" },
    { id: 3, name: "Third Floor", icon: "school-outline" },
    { id: 4, name: "Fourth Floor", icon: "barbell-outline" },
  ];

  const toggleFloor = (id: number) => {
    setExpandedFloor(expandedFloor === id ? null : id);
  };

  const goToRoomSelection = () => {
    if (!expandedFloor) return;

    router.push({
      pathname: "/room-selection",
      params: { floor: expandedFloor },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="location-outline" size={20} color="#166534" />
          <Text style={styles.headerText}>PNC Main Building</Text>
        </View>

        <Image
          source={require("@/assets/images/pnc_logo.png")}
          style={styles.logo}
        />
      </View>

      {/* HERO SECTION */}
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/hero_banner.png")}
          style={styles.banner}
        />
        <View style={styles.overlay} />

        <Text style={[styles.heroText, { fontSize: isTablet ? 28 : 22 }]}>
          Where do you want to go?
        </Text>

        {/* SEARCH BAR */}
        <View style={styles.searchBox}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search rooms..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>

      {/* FLOOR BUTTONS */}
      <View style={styles.floorContainer}>
        {floors.map((floor) => (
          <Pressable
            key={floor.id}
            style={[
              styles.floorCard,
              expandedFloor === floor.id && styles.activeCard,
            ]}
            onPress={() => toggleFloor(floor.id)}
          >
            <Ionicons name={floor.icon as any} size={26} color="#fff" />
            <Text style={styles.floorText}>{floor.name}</Text>
            <Ionicons
              name={
                expandedFloor === floor.id
                  ? "chevron-up-outline"
                  : "chevron-down-outline"
              }
              size={18}
              color="#fff"
            />
          </Pressable>
        ))}
      </View>

      {/* CONTINUE BUTTON (if floor selected) */}
      {expandedFloor && (
        <View style={styles.roomList}>
          <Text style={styles.roomHeader}>
            {floors.find((f) => f.id === expandedFloor)?.name}
          </Text>

          <Pressable style={styles.continueButton} onPress={goToRoomSelection}>
            <Text style={styles.continueText}>VIEW ROOMS</Text>
          </Pressable>
        </View>
      )}

      {/* FOOTER */}
      {!expandedFloor && (
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Pamantasan ng Cabuyao</Text>
          <Text style={styles.footerText}>
            Pamantasan ng Cabuyao (PnC) is one of the leading local colleges and
            universities in the Philippines.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  headerText: {
    fontWeight: "600",
    fontSize: 15,
  },

  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },

  hero: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  banner: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,101,52,0.7)",
  },

  heroText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  searchBox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
  },

  floorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    marginTop: -30,
  },

  floorCard: {
    backgroundColor: "#166534",
    width: "48%",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  activeCard: {
    backgroundColor: "#14532d",
  },

  floorText: {
    color: "#fff",
    fontWeight: "600",
    marginVertical: 6,
    fontSize: 13,
    textAlign: "center",
  },

  roomList: {
    padding: 16,
  },

  roomHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 14,
  },

  continueButton: {
    backgroundColor: "#166534",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    padding: 16,
    marginTop: 20,
  },

  footerTitle: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },

  footerText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
