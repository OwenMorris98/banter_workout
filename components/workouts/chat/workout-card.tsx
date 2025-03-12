import { Input } from '../../ui/input';

interface Exercise {
  name: string;
  type: "compound" | "isolation";
  sets: number;
  repetitions: number;
  description: string;
}

interface ExerciseInputProps {
  exercise: Exercise;
  onExerciseChange: (updatedExercise: Exercise) => void;
}

export function ExerciseInput({ exercise, onExerciseChange }: ExerciseInputProps) {


  return (
    <div className="border rounded p-3 mb-3">
      <div className="mb-2">
        <label className="w-full" >{exercise.name} </label>
      </div>
      <div className="mb-2 flex">
        <span className="block text-sm font-medium mb-1">Sets: {exercise.sets.toString()}</span>
        <span className="block text-sm font-medium mb-1 ml-1">X {exercise.repetitions.toString()} Reps</span>
      </div>
    </div>

  );
}
