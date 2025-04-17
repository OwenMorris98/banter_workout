'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getSavedWorkouts, removeSavedWorkout } from '@/lib/storage/workout-storage'
import { WorkoutPlan } from '@/components/workouts/chat/chat-interfaces'

export function OfflineWorkouts({ onSelect }: { onSelect: (plan: WorkoutPlan) => void }) {
  const [savedWorkouts, setSavedWorkouts] = useState<Array<{plan: WorkoutPlan, savedAt: string, id: string}>>([])
  
  useEffect(() => {
    setSavedWorkouts(getSavedWorkouts())
  }, [])

  const handleRemove = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeSavedWorkout(id);
    setSavedWorkouts(getSavedWorkouts());
  };
  
  if (savedWorkouts.length === 0) {
    return <p className="text-sm text-gray-500">No saved workouts found.</p>
  }
  
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Saved Workouts</h3>
      <div className="space-y-2">
        {savedWorkouts.map((item) => (
          <div key={item.id} className="border rounded-md p-3">
            <p className="text-sm mb-1">
              Saved on {new Date(item.savedAt).toLocaleString()}
            </p>
            <p className="text-sm mb-2">
              {item.plan.schedule.length} day{item.plan.schedule.length !== 1 ? 's' : ''} plan
            </p>
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => onSelect(item.plan)}>
                Load this workout
              </Button>
              <Button size="sm" variant="destructive" onClick={(e) => handleRemove(item.id, e)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 