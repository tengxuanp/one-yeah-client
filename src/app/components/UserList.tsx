'use client'

const UserList = ({userlist}) => {

  return (
    <div>
      <h2>User List</h2>
      <ul>
      {userlist.map(x=><li>{x}</li>)}
      </ul>
    </div>
  );
};

export default UserList;
