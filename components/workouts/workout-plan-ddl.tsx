"use client";
interface WorkoutPlanDDLProps {
  WorkoutNames: string[];
}
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function WorkoutPlanDDL({ WorkoutNames }: WorkoutPlanDDLProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<string>(
    "Select Workout Plan"
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSelectedWorkout(query);
    }
  }, [searchParams]);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
      console.log("params.set(query, workout)");
    } else {
      params.delete("query");
      console.log("params.delete");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    console.log("Term: ", selectedWorkout);
    if (selectedWorkout != "Select Workout Plan") {
      handleSearch(selectedWorkout);
    }
  }, [selectedWorkout]);

  return (
    <div className="p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="bg-gray-800 text-white px-4 py-2 rounded w-full">
            {selectedWorkout}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {WorkoutNames?.map((workout, idx) => (
            <DropdownMenuItem
              key={idx}
              onSelect={() => setSelectedWorkout(workout)}
              defaultValue={searchParams.get("query")?.toString()}
            >
              {workout}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
