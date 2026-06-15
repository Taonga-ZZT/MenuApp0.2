import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { MenuContext } from "../MenuContext";

export default function GuestFilterScreen() {
  const { menuItems } = useContext(MenuContext);

  const [selectedCourse, setSelectedCourse] =
    useState("Starters");

  const filteredItems = menuItems.filter(
    (item) => item.course === selectedCourse
  );

  const courses = [
    "Starters",
    "Mains",
    "Desserts",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Guest Menu Filter
      </Text>

      <Text style={styles.subtitle}>
        Browse dishes by course
      </Text>

      <View style={styles.filterContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course &&
                styles.selectedFilter,
            ]}
            onPress={() =>
              setSelectedCourse(course)
            }
          >
            <Text
              style={{
                fontWeight:
                  selectedCourse === course
                    ? "bold"
                    : "normal",
              }}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        {selectedCourse}
      </Text>

      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No dishes available in this
            category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>
                {item.name}
              </Text>

              <Text
                style={styles.description}
              >
                {item.description}
              </Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      item.course ===
                      "Starters"
                        ? "#DFF6DD"
                        : item.course ===
                          "Mains"
                        ? "#FFE7CC"
                        : "#FAD9FF",
                  },
                ]}
              >
                <Text>
                  {item.course}
                </Text>
              </View>

              <Text style={styles.price}>
                R
                {Number(
                  item.price
                ).toFixed(2)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginBottom: 20,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },

  selectedFilter: {
    backgroundColor: "#DDE7FF",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 4,
  },

  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: "#666",
    marginTop: 6,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});