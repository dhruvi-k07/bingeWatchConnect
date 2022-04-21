import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, RaisedButton } from "material-ui";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../../action/loginSignupAction";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      isLoggedIn: false,
      apiError: "",
      status: '',
    };
  }
  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit = async(e) => {
    e.preventDefault();
    const { loginUser, loginUserDetails } = this.props;
    const { email, password } = this.state;
    this.setState({ emailError: "", passwordError: "" });
    try{
      await loginUser(email, password);
      if(loginUserDetails.status === 'success'){
        this.setState({ isLoggedIn: true})
      } else {
        this.setState({ apiError: loginUserDetails.errorMessage })
      }
    } catch(error){
      console.log(error)
    }
  }
  render() {
    const { apiError, isLoggedIn } = this.state;
    const { loginUserDetails } = this.props;
    if(isLoggedIn){
      return <Redirect to={{ pathname: '/welcome', state: {loginUserDetails} }} />
    }
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} style={{ padding: 10 }}>
        <TextField
          floatingLabelText="Email"
          type="email"
          fullWidth
          name="email"
          errorText={this.state.emailError}
          value={this.state.email}
          onChange={(e) => this.handleChange(e)}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          fullWidth
          name="password"
          errorText={this.state.passwordError}
          value={this.state.password}
          onChange={(e) => this.handleChange(e)}
        />
        <div className="space"></div>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        <RaisedButton type="submit" label="Login" primary={true} fullWidth />
        <div className="space-50"></div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserDetails: state.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
