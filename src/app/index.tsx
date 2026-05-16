import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      name: "Pan-Seared Scallops",
      description:
        "Fresh scallops with citrus beurre blanc, microgreens, and crispy pancetta",
      course: "Starters",
      price: "185",
    },
    {
      id: "2",
      name: "Beef Wellington",
      description:
        "Prime beef tenderloin wrapped in mushroom duxelles and puff pastry",
      course: "Mains",
      price: "425",
    },
    {
      id: "3",
      name: "Chocolate Fondant",
      description:
        "Warm chocolate lava cake with vanilla bean ice cream",
      course: "Desserts",
      price: "145",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starters");
  const [price, setPrice] = useState("");

  const courses = ["Starters", "Mains", "Desserts"];

  const addMenuItem = () => {
    if (!dishName || !description || !price) {
      alert("Please fill in all fields");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: dishName,
      description,
      course,
      price,
    };

    setMenuItems([...menuItems, newItem]);

    setDishName("");
    setDescription("");
    setCourse("Starters");
    setPrice("");

    setModalVisible(false);
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const renderSection = (section: string) => {
    const filteredItems = menuItems.filter(
      (item) => item.course === section
    );

    return (
      <View style={{ marginBottom: 25 }}>
        <Text style={styles.sectionTitle}>{section}</Text>

        {filteredItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dishName}>{item.name}</Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.course}</Text>
                </View>
              </View>

              <Text style={styles.price}>R{item.price}.00</Text>
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.description}>
                {item.description}
              </Text>

              <TouchableOpacity
                onPress={() => deleteItem(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="crimson"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍽 Christoffel's Menu</Text>

        <Text style={styles.itemCount}>
          {menuItems.length} items available
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {renderSection("Starters")}
        {renderSection("Mains")}
        {renderSection("Desserts")}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Menu Item</Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Dish Name</Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Grilled Salmon"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Describe the dish..."
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Course</Text>

            {courses.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.courseButton,
                  course === item && styles.selectedCourse,
                ]}
                onPress={() => setCourse(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>Price (R)</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMenuItem}
            >
              <Text style={styles.addButtonText}>
                Add to Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  header: {
    backgroundColor: "#02021A",
    padding: 20,
    paddingTop: 55,
  },

  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  itemCount: {
    color: "#ccc",
    marginTop: 5,
  },

  content: {
    padding: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  badge: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },

  badgeText: {
    fontSize: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  description: {
    flex: 1,
    color: "#666",
    marginRight: 10,
  },

  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    backgroundColor: "#02021A",
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 14,
  },

  courseButton: {
    backgroundColor: "#EEE",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  selectedCourse: {
    backgroundColor: "#D9D9D9",
  },

  addButton: {
    backgroundColor: "#02021A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});