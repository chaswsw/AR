import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
    { id: 1, name: "1st Floor" },
    { id: 2, name: "2nd Floor" },
    { id: 3, name: "3rd Floor" },
    { id: 4, name: "4th Floor" },
  ];

  /* GLOBAL SEARCH */
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
      <Text style={styles.title}>Select a Floor</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search room..."
        style={styles.search}
        onSubmitEditing={handleSearch}
      />

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
          <Text style={styles.floorText}>{floor.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

  search: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
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
