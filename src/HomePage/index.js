import React from 'react';
import axios from "axios";

export default class HomePageActor extends React.Component{
    constructor(props) {
        super(props);

        this.state =
            {
                showG: false,
                showMenu: false,
                arr1: [],
                posts: [],
                score: '',
                fllwrs: ''
            };

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.imgs = this.imgs.bind(this);
        this.imgs();

}

    testSession() {

        axios.get('http://localhost:8080/get', {})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({arr1: res.data});
                    console.log("картинка" + this.state.arr1);

                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
        });

        axios.get('http://localhost:8080/actorFollCount', {})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({fllwrs: res.data});

                }

            }).catch(err => {
            console.log('ошибка в вас');
        });

        axios.get('http://localhost:8080/actorScore', {})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({score: res.data});
                    return true;
                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
            return false;
        });
    }

    imgs() {
        axios.get('http://localhost:8080/getActorPhotos', {})
            .then(res => {
                if (res.status === 200) {
                    this.setState({followers: res.data});
                    this.setState({showG: true});

                    console.log("img are here" + this.state.followers);
                    return true;
                }
                else return false;
            }).catch()
    }

    posts(){
        axios.get('http://localhost:8080/actorPosts', {})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({posts: res.data});
                    return true;
                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
            return false;
        });

}
}