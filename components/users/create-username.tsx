'use client'
import { useState } from 'react';

interface CreateUsernameProps {
  UserId: string;
}

export default function CreateUsername({ UserId }: CreateUsernameProps) {
    const [userName, setUsername] = useState('');

    const handleSubmit = async () => {    
        try {
            const response = await fetch('/api/username', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: UserId,
                    DisplayName: userName
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

    return(
        <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text"
             name="username" 
             id="username" 
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
             value={userName}
             onChange={(e) => setUsername(e.target.value)}
             required />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
        </form>
        </div>
    );
}