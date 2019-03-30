import React, { Component, Fragment } from 'react';
import './App.css';
import {Container} from "reactstrap";
import {Switch, Route} from 'react-router-dom';

import Toolbar from "./components/UI/Toolbar/Toolbar";
import AddNews from "./containers/AddNews/AddNews";
import News from "./containers/News/News";
import NewsData from "./components/NewsData/NewsData"

class App extends Component {
    render() {
        return (
            <Fragment>
                <header><Toolbar/></header>
                <Container style={{marginTop: '20px', textAlign: "center"}}>
                    <Switch>
                        <Route path="/" exact component={News}/>
                        <Route path="/news" exact component={News}/>
                        <Route path="/news/new" component={AddNews}/>
                        <Route path="/news/:id" exact component={NewsData}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;
