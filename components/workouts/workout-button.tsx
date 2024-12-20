'use client'

interface WorkoutButtonProps {
  buttonName: string;
  href : string;
}

import { useRouter } from "next/navigation";
export default function WorkoutButton({ buttonName, href} : WorkoutButtonProps) {
  const router = useRouter();
  const handleTouch = () => {
    router.push(href)
  }

  return ( 
    <button 
      className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white 
      font-semibold py-3 px-6 border-2 border-black 
      rounded-lg shadow-lg transition duration-200">
        <a href={href} onTouchStart={handleTouch}>{buttonName}</a>
    </button>
  );
}