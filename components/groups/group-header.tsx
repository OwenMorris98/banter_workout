'use client'
import { useState } from "react";
import { Button } from "../ui/button";
import { SubmitButton } from "../submit-button";
import { useRouter } from "next/navigation";

export default function GroupHeader() {
  const [ isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const router = useRouter();

  const saveGroup = async () => {
  const requestBody = {
    Name : name,
    Description : description,
  };
  console.log(requestBody)
  try {
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to create group');
    }

    if (response.status === 201) {

      setIsCreateGroup(false);
      router.push('/groups')
    }
    
    
    // Optionally, you can add code to handle the response data or redirect the user
  } catch (error) {
    console.error('Error creating group:', error);
    // Optionally, you can add code to handle the error or display it to the user
  }
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Groups</h1>
        <Button variant={"outline"} onClick={(e) => setIsCreateGroup(!isCreateGroup)}>
          Create Group
        </Button>
      </div>
      <p>Find groups of people to workout with</p>
      <div>
        {isCreateGroup && 
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter group description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={saveGroup}>Submit</Button>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}
