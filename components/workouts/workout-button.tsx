'use client'

interface WorkoutButtonProps {
  buttonName: string;
  href : string;
}

export default function WorkoutButton({ buttonName, href } : WorkoutButtonProps) {
  return ( 
    <button 
      className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white 
      font-semibold py-3 px-6 border-2 border-black 
      rounded-lg shadow-lg transition duration-200">
        <a href={href}>{buttonName}</a>
    </button>
  );
}