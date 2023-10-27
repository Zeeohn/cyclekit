import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import React, { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PersonalDetails() {
  const { userData, setUserData } = useContext(StepperContext);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.cyclekits.ng/api/data/locations"
        );
        if (response.data && response.data.status && response.data.data) {
          const locationData = response.data.data;

          const stateNames = Object.keys(locationData);
          // Select the first state's cities by default
          const cityNames = locationData[stateNames[0]] || [];

          setStates(stateNames);
          setCities(cityNames);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setUserData({ ...userData, dob: formattedDate });
    hideDatePicker();
  };

  //   const addAddress = () => {
  //     if (userData && userData.addresses && userData.addresses.length < 3) {
  //       const newAddress = {
  //         state: selectedState,
  //         city: selectedCity,
  //         address: "",
  //         is_main: 0,
  //       };
  //       setUserData({
  //         ...userData,
  //         addresses: [...userData.addresses, newAddress],
  //       });
  //     } else {
  //       Toast.show({
  //         type: ALERT_TYPE.WARNING,
  //         title: "Ooops",
  //         textBody: "Maximum Number of Allowed Addresses Reached",
  //       });
  //     }
  //   };

  //   const removeAddress = (index) => {
  //     const updatedAddresses = [...userData.addresses];
  //     updatedAddresses.splice(index, 1);
  //     setUserData({
  //       ...userData,
  //       addresses: updatedAddresses,
  //     });
  //   };

  const handleAddressChange = (index, key, value) => {
    // Ensure userData.addresses is defined and is an array
    if (userData && userData.addresses && Array.isArray(userData.addresses)) {
      const updatedAddresses = [...userData.addresses];

      // Ensure the index is within the bounds of the array
      if (index >= 0 && index < updatedAddresses.length) {
        updatedAddresses[index][key] = value;
        setUserData({
          ...userData,
          addresses: updatedAddresses,
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // You can make an API request to submit the user's data here.
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="p-2 rounded-xl border border-gray-300 flex flex-col">
        <Text className="font-mediumFont pb-1 text-base pt-4 text-[#7b091c]">
          Full Name
        </Text>
        <TextInput
          value={userData.full_name}
          className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
          onChangeText={(text) => setUserData({ ...userData, full_name: text })}
          style={{
            borderColor: "black",
            color: "black",
          }}
        />

        <Text className="font-mediumFont pb-1 text-base pt-4 text-[#7b091c]">
          Date of Birth
        </Text>
        <TextInput
          value={userData.dob}
          className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
          onFocus={showDatePicker}
          style={{
            borderColor: "black",
            color: "black",
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <Text className="font-mediumFont pb-1 text-base pt-4 text-[#7b091c]">
          Addresses:
        </Text>
        <View className="border border-black flex-1 rounded-md font-normalFont text-sm">
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
          >
            {states.map((state) => (
              <Picker.Item label={state} value={state} key={state} />
            ))}
          </Picker>
        </View>

        <View className="mt-4 border border-black flex-1 rounded-md font-normalFont text-sm">
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={{ fontFamily: "DMSans" }}
          >
            {cities.map((city) => (
              <Picker.Item
                label={city}
                value={city}
                key={city}
                style={{ fontFamily: "DMSans" }}
              />
            ))}
          </Picker>
        </View>
        <TextInput
          onChangeText={(text) => handleAddressChange(0, "address", text)}
          //   value={userData.addresses[0].address}
          placeholder="Full Address"
          className="mt-4 border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
          style={{
            borderColor: "black",
            color: "black",
          }}
        />
        {/* 
        // {userData &&
        //     userData.addresses &&
        //     userData.addresses.slice(1).map((address, index) => (
        //       <View key={index}>
        //         <Text className="font-mediumFont pb-1 text-base text-[#7b091c]">
        //           Address {index + 1}:
        //         </Text>
        //         <View className="border border-black flex-1 rounded-md font-normalFont text-sm">
        //           <Picker
        //             selectedValue={selectedState}
        //             onValueChange={(itemValue) => setSelectedState(itemValue)}
        //           >
        //             {states.map((state) => (
        //               <Picker.Item label={state} value={state} key={state} />
        //             )}
        //           </Picker>
        //         </View>
        //         <View className="border border-black flex-1 rounded-md font-normalFont text-sm">
        //           <Picker
        //             selectedValue={selectedCity}
        //             onValueChange={(itemValue) => setSelectedCity(itemValue)}
        //           >
        //             {cities.map((city) => (
        //               <Picker.Item label={city} value={city} key={city} />
        //             )}
        //           </Picker>
        //         </View>
        //         <TextInput
        //           onChangeText={(text) =>
        //             handleAddressChange(index + 1, "address", text)
        //           }
        //           value={address.address}
        //           placeholder="Full Address"
        //           className="border flex-1 rounded-md py-2 px-4 font-normalFont text-sm"
        //           style={{
        //             borderColor: "black",
        //             color: "black",
        //           }}
        //         />
        //         <TouchableOpacity
        //           title="Remove Address"
        //           onPress={() => removeAddress(index + 1)}
        //         >
        //           <Text>Remove Address</Text>
        //         </TouchableOpacity>
        //       </View>
        //     ))}
        //   {userData && userData.addresses.length < 3 && (
        //     <TouchableOpacity title="Add Address" onPress={addAddress}>
        //       <Text>Add Address</Text>
        //     </TouchableOpacity>
        //   )} */}

        {/* <TouchableOpacity title="Add Address" onPress={addAddress}>
          <Text>Add Address</Text>
        </TouchableOpacity>

        <TouchableOpacity title="Submit" onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}
