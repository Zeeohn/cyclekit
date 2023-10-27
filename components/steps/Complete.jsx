import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";

const API_ENDPOINT = "https://dev.cyclekits.ng/api/subscription/plans";

export default function Complete() {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://dev.cyclekits.ng/api/subscription/plans"
  //     );

  //     console.log(response);

  //     if (response.data && response.data.status && response.data.data) {
  //       setData(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentOption = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleSubmit = () => {
    router.replace("/(customer)/");
  };

  return (
    <View style={styles.container}>
      <Text className="font-boldFont text-xl mb-3">
        Select a Subscription Plan
      </Text>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.planItem,
              selectedPlan &&
                selectedPlan.id === item.id &&
                styles.selectedPlan,
            ]}
            onPress={() => handlePlanSelection(item)}
          >
            <Text className="font-mediumFont text-base" style={styles.planName}>{item.plan_name}</Text>
            <Text className="font-mediumFont text-base style={styles.planAmount}>Amount: {item.amount}</Text>
            <Text className="font-mediumFont text-base style={styles.planDate}>Validity: {item.date}</Text>
          </TouchableOpacity>
        )}
      /> */}
      {selectedPlan && (
        <Text style={styles.selectedPlanText}>
          Selected Plan: {selectedPlan.plan_name}
        </Text>
      )}

      <Text className="font-boldFont text-xl mb-3">
        Select a Payment Option
      </Text>
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPaymentOption === "Pay Now" && styles.selectedPaymentOption,
        ]}
        onPress={() => handlePaymentOption("Pay Now")}
      >
        <Text style={styles.paymentOptionText}>Pay Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPaymentOption === "Pay For Me" &&
            styles.selectedPaymentOption,
        ]}
        onPress={() => handlePaymentOption("Pay For Me")}
      >
        <Text style={styles.paymentOptionText}>Pay for Me</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedPaymentOption === "Pay Later" && styles.selectedPaymentOption,
        ]}
        onPress={() => handlePaymentOption("Pay Later")}
      >
        <Text style={styles.paymentOptionText}>Pay Later</Text>
      </TouchableOpacity>
      {selectedPaymentOption && (
        <Text className="font-boldFont text-center text-lg text-green-800 mt-4 mb-4">
          Selected Payment Option: {selectedPaymentOption}
        </Text>
      )}
      <TouchableOpacity
        className="bg-black py-3 px-6 rounded-md"
        onPress={() => router.replace("/(customer)/")}
        // onPress={() => {
        //   handleSubmit;
        //   // Handle the submission with the selected plan and payment option
        //   // if (selectedPlan && selectedPaymentOption) {
        //   //   // Make an API call or perform the required actions
        //   //   // with the selected plan and payment option here.
        //   // }
        // }}
      >
        <Text className="text-base font-mediumFont text-white text-center">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  planItem: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  selectedPlan: {
    borderColor: "green",
    backgroundColor: "#e6ffe6",
  },
  planName: {
    fontSize: 16,
  },
  planAmount: {
    fontSize: 14,
  },
  planDate: {
    fontSize: 14,
  },
  selectedPlanText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  paymentHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  paymentOption: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  selectedPaymentOption: {
    borderColor: "green",
    backgroundColor: "#e6ffe6",
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedPaymentOptionText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});
