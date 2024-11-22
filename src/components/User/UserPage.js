import React from 'react';
import useAuth from "../../hooks/useAuth";

function UserPage() {
    const {auth} = useAuth();
    const user = {...auth};
    console.log(user.fname)
    console.log(auth)
    return (
        <div>
            <h2>{user.firstName}</h2>
            <div className="profile-image">
                <img src={user.profileImage}
                     alt={user.firstName + "" + user.lastName + "image"}
                />
            </div>

        </div>
    );
}

export default UserPage;