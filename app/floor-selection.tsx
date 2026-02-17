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

/* 🔥 UPDATED MASTER ROOM LIST (SYNCHRONIZED) */
const ALL_ROOMS: Record<number, string[]> = {
  1: [
    "Female CR (Female Comfort Room)",
    "Budget Office",
    "Office of the Vice President for Administration and Finance",
    "Admissions Department / Gender and Development Department",
    "Placement, Alumni and Linkages Department",
    "MISD (Management Information Systems Department)",
    "ComLab 3 (Computer Laboratory 3)",
    "PMGSD / Laboratory Services & DRRMD",
    "Human Resource Management Department",
    "Quality Management & Planning Department / Data Protection Department",
    "Cashier",
    "Registrar",
    "ComLab 1 (Computer Laboratory 1)",
    "ComLab 2 (Computer Laboratory 2)",
    "Entrepreneurship & Business Development Department",
    "Continuing Professional Education Department",
    "Knowledge Management & Innovation Department",
    "Community Extension & Services Department",
    "Research Ethics Review Center",
    "Innovation Hub",
    "Data Analytics Network & Automation Laboratory",
  ],

  2: [
    "College of Health and Allied Sciences",
    "College of Arts and Sciences",
    "College of Computing Studies",
    "College of Engineering",
    "College of Business Administration and Accountancy",
    "Graduate School",
    "ComLab 4 (Computer Laboratory 4)",
    "ComLab 5 (Computer Laboratory 5)",
    "Network Laboratory",
    "Male CR (Male Comfort Room)",
    "ComLab 6 (Computer Laboratory 6)",
    "Microbiology – Parasitology Laboratory",
    "Coed CR (All-Gender Comfort Room)",
    "Ergonomics Laboratory (Rooms 201–202)",
    "Digital / Embedded Systems Laboratory (Room 203)",
    "Guidance and Counselling Department",
    "Female CR (Female Comfort Room)",
  ],

  3: [
    "Room 322",
    "Psychological Laboratory (Rooms 320–321)",
    "Rooms 319–318",
    "Rooms 317–316",
    "Rooms 315–314",
    "Room 313",
    "Electrical Laboratory (Room 312)",
    "Work, Study & Measurement Laboratory (Rooms 311–310)",
    "Rooms 309–308",
    "Rooms 307–306",
    "Rooms 305–304",
    "Rooms 303–301",
  ],
};

export default function FloorSelectionScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [searchQuery, setSearchQuery] = useState("");

  const floors = [
    { id: 1, name: "Ground Floor", icon: "briefcase-outline" },
    { id: 2, name: "Second Floor", icon: "flask-outline" },
    { id: 3, name: "Third Floor", icon: "school-outline" },
  ];

  /* 🔍 GLOBAL SEARCH FUNCTION */
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    for (const floor in ALL_ROOMS) {
      const match = ALL_ROOMS[Number(floor)].find((room) =>
        room.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      if (match) {
        router.push({
          pathname: "/room-selection",
          params: {
            floor,
            search: searchQuery,
          },
        });
        return;
      }
    }

    alert("Room not found.");
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* HERO */}
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/hero_banner.png")}
          style={styles.banner}
        />
        <View style={styles.overlay} />

        <Text style={[styles.heroText, { fontSize: isTablet ? 28 : 22 }]}>
          Where do you want to go?
        </Text>

        <View style={styles.searchBox}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search room..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            onSubmitEditing={handleSearch}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>

      {/* FLOOR BUTTONS */}
      <View style={styles.floorContainer}>
        {floors.map((floor) => (
          <Pressable
            key={floor.id}
            style={styles.floorCard}
            onPress={() =>
              router.push({
                pathname: "/room-selection",
                params: { floor: floor.id },
              })
            }
          >
            <Ionicons name={floor.icon as any} size={26} color="#fff" />
            <Text style={styles.floorText}>{floor.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },

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

  headerText: { fontWeight: "600" },

  logo: { width: 36, height: 36, resizeMode: "contain" },

  hero: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  banner: { ...StyleSheet.absoluteFillObject, resizeMode: "cover" },

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
  },

  searchInput: { flex: 1 },

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

  floorText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 6,
  },
});
