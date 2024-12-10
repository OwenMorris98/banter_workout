'use client'
import { useState, useEffect } from 'react';
import { IExerciseList } from '@/lib/excerciseInterfaces/IExerciseList';
import { SubmitButton } from '../submit-button';

export default function ExerciseList({ exercises }: IExerciseList) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mounted, setMounted] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState<any[]>([]);

    // Wait for client-side hydration to complete
    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter exercises based on search term
    const filteredExercises = exercises?.filter((exercise) =>
        exercise.Name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedExercises.some(selected => selected.Id === exercise.Id)
    );



    // Add exercise to selected list
    const handleExerciseSelect = (exercise: any) => {
        setSelectedExercises([...selectedExercises, exercise]);
        
    };

    const handleExerciseDeselect = (exercise: any) => {
        setSelectedExercises(selectedExercises.filter(selected => selected.Id !== exercise.Id));
    };

    // Don't render until client-side hydration is complete
    if (!mounted) {
        return (
            <span>Loading...</span>
        );
    }

    const saveExercise = async () => {
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exercises: selectedExercises
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save exercise');
            }

            const data = await response.json();
            // Handle successful save (e.g., show success message)
            
        } catch (error) {
            console.error('Error saving exercise:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div>
            <h1 className='mb-4'>Create a Workout</h1>
            <div className='flex flex-row lg:w-100'>
            {/* Search side*/}
            <div className='basis-1/2'>
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
            </div>

            {/* Exercise List */}
            <ol className='max-h-[400px] overflow-y-auto'>
                {filteredExercises?.map((exercise) => (
                    
                    <li key={exercise.Id}
                    className='my-2 p-2 hover:bg-black cursor-pointer rounded'
                    onClick={() => handleExerciseSelect(exercise)}
                    >
                        {exercise.Name}
                    
                    </li>
                ))}
            </ol>
            </div>

            {/* My Exercise */}
            <div className='basis-1/2 ml-12' id='my-exercise'>
                    <h2 className='text-xl font-semibold mb-4'>My Exercise</h2>
                    <div className='border-2 border-gray-300 rounded-lg p-4 h-[400px] overflow-y-auto bg-gray shadow-sm p-2 border rounded-md w-full'>
                    {selectedExercises.length === 0 ? (
                            <p className='text-gray-500 text-center mt-12'>
                                Select exercises to add to your exercise
                            </p>
                        ) : (
                            <ol>
                                {selectedExercises.map((exercise) => (
                                    <li key={exercise.Id} className='my-2 bg-gray hover:bg-black cursor-pointer rounded'
                                    onClick={() => handleExerciseDeselect(exercise)}>
                                        {exercise.Name}
                                    </li>
                                ))}
                            </ol>
                        )}
                        
                    </div>
                </div>
            </div>
            <SubmitButton className=''  onClick={saveExercise}>Submit</SubmitButton>
        </div>
    );
}
