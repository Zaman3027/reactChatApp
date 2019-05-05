import React, { Component } from 'react';
import fire from '../config/Fire'
import UserList from './UserList'
import firebase from 'firebase/app'
import '../Css/Home.css'
import ChatScreen from './ChatScreen'


class PlayerComp extends Component {
    handelSignOut = () => {
        fire.auth().signOut();
    }
    state = {
        User: [],
        chatShow: '',
        userData: null,
        currentUser: null,
    }
    
    getUserData = async () => {
        await fire.auth().onAuthStateChanged((user)=>{
            this.setState({currentUser:user});
        })
        await fire.firestore().collection("User").onSnapshot(() => {
            this.setState({ User: [] });
            fire.firestore().collection("User").orderBy("timeStamp", "asc").get().then(doc => {
                this.setState({ User: [] });
                doc.forEach(data => {
                    this.setState({ User: [...this.state.User, data.data()] })
                })
            })
        })
    }

    handelChatScreen = async (data) => {
        await this.setState({ chatShow: data });
        console.log("uid", this.state.chatShow);
        fire.firestore().collection("User").doc(data).get().then((value) => {
            this.setState({ userData: value.data() });
        })
    }

    getRandomUser = () => {
        fetch("https://randomuser.me/api/").then((value) => {
            value.json().then((data) => {
                var results = data.results;
                results.forEach(doc => {
                    fire.firestore().collection("User").doc(doc.login.uuid).set(
                        {
                            displayName: doc.name.first,
                            email: doc.email,
                            photoUrl: doc.picture.large,
                            uid: doc.login.uuid,
                            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                        }
                    )
                })
            })
        })
    }

    handelRemoveUser = (UUID) => {
        fire.firestore().collection("User").doc(UUID).delete();
    }

    componentDidMount() {
        this.getUserData()
    }
    render() {

        return (
            <div className="mainApp">
                <div className="header" >
                    <nav style={{ height: 60 }}>
                        <button onClick={this.handelSignOut}>Logout</button>
                    </nav>
                </div>
                <div className="userList">
                    {this.state.User.length === 0 ? <p>Loading...</p> : <div>{this.state.User.map((value, index) => (
                        <UserList
                            uid={value.uid}
                            handelChatScreen={this.handelChatScreen}
                            key={index}
                            index={index}
                            photoUrl={value.photoUrl}
                            name={value.displayName}
                            removeUser={() => this.handelRemoveUser(value.uid)}
                        />
                    ))}</div>}
                    <button onClick={this.getRandomUser}>Add User</button>
                </div>
                <div className="chatScreen">
                    {this.state.userData == null? (<p>Null</p>) : (<ChatScreen
                        name={this.state.userData.displayName}
                    />)}
                </div>
                <div className="firendRequest">
                    <p>Friend Request</p>
                </div>
                <div className="footer">
                    <p>Footer</p>
                </div>
            </div>
        );
    }
}

export default PlayerComp;