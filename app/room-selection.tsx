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

/* 🔥 SAME MASTER ROOM LIST */
const ROOMS = require("./floor-selection").ALL_ROOMS || {};

export default function RoomSelectionScreen() {
  const router = useRouter();
  const { floor, search: initialSearch } = useLocalSearchParams();

  const [search, setSearch] = useState(
    typeof initialSearch === "string" ? initialSearch : "",
  );

  const floorNumber = Number(floor);
  const rooms = ROOMS[floorNumber] || [];

  const filteredRooms = useMemo(() => {
    return rooms.filter((room: string) =>
      room.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, rooms]);

  if (!rooms.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Invalid Floor</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Floor {floorNumber}</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search room..."
        style={styles.search}
      />

      {filteredRooms.map((room: string, index: number) => (
        <Pressable
          key={index}
          style={styles.roomCard}
          onPress={() =>
            router.push({
              pathname: "/ar-navigation",
              params: { floor: floorNumber, room },
            })
          }
        >
          <Text style={styles.roomText}>{room}</Text>
        </Pressable>
      ))}

      {filteredRooms.length === 0 && (
        <Text style={styles.noResult}>No rooms found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  search: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  roomCard: {
    backgroundColor: "#e8f5e9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  roomText: { fontSize: 14, fontWeight: "500" },
  noResult: { textAlign: "center", marginTop: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, fontWeight: "bold" },
});
