import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useThemeColor } from "./../hooks/useThemeColor";
import { useFonts } from "expo-font";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const CustomCalendar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [cycleData, setCycleData] = useState({
    start: "2023-08-06", // Use ISO date format (YYYY-MM-DD)
    end: "14",
    length: "28",
  });

  const [markedDates, setMarkedDates] = useState({});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    themeColor,
    setThemeColor,
    colorScheme,
    setColorScheme,
    toggleColorMode,
  } = useThemeColor();

  useEffect(() => {
    if (!isEditing && cycleData.start) {
      const cycleStart = new Date(cycleData.start);
      const cycleEnd = parseInt(cycleData.end);
      const cycleLength = parseInt(cycleData.length);

      const newMarkedDates = {};

      // Calculate for the selected month and future months
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // Months are 1-indexed

      // Calculate the date for the first period
      let periodDate = cycleStart;

      while (periodDate.getFullYear() <= currentYear + 1) {
        const dateString = periodDate.toISOString().split("T")[0];
        newMarkedDates[dateString] = {
          selected: true,
          marked: true,
          dotColor: "#7b091c",
          selectedColor: "#7b091c",
        };

        // Calculate period window (start date + 4 days)
        let periodWindowDate = new Date(periodDate);
        for (let i = 0; i < 5; i++) {
          const periodWindowDateString = periodWindowDate
            .toISOString()
            .split("T")[0];
          newMarkedDates[periodWindowDateString] = {
            selected: true,
            marked: true,
            dotColor: "#7b091c",
            selectedColor: "#7b091c",
          };
          periodWindowDate.setDate(periodWindowDate.getDate() + 1);
        }

        // Calculate ovulation window (10 days after period start + 5 days)
        let ovulationWindowDate = new Date(periodDate);
        ovulationWindowDate.setDate(ovulationWindowDate.getDate() + 10);
        for (let i = 0; i < 6; i++) {
          const ovulationWindowDateString = ovulationWindowDate
            .toISOString()
            .split("T")[0];
          newMarkedDates[ovulationWindowDateString] = {
            selected: true,
            marked: true,
            dotColor: "#0c61e2",
            selectedColor: "#0c61e2",
          };
          ovulationWindowDate.setDate(ovulationWindowDate.getDate() + 1);
        }

        // Calculate the exact ovulation date (14 days after period start)
        if (
          periodDate.getFullYear() === currentYear &&
          periodDate.getMonth() === currentMonth - 1
        ) {
          const exactOvulationDate = new Date(periodDate);
          exactOvulationDate.setDate(exactOvulationDate.getDate() + 14);
          const exactOvulationDateString = exactOvulationDate
            .toISOString()
            .split("T")[0];
          newMarkedDates[exactOvulationDateString] = {
            selected: true,
            marked: true,
            selectedColor: "darkblue", // Darker shade of blue
            dotColor: "darkblue",
          };
        }

        // Move to the next period
        periodDate.setDate(periodDate.getDate() + cycleLength);
      }

      setMarkedDates(newMarkedDates);
    }
  }, [cycleData, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // Format the selected date as "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];
    setCycleData({ ...cycleData, start: formattedDate });
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Calendar
            markedDates={markedDates}
            theme={{
              calendarBackground: "#ffffff",
            }}
          />
          <View className="flex flex-row flex-wrap gap-2 items-center justify-center mb-4 pb-2">
            <View className="flex flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-[#0c61e2]"></View>
              <Text
                className="font-normalFont text-xs"
                style={{
                  color: "black",
                }}
              >
                Ovulation window
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-[#7b091c]"></View>
              <Text
                className="font-normalFont text-xs"
                style={{
                  color: "black",
                }}
              >
                Period window
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-[#00008b]"></View>
              <Text
                className="font-normalFont text-xs"
                style={{
                  color: "black",
                }}
              >
                Approximate Ovulation date
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-blue-600 px-10 py-2"
            onPress={handleEditClick}
          >
            <Text className="font-normalFont text-sm text-center text-white">
              Edit Dates
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.formContainer}>
          <Text className="font-mediumFont text-xs pb-1">
            Start of Previous Period:
          </Text>
          <TextInput
            className="font-normalFont text-xs rounded-lg"
            style={styles.input}
            value={cycleData.start}
            onFocus={showDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
          <Text className="font-mediumFont text-xs pb-1">
            End of Last Period:
          </Text>
          <TextInput
            className="font-normalFont text-xs rounded-lg"
            style={styles.input}
            keyboardType="numeric"
            value={cycleData.end}
            onChangeText={(text) => setCycleData({ ...cycleData, end: text })}
          />
          <Text className="font-mediumFont text-xs pb-1">Length of Cycle:</Text>
          <TextInput
            className="font-normalFont text-xs rounded-lg"
            style={styles.input}
            keyboardType="numeric"
            value={cycleData.length}
            onChangeText={(text) =>
              setCycleData({ ...cycleData, length: text })
            }
          />
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleSaveClick}
              className="rounded-lg bg-blue-600"
            >
              <Text className="font-normalFont text-xs text-white px-5 py-3">
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg bg-[#7b091c]"
              onPress={() => {
                setIsEditing(false);
              }}
            >
              <Text className="font-normalFont text-xs text-white px-5 py-3">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default CustomCalendar;
