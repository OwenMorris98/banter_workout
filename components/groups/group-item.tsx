import React from 'react';

interface GroupItemProps {
  group: {
    GroupsId: string;
    MembersId: string;
    Users: {
      Id: string;
      Username: string;
      Workouts: {
        Id: string;
        Name: string;
        Date: Date;
      }[];
    }[];
  };
}

const GroupItem= ({ group } : GroupItemProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg mb-4 bg-gray-800 text-white">
      <p className="text-xl font-bold">{group.GroupsId}</p>
      <p className="text-sm text-gray-400">{group.MembersId}</p>
      <div className="flex flex-col mt-4">
        {group.Users.map((user) => (
          <div key={user.Id} className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium">{user.Username}</p>
              <ul className="list-disc list-inside text-gray-300">
                {user.Workouts.map((workout) => (
                  <li key={workout.Id}>{workout.Name}</li>
                ))}
              </ul>
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                Join
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupItem;
