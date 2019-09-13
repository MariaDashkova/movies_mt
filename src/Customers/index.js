import React, {Component} from 'react';
import axios from "axios";

import User from "../components/user";
import "./customer.css"
import Select from 'react-select';
import UsActor from "./actor/usActor";
import UsAnalyst from "./analyst/usAnalyst";
import UsStudio from "./studio/UsStudio";


export default class Customer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 'комедия',
            role: '',
            genres: [],
            newFilms: []
        };

        this.testSession = this.testSession.bind(this);
        this.testSession();

    }

    handleChangeX = (selectedOption) => {
        this.setState({x: selectedOption.value});
    };

    updateData = (value) => {
        this.setState({name: value})
    }

    testSession() {
        axios.get('http://localhost:8080/role', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({role: res.data});
                    console.log(this.state.role);
                    this.props.setAuthorised();
                    return true;
                }
            }).catch(err => {
            return false;
        });

        axios.get('http://localhost:8080/genres', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({genres: res.data});
                    console.log(this.state.genres);
                    return true;
                }
            }).catch(err => {
            return false;
        });

    }

    // //TODO: скинь меня Тане
    // getFilmsWithChoosenGenre() {
    //     let params = new URLSearchParams();
    //     params.append('genre', this.state.x);
    //     axios.get('http://localhost:8080/getGenreFilms', {
    //         params,
    //         withCredentials: true})
    //         .then(res => {
    //             if (res.status !== 401) {
    //                 console.log("Фильмы с выбранным жанром");
    //                 console.log(res.data);
    //                 // this.setState({arrayOfFilms: res.data});
    //                 return true;
    //             }
    //         }).catch(err => {
    //         return false;
    //     });
    // }
    //
    // //TODO: скинь меня Тане
    // getNewFilms() {
    //     axios.get('http://localhost:8080/getNew', {
    //         withCredentials: true})
    //         .then(res => {
    //             if (res.status !== 401) {
    //                 console.log("Новые фильмы");
    //                 console.log(res.data);
    //                 // this.setState({arrayOfFilms: res.data});
    //                 return true;
    //             }
    //         }).catch(err => {
    //         return false;
    //     });
    // }
    //
    // // TODO: скинь меня Тане
    // getPopularFilms() {
    //     axios.get('http://localhost:8080/getPopularFilms', {
    //         withCredentials: true})
    //         .then(res => {
    //             if (res.status !== 401) {
    //                 console.log("Популярные фильмы:");
    //                 console.log(res.data);
    //                 // this.setState({arrayOfFilms: res.data});
    //                 return true;
    //             }
    //         }).catch(err => {
    //         return false;
    //     });
    // }

    chooseComponent(x) {
        let component = [];
        switch (x) {
            case 0:
                component.push(
                    <User history={this.history}/>
                );
                break;

            case 1:
                component.push(<UsActor history={this.history}/>);
                break;
            case 2:
                component.push(<UsAnalyst history={this.history}/>);
                break;
            case 3:
                console.log(window.sessionStorage.getItem('nick'));
                component.push(<UsStudio history={this.history}/>);
                break;

            default:
                // this.props.history.push('/');
                break;
        }

        return component
    }


    //TODO открывать страницу редактирования как форму регистрации/логина как в лабе игоряКирила

    render() {
        const selectX = this.state.genres.map(g => ({
            value: g.name,
            label: g.name

        }));
        return (
            <div className="frame">
                <div className="bar">
                    <button>Новое</button>
                    <button>Рекомендуем</button>
                    <button>Популярное</button>
                </div>
                <div className="select">
                    {/*{//TODO/*тут добавить onchange*!/*/}
                    <Select className="genre" placeholder={'Жанр'}
                            onChange={this.handleChangeX}
                            options={selectX}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'dimgrey',
                                    // primary: 'black',
                                    neutral0: 'black',
                                    neutral20: 'white',
                                    neutral50: 'white',
                                    neutral80: 'white',
                                },
                            })}
                            value={this.state}
                    /></div>

                {/*<div>*/}
                {/*<p>State: {this.state.name}</p>*/}
                {/*<Actor updateData={this.updateData} />*/}
                {/*</div>*/}



                {this.chooseComponent(this.state.role)}


            </div>


        );
    }
}