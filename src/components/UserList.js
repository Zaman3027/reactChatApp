import React from 'react'

export default function UserList(props) {
    var { index, photoUrl, name, removeUser, uid ,handelChatScreen} = props;
    return (
        <div className="card list-group-item"
            onClick={()=>handelChatScreen(uid)}
        >
            <div className="card-body">
                <h1>{name}</h1>
                <img src={photoUrl} alt={index} style={{ width: 40, height: 40 }} />
            </div>
            <button type="button" class="btn btn-outline-danger" onClick={removeUser}>Remove User</button>
        </div>
    )
}
