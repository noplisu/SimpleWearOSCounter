import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const savedCount = await AsyncStorage.getItem("counterValue");
        if (savedCount !== null) {
          setCount(parseInt(savedCount, 10)); // Convert to number
        }
      } catch (error) {
        console.error("Failed to load count:", error);
      }
    };
    loadCount();
  }, []);

  useEffect(() => {
    const saveCount = async () => {
      try {
        await AsyncStorage.setItem("counterValue", count.toString());
      } catch (error) {
        console.error("Failed to save count:", error);
      }
    };
    saveCount();
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count < 999 ? count + 1 : count)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setCount(count > 0 ? count - 1 : count)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => setCount(0)}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    fontSize: 60,
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    borderRadius: 10,
    marginVertical: 1,
  },
  resetButton: {
    backgroundColor: "red",
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 10,
    marginTop: 2,
  },
  buttonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default App;
