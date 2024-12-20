"use client";

import { useState } from "react";
import { SubmitButton } from "./submit-button";

interface SubmitItemProps {
  labelValue: string;
  endpoint: string;
}

export default function SubmitItem({ labelValue, endpoint }: SubmitItemProps) {
  const [submitValue, setSubmitValue] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitItem = async () => {
    setIsSuccess(false);
    setIsError(false);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: submitValue }),
      });

      if (!response.ok) {
        setIsError(true); 
        setErrorMessage("There was an issue adding your exercise");
      }

      if (response.status === 409) {
        setIsError(true);
        setErrorMessage("Item already exists");
      } else {
        setIsError(false);
        setIsSuccess(true);
        setSubmitValue('');
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-start">
          <label
            htmlFor="inputValue"
            className="block text-md font-medium text-white"
          >
            {labelValue}
          </label>
        </div>
        <input
          type="text"
          name="inputValue"
          id="inputValue"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-1"
          value={submitValue}
          onChange={(e) => setSubmitValue(e.target.value)}
          required
        />
        <div className="flex">
          <SubmitButton className="mt-2 py-2" onClick={onSubmitItem}>
            Submit
          </SubmitButton>
        </div>
        <div className="mt-2">
        {isError && <span>{errorMessage}</span>}
        {isSuccess && <span>Successfully added!</span>}
        </div>
        
      </div>
    </div>
  );
}
