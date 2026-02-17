import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import { ROOMS } from "./floor-selection";

export default function RoomSelectionScreen() {
  const router = useRouter();
  const { floor, search: initialSearch } = useLocalSearchParams();

  const floorNumber = Number(floor);
  const rooms = ROOMS[floorNumber] || [];

  const [search, setSearch] = useState(
    typeof initialSearch === "string" ? initialSearch : "",
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, rooms]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Floor {floorNumber}</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search room..."
        style={styles.search}
      />

      {filteredRooms.map((room, index) => (
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
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

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

  roomText: {
    fontSize: 14,
    fontWeight: "500",
  },

  noResult: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
