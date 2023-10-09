import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
// get a reference to the currently signed-in user
import { useSession } from 'next-auth/react';

function UserProfile() {
  // State to track whether options should be displayed or not
  const [showOptions, setShowOptions] = useState(false);

  // Get the currently signed-in user
  const { data: session } = useSession();


  // Function to toggle the display of options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    
    <div className="userProfile">
      <div className="profileImage" onClick={toggleOptions}>
        <img
          className="imageUser"
          src={session?.user?.image}
          alt="User Profile"
        />
      </div>
      <div className={`options ${showOptions ? 'show' : ''}`}>
        <button className="subscribeButton">Subscribe</button>
        <button className="signOutButton" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
