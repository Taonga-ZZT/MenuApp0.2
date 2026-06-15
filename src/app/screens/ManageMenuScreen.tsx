import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MenuContext } from "../MenuContext";

export default function ManageMenuScreen() {
  const { menuItems, addMenuItem, deleteMenuItem } =
    useContext(MenuContext);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [course, setCourse] =
    useState("Starters");
  const [price, setPrice] = useState("");

  const courses = [
    "Starters",
    "Mains",
    "Desserts",
  ];

  const addItem = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please complete all fields."
      );
      return;
    }

    addMenuItem({
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    });

    setName("");
    setDescription("");
    setPrice("");
    setCourse("Starters");

    Alert.alert(
      "Success",
      "Menu item added successfully."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Manage Menu
      </Text>

      <Text style={styles.subtitle}>
        Add or remove menu items
      </Text>

      <Text style={styles.label}>
        Dish Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Grilled Salmon"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={[
          styles.input,
          { height: 90 },
        ]}
        multiline
        placeholder="Describe the dish..."
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>
        Course
      </Text>

      {courses.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.courseButton,
            course === item &&
              styles.selectedCourse,
          ]}
          onPress={() => setCourse(item)}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>
        Price (R)
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.00"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addItem}
      >
        <Text style={styles.addButtonText}>
          Add To Menu
        </Text>
      </TouchableOpacity>

      <Text style={styles.currentMenu}>
        Current Menu
      </Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={styles.cardHeader}
            >
              <Text
                style={
                  styles.itemTitle
                }
              >
                {item.name}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  deleteMenuItem(
                    item.id
                  )
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="crimson"
                />
              </TouchableOpacity>
            </View>

            <Text
              style={
                styles.description
              }
            >
              {item.description}
            </Text>

            <Text style={styles.badge}>
              {item.course}
            </Text>

            <Text
              style={
                styles.price
              }
            >
              R
              {Number(
                item.price
              ).toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F3F3",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
  },

  courseButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  selectedCourse: {
    backgroundColor: "#DDE7FF",
  },

  addButton: {
    backgroundColor: "#02021A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  currentMenu: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,

    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: "#666",
    marginTop: 8,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },

  price: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
});