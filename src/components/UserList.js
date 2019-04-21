import React from 'react'

export default function UserList(props) {
    var { index, email, photoUrl, name, removeUser } = props;
    return (
        <div style={{ border: "2px solid black", margin: 20 }}>
            <div>
                <h1>{name}</h1>
                <h2>{email}</h2>
                <img src={photoUrl} alt={index} style={{ width: 100, height: 100 }} />
            </div>
            <button onClick={removeUser}>Remove User</button>
        </div>
    )
}
