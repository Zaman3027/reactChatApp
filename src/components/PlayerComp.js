import React, { Component } from 'react';
import fire from '../config/Fire'
import UserList from './UserList'
import firebase from 'firebase'
import '../Css/Home.css'

console.log("uuu", fire.auth().currentUser);


class PlayerComp extends Component {
    handelSignOut = () => {
        fire.auth().signOut();
    }
    state = {
        User: []
    }
    getUserData = async () => {

        await fire.firestore().collection("User").onSnapshot((next) => {
            this.setState({ User: [] });
            fire.firestore().collection("User").orderBy("timeStamp", "asc").get().then(doc => {
                this.setState({ User: [] });
                doc.forEach(data => {
                    this.setState({ User: [...this.state.User, data.data()] })
                })
            })
        })

        /* .orderBy("timeStamp","desc").get().then(doc=>{
            this.setState({User:[]})
            doc.forEach(data=>{
                this.setState({User:[...this.state.User,data.data()]})
            })
        }) */

        /* .onSnapshot((next)=>{
            this.setState({User:[]})
            next.forEach(doc=>{
                this.setState({User:[...this.state.User,doc.data()]})
            })
        }) */

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
                    <p1>Chat Screen</p1>
                </div>
                <div className="firendRequest">
                    <p1>Friend Request</p1>
                </div>
                <div className="footer">
                    <p1>Footer</p1>
                </div>
            </div>
        );
    }
}

export default PlayerComp;