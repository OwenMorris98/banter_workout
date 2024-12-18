'use client'

import { useRouter } from "next/navigation";
export default function EndWorkoutButton() {
    const router = useRouter();

  const handleClick = () => {
    if (confirm("Are you sure you want to end the workout?")) {
      router.push('/workouts');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md bg-red-800 hover:bg-gray-700 text-white 
            font-semibold py-2 px-24 border-2 border-black 
            rounded-lg shadow-lg duration-200 mt-4 transition"
    >
      End Workout
    </button>
  );
}