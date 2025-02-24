import React from "react";
import UserList from "../components/UserList";
import { useDummyData } from "../../shared/hook/useDummyData";

const User = () => {
  const { dummyData } = useDummyData();

  const userData = [
    { id: "us1", name: "Mikha Lim", image: "" },
    { id: "us2", name: "Laurence Angelo Gamilla", image: "" },
  ];

  // Map users and calculate places correctly
  const users = userData.map((user) => ({
    ...user,
    places: dummyData.filter((place) => place.creatorID === user.id).length,
  }));

  return <UserList users={users} />;
};

export default User;
