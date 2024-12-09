'use client'
import { useState, useEffect } from 'react';
import { IWorkoutList } from "@/lib/workoutInterfaces/IWorkoutList";
import { SubmitButton } from '../submit-button';

export default function WorkoutList({ workouts }: IWorkoutList) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mounted, setMounted] = useState(false);
    const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([]);

    // Wait for client-side hydration to complete
    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter workouts based on search term
    const filteredWorkouts = workouts?.filter((workout) =>
        workout.Name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedWorkouts.some(selected => selected.Id === workout.Id)
    );



    // Add workout to selected list
    const handleWorkoutSelect = (workout: any) => {
        setSelectedWorkouts([...selectedWorkouts, workout]);
        
    };

    const handleWorkoutDeselect = (workout: any) => {
        setSelectedWorkouts(selectedWorkouts.filter(selected => selected.Id !== workout.Id));
    };

    // Don't render until client-side hydration is complete
    if (!mounted) {
        return (
            <span>Loading...</span>
        );
    }

    const saveWorkout = async () => {
        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workouts: selectedWorkouts
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save workout');
            }

            const data = await response.json();
            // Handle successful save (e.g., show success message)
            
        } catch (error) {
            console.error('Error saving workout:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <div className='flex flex-row'>
            {/* Search side*/}
            <div className='basis-1/2'>
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
            </div>

            {/* Workout List */}
            <ol className='max-h-[400px] overflow-y-auto'>
                {filteredWorkouts?.map((workout) => (
                    
                    <li key={workout.Id}
                    className='my-2 p-2 hover:bg-black cursor-pointer rounded'
                    onClick={() => handleWorkoutSelect(workout)}
                    >
                        {workout.Name}
                    
                    </li>
                ))}
            </ol>
            </div>

            {/* My Workout */}
            <div className='basis-1/2 ml-12' id='my-workout'>
                    <h2 className='text-xl font-semibold mb-4'>My Workout</h2>
                    <div className='border-2 border-gray-300 rounded-lg p-4 h-[400px] overflow-y-auto bg-gray shadow-sm p-2 border rounded-md w-full'>
                    {selectedWorkouts.length === 0 ? (
                            <p className='text-gray-500 text-center mt-12'>
                                Select exercises to add to your workout
                            </p>
                        ) : (
                            <ol>
                                {selectedWorkouts.map((workout) => (
                                    <li key={workout.Id} className='my-2 bg-gray hover:bg-black cursor-pointer rounded'
                                    onClick={() => handleWorkoutDeselect(workout)}>
                                        {workout.Name}
                                    </li>
                                ))}
                            </ol>
                        )}
                        
                    </div>
                </div>
            </div>
            <SubmitButton  onClick={saveWorkout}>Submit</SubmitButton>
        </div>
    );
}
