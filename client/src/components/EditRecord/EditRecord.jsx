import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './EditRecord.scss'

export default class EditRecord extends Component {

    constructor(props) {
        super(props);

        this.updateFirstname = this.updateFirstname.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.updateBdate = this.updateBdate.bind(this);
        this.updateGender = this.updateGender.bind(this);
        this.updateRecordfor = this.updateRecordfor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.apiURI = process.env.REACT_APP_API_URI || 'http://localhost:8080'


        this.state = {
            user_firstname: "",
            user_lastname: "",
            user_birthdate: "",
            user_gender: "",
            user_recordfor: "",
            token: localStorage.getItem("token")
        }
    }

    componentDidMount() {
        axios.get(`${this.apiURI}/records/` + this.props.match.params.id, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(response => {
                this.setState({
                    user_firstname: response.data.user_firstname,
                    user_lastname: response.data.user_lastname,
                    user_birthdate: new Date(response.data.user_birthdate).toISOString().split('T')[0],
                    user_gender: response.data.user_gender,
                    user_recordfor: response.data.user_recordfor,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    updateFirstname(e) { this.setState({ user_firstname: e.target.value }) };
    updateLastname(e) { this.setState({ user_lastname: e.target.value }) };
    updateBdate(e) { this.setState({ user_birthdate: e.target.value }) };
    updateGender(e) { this.setState({ user_gender: e.target.value }) };
    updateRecordfor(e) { this.setState({ user_recordfor: e.target.value }) };

    onDelete() {
        axios.delete(`${this.apiURI}/records/` + this.props.match.params.id, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then((res) => {
                window.alert('Record deleted!');
            });

        this.props.history.push("/");
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_firstname: this.state.user_firstname,
            user_lastname: this.state.user_lastname,
            user_birthdate: this.state.user_birthdate,
            user_gender: this.state.user_gender,
            user_recordfor: this.state.user_recordfor,
        };
        axios.put(`${this.apiURI}/records/` + this.props.match.params.id, obj, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(res => {
                window.alert('Record updated!');
            });

        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Header />
                <h3 align="center">Update Record</h3>
                <form className="w-100 p-3" id="update-familyRec" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.user_firstname}
                            onChange={this.updateFirstname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.user_lastname}
                            onChange={this.updateLastname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birthdate: </label>
                        <input
                            type="date"
                            className="form-control"
                            value={this.state.user_birthdate}
                            onChange={this.updateBdate}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genderOptions"
                                id="genderMale"
                                value="Male"
                                checked={this.state.user_gender === "Male"}
                                onChange={this.updateGender}
                            />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genderOptions"
                                id="genderFemale"
                                value="Female"
                                checked={this.state.user_gender === "Female"}
                                onChange={this.updateGender}
                            />
                            <label className="form-check-label">Female</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recordForOptions"
                                id="forSelf"
                                value="Self"
                                checked={this.state.user_recordfor === "Self"}
                                onChange={this.updateRecordfor}
                            />
                            <label className="form-check-label">Self</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recordForOptions"
                                id="forSpouse"
                                value="Spouse"
                                checked={this.state.user_recordfor === "Spouse"}
                                onChange={this.updateRecordfor}
                            />
                            <label className="form-check-label">Spouse</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recordForOptions"
                                id="forChild"
                                value="Child"
                                checked={this.state.user_recordfor === "Child"}
                                onChange={this.updateRecordfor}
                            />
                            <label className="form-check-label">Child</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="recordForOptions"
                                id="forOther"
                                value="Other"
                                checked={this.state.user_recordfor === "Other"}
                                onChange={this.updateRecordfor}
                            />
                            <label className="form-check-label">Other</label>
                        </div>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Record" className="btn btn-primary" />
                    </div>
                    <div className="form-group">
                        <button onClick={this.onDelete} className="btn btn-danger">Delete Record</button>
                    </div>
                </form>
            </div>
        )
    }
}