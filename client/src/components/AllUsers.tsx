import React from "react";

type User = {
  name: String;
  email: String;
};

type AllUsersProps = {
  users: User[];
};

function AllUsers({ users }: AllUsersProps) {
  return (
    <>
      {users.map((user: User) => (
        <div>
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
        </div>
      ))}
    </>
  );
}

export default AllUsers;
