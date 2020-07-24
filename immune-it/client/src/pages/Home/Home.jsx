import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
// import Footer from '../../components/Footer/Footer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Knowledge from '../../components/Knowledge/Knowledge';
import Records from '../../components/Records/Records';
import About from '../../components/About/About';
import Login from '../../pages/Login/Login';
import Signup from '../../components/Signup/Signup';
import AddRecord from '../../components/AddRecord/AddRecord';
import EditRecord from '../../components/EditRecord/EditRecord';
import ImmunizationRecord from '../../components/ImmunizationRecord/ImmunizationRecord';

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path='/view/:id' component={ImmunizationRecord}/>
                        <Route path='/edit/:id' component={EditRecord} />
                        <Route path='/create' component={AddRecord} />
                        <Route path='/records' component={Records}/>
                        <Route path='/about' component={About}/>
                        <Route path='/knowledge' component={Knowledge}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/signup' component={Signup}/>
                        <Route exact path="/" component={Main}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Home