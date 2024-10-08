
import React, { useState } from "react";
import { DishDetails } from "./type"; // Adjust the path based on your project structure
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { DishDetails } from "./type"; // Assuming you have updated the type accordingly

export default function App() {
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [course, setCourse] = useState<string>("Select a Course");
  const [price, setPrice] = useState<string>("");
  const [dishes, setDishes] = useState<DishDetails[]>([]);
  const [totalDishes, setTotalDishes] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const CourseOptions = [
    "Starter",
    "Main Course",
    "Dessert",
    "Beverage",
  ];

  const handleSubmit = () => {
    const priceNum = parseFloat(price);

    if (dishName && description && course !== "Select a Course" && priceNum > 0) {
      const newDish: DishDetails = {
        dish_Name: dishName,
        description,
        course,
        price: priceNum,
      };

      setDishes((prevDishes) => [...prevDishes, newDish]);
      setTotalDishes((prevTotal) => prevTotal + 1);
      resetFields();
    } else {
      const errorMessage =
        !dishName || !description || course === "Select a Course" || !price
          ? "Please fill in all the fields"
          : "Price must be greater than 0!";
      Alert.alert("Input Error", errorMessage, [{ text: "OK" }]);
    }
  };

  const resetFields = () => {
    setDishName("");
    setDescription("");
    setCourse("Select a Course");
    setPrice("");
  };

  const selectCourse = (selectedCourse: string) => {
    setCourse(selectedCourse);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.trackerName}>PRIVATE CHEF CHRISTOFFEL MENU</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.coursePicker} onPress={() => setModalVisible(true)}>
          <Text style={styles.courseText}>{course}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <Button title="Add Dish" onPress={handleSubmit} color="#FFD700" />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryHeading}>ITEMS SUMMARY</Text>
        <View style={styles.summaryContent}>
          <FlatList
            data={dishes}
            renderItem={({ item }) => (
              <View style={styles.dishItem}>
                <Text style={styles.dishText}>{item.dish_Name}</Text>
                <Text style={styles.dishText}>{item.description}</Text>
                <Text style={styles.dishText}>{item.course}</Text>
                <Text style={styles.dishText}>${item.price.toFixed(2)}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Text style={styles.totalDishes}>Total Dishes: {totalDishes}</Text>
      </View>

      {/* Modal for Course Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select a Course</Text>
            {CourseOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionButton} onPress={() => selectCourse(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} color="#FFD700" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  headingContainer: {
    marginBottom: 20,
  },
  trackerName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    fontFamily: "Cochin",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#FFF",
    backgroundColor: '#333',
  },
  coursePicker: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  courseText: {
    color: "#FFF",
    paddingLeft: 10,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    fontFamily: "Cochin",
  },
  summaryContent: {
    marginTop: 10,
  },
  dishItem: {
    marginBottom: 10,
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 5,
  },
  dishText: {
    color: '#FFD700',
    fontSize: 18,
    fontFamily: "Cochin",
  },
  totalDishes: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: '#FFD700',
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});