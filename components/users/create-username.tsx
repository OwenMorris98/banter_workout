'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
interface CreateUsernameProps {
  UserId: string;
}

export default function CreateUsername({ UserId }: CreateUsernameProps) {
    const router = useRouter();
    const [userName, setUsername] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

    const handleSubmit = async () => {    
        try {
            const response = await fetch('/api/users', {
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
                throw new Error('Failed to save username');
            }

            if(response.ok) {
                console.log('response.ok')
                setUpdateSuccess(true);
                router.push('/workouts');
                // Ensure the form is not shown again after successful submission
                return;
            }
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };

    return(
        <div>
            {!updateSuccess && 
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
} {updateSuccess && 
        <p>Username has been updated!</p>
}
        </div>
    );
}