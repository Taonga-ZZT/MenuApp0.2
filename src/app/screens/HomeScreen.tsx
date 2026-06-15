import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { MenuContext } from "../MenuContext";

export default function HomeScreen() {
  const { menuItems } = useContext(MenuContext);

  const calculateAverage = (course: string) => {
    const items = menuItems.filter(
      (item) => item.course === course
    );

    if (items.length === 0) return 0;

    const total = items.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    return (total / items.length).toFixed(2);
  };

 const totalMenuValue =
  menuItems.reduce(
    (sum, item) =>
      sum + Number(item.price),
    0
  ); 

return (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: "#F3F3F3",
      padding: 20,
    }}
  >
    <Text
      style={{
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
      }}
    >
      🍽 Christoffel's Restaurant
    </Text>

    <Text
      style={{
        color: "#666",
        marginBottom: 20,
      }}
    >
      Fine Dining Menu Manager
    </Text>

    {/* Statistics */}
    <View
      style={{
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {menuItems.length}
      </Text>

      <Text>Total Menu Items</Text>

      <Text
  style={{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  }}
>
  💰 R{totalMenuValue.toFixed(2)}

</Text>

<Text>Total Menu Value</Text>
    </View>

    {/* Average Prices */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 12,
          marginHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text>Starters</Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          R{calculateAverage("Starters")}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 12,
          marginHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text>Mains</Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          R{calculateAverage("Mains")}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 12,
          marginHorizontal: 2,
          alignItems: "center",
        }}
      >
        <Text>Desserts</Text>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          R{calculateAverage("Desserts")}
        </Text>
      </View>
    </View>

    {/* Menu Items */}
    {menuItems.map((item) => (
      <View
        key={item.id}
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginVertical: 8,
          borderRadius: 16,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,

          elevation: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {item.name}
        </Text>

        <Text
          style={{
            color: "#666",
            marginTop: 5,
          }}
        >
          {item.description}
        </Text>

        <View
          style={{
            alignSelf: "flex-start",
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,

            backgroundColor:
              item.course === "Starters"
                ? "#DFF6DD"
                : item.course === "Mains"
                ? "#FFE7CC"
                : "#FAD9FF",
          }}
        >
          <Text>{item.course}</Text>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          R{item.price}
        </Text>
      </View>
    ))}
  </ScrollView>
);
}