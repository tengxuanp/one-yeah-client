'use client'

const UserList = ({userlist}) => {

  return (
    <div className="max-w-lg m-2 p-2 border-black border-2 border-b-4 border-r-4 bg-[#f0f0f0c9]">
      <h2>User List</h2>
      <ul className="list-disc list-inside">
      {userlist.map((x,index)=><li key={index}>{x}</li>)}
      </ul>
    </div>
  );
};

export default UserList;
