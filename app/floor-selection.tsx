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
  View,
} from "react-native";

/* MASTER ROOM DATABASE */
export const ROOMS: Record<number, string[]> = {
  1: [
    "Female CR (Female Comfort Room)",
    "Budget Office",
    "Office of the Vice President for Administration and Finance",
    "Admissions Department / Gender and Development Department",
    "Placement, Alumni and Linkages Department",
    "MISD (Management Information Systems Department)",
    "Computer Laboratory 3",
    "PMGSD / Laboratory Services & DRRMD",
    "Human Resource Management Department",
    "Quality Management & Planning Department / Data Protection Department",
    "Cashier",
    "Registrar",
    "Computer Laboratory 1",
    "Computer Laboratory 2",
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
    "Computer Laboratory 4",
    "Computer Laboratory 5",
    "Network Laboratory",
    "Male CR (Male Comfort Room)",
    "Computer Laboratory 6",
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
    "Room 319",
    "Room 318",
    "Room 317",
    "Room 316",
    "Room 315",
    "Room 314",
    "Room 313",
    "Electrical Laboratory (Room 312)",
    "Work, Study & Measurement Laboratory (Rooms 311–310)",
    "Room 309",
    "Room 308",
    "Room 307",
    "Room 306",
    "Room 305",
    "Room 304",
    "Room 303",
    "Room 301",
  ],

  4: ["Gym 1", "Gym 2"],
};

export default function FloorSelectionScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const floors = [
    { id: 1, name: "1st Floor", icon: "business-outline" },
    { id: 2, name: "2nd Floor", icon: "flask-outline" },
    { id: 3, name: "3rd Floor", icon: "school-outline" },
    { id: 4, name: "4th Floor", icon: "barbell-outline" },
  ];

  const handleSearch = () => {
    if (!search.trim()) return;

    for (const floor in ROOMS) {
      const match = ROOMS[Number(floor)].find((room) =>
        room.toLowerCase().includes(search.toLowerCase()),
      );

      if (match) {
        router.push({
          pathname: "/room-selection",
          params: { floor, search },
        });
        return;
      }
    }

    alert("Room not found.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HERO SECTION */}
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/hero_banner.png")}
          style={styles.banner}
        />
        <View style={styles.overlay} />

        <Text style={styles.heroText}>Where do you want to go?</Text>

        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search room..."
            placeholderTextColor="#777"
            style={styles.searchInput}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {/* FLOOR LIST */}
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
            <Ionicons
              name={floor.icon as any}
              size={26}
              color="#fff"
              style={{ marginBottom: 6 }}
            />
            <Text style={styles.floorText}>{floor.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  hero: {
    height: 260,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  searchBox: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 14,
    borderRadius: 14,
  },

  searchInput: {
    fontSize: 14,
  },

  floorContainer: {
    padding: 20,
  },

  floorCard: {
    backgroundColor: "#166534",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  floorText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
