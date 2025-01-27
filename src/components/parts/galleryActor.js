import React from 'react';
import axios from "axios";
import '../componentCSS/gallery.css'

export default class GalleryHome extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                // nick: window.sessionStorage.getItem('nick'),
                nick: this.props.nick,
                showMenu: false,
                arr: [],
                file: '',
                imgUrl: ''
            }

        console.log("gsllery log" + this.props.nick)

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.imgs = this.imgs.bind(this);
        this.imgs();
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

    imgs() {
        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/getActorPhotos',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({arr: res.data});
                this.setState({showG: true});
                return true;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    createTable(arr1) {
        let table = [];
        let length = arr1.length;
        console.log(length);
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        }else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <div id="photoGallery">
                        <img style={{
                            borderRadius: '10px',
                            maxWidth: '350px'
                        }} src={arr1[i].photo}/>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }

    _handleSubmit(e) {
        e.preventDefault();

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);
        params.append('imgUrl', this.state.imgUrl);
        axios.post('http://localhost:8080/gleryImgLoad', params,{withCredentials:true}).then(
            response => {
                if (response.status === 200) {
                    window.location.reload(true);
                }
            }
        ).catch(err => {
            return false;
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imgUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        return (<div>
                <a onClick={this.showMenu}>галерея</a>
                {
                    this.state.showMenu && this.state.arr !== null && this.state.arr !== undefined
                        ? (
                            <div
                                id="galleryComponent"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>
                                <p>Галерея</p>

                                <div>
                                    <form  onSubmit={(e) => this._handleSubmit(e)}>
                                        <input className="fileInput"
                                               type="file"
                                               onChange={(e) => this._handleImageChange(e)}
                                        />
                                        <button type="submit">Upload
                                        </button>
                                    </form>
                                </div>

                                {this.createTable(this.state.arr)}


                            </div>
                        )
                        : (
                            <div>
                                <div >
                                    <form  onSubmit={(e) => this._handleSubmit(e)}>
                                           <input type="file" name="file" id="file" className="inputfile"
                                               onChange={(e) => this._handleImageChange(e)}
                                        />
                                        <label htmlFor="file">Photo</label>

                                        <button type="submit" style={{
                                            width: '70px',
                                            height: '25px',
                                            color: 'white',
                                            background: 'black',
                                            border: 'none'
                                        }}>Загрузить
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                }


            </div>
        );
    }
}
