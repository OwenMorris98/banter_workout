'use client'
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(5); // Set initial countdown time in seconds

    useEffect(() => {
        if (timeLeft <= 0) {
            // Redirect or perform any action when countdown reaches zero
            redirect("/workouts");
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId); // Cleanup the timer on component unmount
    }, [timeLeft]);

    return (
        <div>
            <h1>You will be redirected in: {timeLeft} seconds</h1>
        </div>
    );
}