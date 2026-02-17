import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Room = {
  name: string;
  side: "LEFT" | "RIGHT";
};

const ROOMS: Record<number, Room[]> = {
  1: [
    { name: "Female CR (Female Comfort Room)", side: "RIGHT" },
    { name: "Budget Office", side: "RIGHT" },
    {
      name: "Office of the Vice President for Administration and Finance",
      side: "RIGHT",
    },
    {
      name: "Admissions Department / Gender and Development Department",
      side: "RIGHT",
    },
    { name: "Placement, Alumni and Linkages Department", side: "RIGHT" },
    { name: "MISD (Management Information Systems Department)", side: "RIGHT" },
    { name: "ComLab 3 (Computer Laboratory 3)", side: "RIGHT" },

    { name: "PMGSD / Laboratory Services & DRRMD", side: "LEFT" },
    { name: "Human Resource Management Department", side: "LEFT" },
    {
      name: "Quality Management & Planning Department / Data Protection Department",
      side: "LEFT",
    },
    { name: "Cashier", side: "LEFT" },
    { name: "Registrar", side: "LEFT" },
    { name: "ComLab 1 (Computer Laboratory 1)", side: "LEFT" },
    { name: "ComLab 2 (Computer Laboratory 2)", side: "LEFT" },
    {
      name: "Entrepreneurship & Business Development Department",
      side: "LEFT",
    },
    { name: "Continuing Professional Education Department", side: "LEFT" },
    { name: "Knowledge Management & Innovation Department", side: "LEFT" },
    { name: "Community Extension & Services Department", side: "LEFT" },
    { name: "Research Ethics Review Center", side: "LEFT" },
    { name: "Innovation Hub", side: "LEFT" },
    { name: "Data Analytics Network & Automation Laboratory", side: "LEFT" },
  ],

  2: [
    { name: "College of Health and Allied Sciences", side: "LEFT" },
    { name: "College of Arts and Sciences", side: "LEFT" },
    { name: "College of Computing Studies", side: "LEFT" },
    { name: "College of Engineering", side: "LEFT" },
    {
      name: "College of Business Administration and Accountancy",
      side: "LEFT",
    },
    { name: "Graduate School", side: "LEFT" },
    { name: "ComLab 4 (Computer Laboratory 4)", side: "LEFT" },
    { name: "ComLab 5 (Computer Laboratory 5)", side: "LEFT" },
    { name: "Network Laboratory", side: "LEFT" },

    { name: "Male CR (Male Comfort Room)", side: "RIGHT" },
    { name: "ComLab 6 (Computer Laboratory 6)", side: "RIGHT" },
    { name: "Microbiology – Parasitology Laboratory", side: "RIGHT" },
    { name: "Coed CR (All-Gender Comfort Room)", side: "RIGHT" },
    { name: "Ergonomics Laboratory (Rooms 201–202)", side: "RIGHT" },
    { name: "Digital / Embedded Systems Laboratory (Room 203)", side: "RIGHT" },
    { name: "Guidance and Counselling Department", side: "RIGHT" },
    { name: "Female CR (Female Comfort Room)", side: "RIGHT" },
  ],

  3: [
    { name: "Room 322", side: "RIGHT" },
    { name: "Psychological Laboratory (Rooms 320–321)", side: "RIGHT" },
    { name: "Rooms 319–318", side: "RIGHT" },
    { name: "Rooms 317–316", side: "RIGHT" },
    { name: "Rooms 315–314", side: "RIGHT" },
    { name: "Room 313", side: "RIGHT" },
    { name: "Electrical Laboratory (Room 312)", side: "RIGHT" },
    {
      name: "Work, Study & Measurement Laboratory (Rooms 311–310)",
      side: "RIGHT",
    },
    { name: "Rooms 309–308", side: "RIGHT" },
    { name: "Rooms 307–306", side: "RIGHT" },
    { name: "Rooms 305–304", side: "RIGHT" },
    { name: "Rooms 303–301", side: "RIGHT" },
  ],
};

export default function RoomSelectionScreen() {
  const router = useRouter();
  const { floor } = useLocalSearchParams();

  const [search, setSearch] = useState("");

  const floorNumber = Number(floor);
  const rooms = ROOMS[floorNumber] || [];

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, rooms]);

  const groupedRooms = {
    LEFT: filteredRooms.filter((r) => r.side === "LEFT"),
    RIGHT: filteredRooms.filter((r) => r.side === "RIGHT"),
  };

  if (!rooms.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Invalid Floor Selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Floor {floorNumber}</Text>

      <TextInput
        placeholder="Search room..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#777"
      />

      {["LEFT", "RIGHT"].map((side) =>
        groupedRooms[side as "LEFT" | "RIGHT"].length > 0 ? (
          <View key={side} style={styles.sideSection}>
            <Text style={styles.sideHeader}>{side}</Text>

            {groupedRooms[side as "LEFT" | "RIGHT"].map((room, index) => (
              <Pressable
                key={index}
                style={styles.roomCard}
                onPress={() =>
                  router.push({
                    pathname: "/ar-navigation",
                    params: {
                      floor: floorNumber,
                      room: room.name,
                      side: room.side,
                    },
                  })
                }
              >
                <Text style={styles.roomText}>{room.name}</Text>
              </Pressable>
            ))}
          </View>
        ) : null,
      )}

      {filteredRooms.length === 0 && (
        <Text style={styles.noResult}>No rooms found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#166534",
  },

  search: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
  },

  sideSection: {
    marginBottom: 24,
  },

  sideHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#14532d",
  },

  roomCard: {
    backgroundColor: "#e8f5e9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  roomText: {
    fontSize: 14,
    fontWeight: "500",
  },

  noResult: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
