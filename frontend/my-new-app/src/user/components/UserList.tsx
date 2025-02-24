import React from "react";
import UserItem from "./UserItem";

interface User {
  id: string;
  name: string;
  image?: string;
  places: number;
}

interface Props {
  users: User[];
}

const UserList = (props: Props) => {
  if (props.users.length === 0) return <div>No User found!!</div>;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/2">
      <ul className="flex flex-col space-y-2">
        {props.users.map((user, i) => (
          <UserItem
            key={i}
            id={user.id}
            name={user.name}
            image={user.image}
            placeCount={user.places}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
