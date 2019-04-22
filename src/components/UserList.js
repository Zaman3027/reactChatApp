import React from 'react'

export default function UserList(props) {
    var { index, photoUrl, name, removeUser } = props;
    return (
        <div style={{ border: "1px solid black", margin: 10 }}>
            <div>
                <h1>{name}</h1>
                <img src={photoUrl} alt={index} style={{ width: 40, height: 40 }} />
            </div>
            <button onClick={removeUser}>Remove User</button>
        </div>
    )
}
