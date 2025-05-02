import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RNFS from "react-native-fs";

const COUNTER_FILE_PATH = `${RNFS.DocumentDirectoryPath}/counter.txt`;

const App = () => {
  const [count, setCount] = useState(0);

  // Load the counter from file on startup
  useEffect(() => {
    const loadCount = async () => {
      try {
        const exists = await RNFS.exists(COUNTER_FILE_PATH);
        if (exists) {
          const fileContents = await RNFS.readFile(COUNTER_FILE_PATH, "utf8");
          const parsed = parseInt(fileContents, 10);
          if (!isNaN(parsed)) {
            setCount(parsed);
          }
        }
      } catch (error) {
        console.error("Failed to load count:", error);
      }
    };
    loadCount();
  }, []);

  // Save to file whenever count changes
  useEffect(() => {
    const saveCount = async () => {
      try {
        await RNFS.writeFile(COUNTER_FILE_PATH, count.toString(), "utf8");
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
        <TouchableOpacity style={styles.button} onPress={() => setCount(count > 0 ? count - 1 : count)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setCount(count < 999 ? count + 1 : count)}>
          <Text style={styles.buttonText}>+</Text>
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
