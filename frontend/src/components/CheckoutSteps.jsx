import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import {
  TruckIcon,
  CheckBadgeIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import {
  TruckIcon as TruckFilled,
  CheckBadgeIcon as CheckFilled,
  BanknotesIcon as BankFilled,
} from "@heroicons/react/24/solid";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: (
        <div
          className={
            activeStep === 0
              ? "font-serif text-xl md:text-2xl"
              : activeStep > 0
              ? "font-bold"
              : ""
          }
        >
          Address
        </div>
      ),

      icon:
        activeStep >= 0 ? (
          <TruckFilled class="h-6 w-6 text-black" />
        ) : (
          <TruckIcon class="h-6 w-6 text-gray-400" />
        ),
    },
    {
      label: (
        <div
          className={
            activeStep === 1
              ? "font-serif text-xl md:text-2xl"
              : activeStep > 1
              ? "font-bold"
              : ""
          }
        >
          Order Summary
        </div>
      ),
      icon:
        activeStep >= 1 ? (
          <CheckFilled class="h-6 w-6 text-black" />
        ) : (
          <CheckBadgeIcon class="h-6 w-6 text-gray-400" />
        ),
    },
    {
      label: (
        <div
          className={
            activeStep === 2
              ? "font-serif  text-xl md:text-2xl"
              : activeStep > 2
              ? "font-bold"
              : ""
          }
        >
          Payment
        </div>
      ),
      icon:
        activeStep >= 2 ? (
          <BankFilled class="h-6 w-6 text-black" />
        ) : (
          <BanknotesIcon class="h-6 w-6 text-gray-400" />
        ),
    },
  ];
  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel className="box-border">
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel icon={item.icon}>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
