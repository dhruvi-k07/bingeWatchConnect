import React, { Component } from "react";

import muiThemeable from "material-ui/styles/muiThemeable";
import { Paper, FontIcon } from "material-ui";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";

import LoginForm from '../auth/login/LoginForm';
import RegisterForm from "../auth/signup/SignUp";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div className="section login">
        <div
          className="login-header"
          style={{ backgroundColor: this.props.muiTheme.appBar.color }}
        >
        </div>
        <div className="login-content container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <Paper>
                <Tabs
                  onChange={this.handleChange}
                  value={this.state.slideIndex}
                >
                  <Tab
                    icon={
                      <FontIcon className="material-icons">person</FontIcon>
                    }
                    label="Login"
                    value={0}
                  />
                  <Tab
                    icon={
                      <FontIcon className="material-icons">person_add</FontIcon>
                    }
                    label="Sign Up"
                    value={1}
                  />
                </Tabs>
                <SwipeableViews index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}>
                  <div className="content">
                    <LoginForm />
                  </div>
                  <div className="content">
                    <RegisterForm />
                  </div>
                </SwipeableViews>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default muiThemeable()(Login);
