'use client'

interface WorkoutSchemeProps {
    ExersiceNames: string[];
}
export default function WorkoutScheme({ ExersiceNames } : WorkoutSchemeProps) {
return (
  <ul>
    {ExersiceNames.map((exerciseName, index) => (
      <li key={index}>{exerciseName}</li>
    ))}
  </ul>
)
}