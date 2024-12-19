interface Set {
    Reps: number;
    Weight: number;
}

interface WorkoutDetailProps {
    name: string;
    sets: Set[];
}

export default function DisplayExercise({name, sets} : WorkoutDetailProps) {
    return (
        <div className="border border-black py-2.5 px-12 my-2.5">
            <h3 className="mr-9">{name}</h3>
            <ul>
                {sets.map((set, idx) => (
                    <li key={idx} className="text-sm text-gray-600">Set: {idx + 1} Reps: {set.Reps}, Weight: {set.Weight}</li>
                ))}
            </ul>
        </div>
    );

}