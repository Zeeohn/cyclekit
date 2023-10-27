import { View, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];

    let count = 0;

    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);

    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep?.map((step, index) => {
    return (
      <View
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex-row flex items-center"
            : "flex items-center"
        }
      >
        <View className="relative flex flex-col items-center">
          <View
            className={`rounded-full transition duration-500 ease-in-out border-2 border-black h-8 w-8 flex items-center justify-center ${
              step.selected ? "bg-[#7b091c]" : ""
            }`}
          >
            <Text
              className={`font-mediumFont text-black ${
                step.selected ? "text-white" : ""
              }`}
            >
              {index + 1}
            </Text>
          </View>
          <View className="absolute top-0 mt-8 w-32">
            <Text
              className={`text-center text-xs font-boldFont uppercase ${
                step.highlighted ? "text-[#7b091c]" : "text-black"
              }`}
            >
              {step.description}
            </Text>
          </View>
        </View>
        <View
          className={`flex-auto border-black border-t-4 transition duration-500 ease-in-out ${
            step.completed ? "border-[#7b091c]" : ""
          }`}
        ></View>
      </View>
    );
  });

  return (
    <View className="mx-1 mb-4 flex w-[22%] justify-between items-center flex-row">
      {displaySteps}
    </View>
  );
};

export default Stepper;
