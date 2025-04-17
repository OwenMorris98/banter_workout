import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="max-w-3xl  p-8 md:p-12 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Banter Workout
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your personal AI-powered workout companion for creating and tracking customized fitness plans
        </p>
        
        <Link href="/workouts" className="mb-10 inline-block">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg transition-all shadow-lg hover:shadow-xl">
            Get Started →
          </Button>
        </Link>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Created by Owen Morris
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built for fun as a side project, combining my passion for fitness and technology.
            <br />Utilizing React, Next.js, and AI to create personalized workout experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
