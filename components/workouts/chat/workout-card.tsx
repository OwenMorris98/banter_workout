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
        <label className="block text-sm font-medium mb-1">Exercise Name:</label>
        <Input 
          value={exercise.name} 
          onChange={(e) => {
            onExerciseChange({
              ...exercise,
              name: e.target.value
            });
          }}
          className="w-full"
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Type:</label>
        <input 
          value={exercise.type}
          className="w-full p-2 border rounded"
          readOnly
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Sets:</label>
        <Input 
          type="number"
          value={exercise.sets.toString()} 
          onChange={(e) => {
            onExerciseChange({
              ...exercise,
              sets: parseInt(e.target.value) || 0
            });
          }}
          className="w-full"
        />
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Repetitions:</label>
        <Input 
          type="number"
          value={exercise.repetitions.toString()} 
          onChange={(e) => {
            onExerciseChange({
              ...exercise,
              repetitions: parseInt(e.target.value) || 0
            });
          }}
          className="w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Description:</label>
        <p>{exercise.description}</p>
      </div>
    </div>
  );
}