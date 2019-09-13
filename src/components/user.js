import React, {Component} from 'react';
import axios from "axios";
import sub from "./pictures/sub.PNG"
import seen from "./pictures/seen.PNG"
import chats from "./pictures/chats.PNG"
import but from "./pictures/settings.PNG"
import {setData} from "../_actions/setData";
import {setUnAuth} from "../_actions/login";
import {connect} from "react-redux";
import "./componentCSS/user.css"
import Set from './parts/settings'
import ImageUpload from './parts/image'
import Subscribe from './parts/subscribe'

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showMenu: false,
                showSub: false,
                showChat: false,
                arr: [],
                subscribe: [],
                chats: []
            };

        this.testSession = this.testSession.bind(this);
        this.testSession();


        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.logout = this.logout.bind(this);


        this.showChat = this.showChat.bind(this);
        this.closeChat = this.closeChat.bind(this);

    }

    testSession() {

        axios({
            method: 'get',
            url: 'http://localhost:8080/get',
            withCredentials: true
        }).then((res) => {
                if (res.status === 200) {
                    console.log("вот пришл");
                    this.setState({arr: res.data});
                    console.log(this.state.arr.name)
                }
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {

            }
        });



        axios({
            method: 'get',
            url: 'http://localhost:8080/chats',
            withCredentials: true
        }).then((res) => {
                if (res.status === 200) {
                    console.log("вот пришл");
                    this.setState({chats: res.data});
                    console.log(this.state.chats)
                }
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {

            }
        });

    };

    logout() {
        axios.post('http://localhost:8080/logout', {});
        //this.props.history.push();
        window.location.href = '/';

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});

    }


    showChat(event) {
        event.preventDefault();
        this.setState({showChat: true}, () => {
            document.addEventListener('click', this.closeChat);
        });
    }

    closeChat(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({showChat: false}, () => {
                document.removeEventListener('click', this.closeChat);
            });
        }
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }


    render() {

        return (
            <div className="user">

                <div className="pec">
                    <img className="ico" src={this.state.arr.profileImageUrl}/>
                    <p>{this.state.arr.name}</p>
                </div>

                <div className="buttons">
                    <button onClick={this.logout} style={{
                        width: '100px',
                        height: '36px',
                        background: 'black',
                        border: '1px solid white',
                        color: 'white'
                    }}>Logout
                    </button>
                    <button onClick={this.showMenu}
                            style={{width: '40px', height: '34px', background: 'black', border: '1px solid black'}}>
                        <img src={but} width='13' height='13'/></button>
                </div>
                <div className="setBut">

                    {
                        this.state.showMenu
                            ? (
                                <div
                                    className="menu"
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                >
                                    <Set/>
                                    <ImageUpload/>

                                </div>
                            )
                            : (
                                <div className="void">
                                </div>
                            )
                    }
                </div>

                <Subscribe arr={this.state.subscribe}/>


                <div className="chat">
                    чат
                </div>

                <div className="systemInfo">
                    <p>контакты системы:
                        moviesMT11@gmail.com</p>
                </div>
            </div>
        );

    }
}


export default (User);