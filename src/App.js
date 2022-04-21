import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from '../src/features/home/Home/Home';
import Search from '../src/features/home/Search/Search';
import Template from '../src/features/home/Template';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../src/App.css';
import '../src/css/bootstrap-grid.css';
import '../src/css/animate.css';

import './data'
import Login from '../src/features/auth/Login';
import recommendMovie from './features/home/Recommend/recommendMovie';

const darkTheme = getMuiTheme(darkBaseTheme)

const defautTheme = getMuiTheme(lightBaseTheme)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: defautTheme
    }
    window.theme = 0;
    window.toggleTheme = () => {
      if(window.theme===0) {
        this.setState({theme: darkTheme})
        document.body.style.backgroundColor = "darkgray"
        window.theme=1;
      } else {
        this.setState({theme: defautTheme})
        document.body.style.backgroundColor = "aliceblue"
        window.theme=0;
      }
    };
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={this.state.theme}>
        <div className="content-wrapper">
          <Route exact path="/" component={Login}/>
          <Route exact path="/welcome" component={Home}/>
          <Route exact path="/notifications" component={Template}/>
          <Route exact path="/messages" component={Template}/>
          <Route exact path="/recommend" component={recommendMovie}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/search/:query" component={Search}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
