// components/FriendList.js
import React, { useState } from "react";

function FriendList({ friends, addFriend }) {
  const [newFriend, setNewFriend] = useState("");

  const handleAddFriend = () => {
    if (newFriend !== "") {
      addFriend(newFriend);
      setNewFriend("");
    }
  };

  return (
    <div className="friend-list">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Add new friend"
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>
    </div>
  );
}

export default FriendList;
