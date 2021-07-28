import React, { Component } from "react";
import style from "./Authorization.module.css";
import TextField from "@material-ui/core/TextField";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";
import * as EmailValidator from "email-validator";
import * as authOperations from "../../redux/Auth/authOperations";
import * as Selectors from '../../redux/Selectors'
import ecolabLogo from '../../assets/img/ecolabLogo.png'

class Authorization extends Component {
  state = {
    login: "",
    password: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };



  handleSubmit = (e) => {
    e.preventDefault();
    const { authorization  } = this.props;
    const { login, password} = this.state;
    if (!login) {
      return NotificationManager.warning("", "Check login", 2000);
    }
    if (password.length < 5) {
          return NotificationManager.warning(
            "",
            "Password lengh must be > 5",
            2000
          );
        }

      authorization({ login, password });
  };

  render() {
    const {  login, password } = this.state;
    return (
      <>
   
    <img className={style.logo} src={ecolabLogo} alt='only logo'></img>
          <form
            className={style.form}
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <h2>Авторизация</h2>
            <div>
              <TextField
                autoComplete="nope"
                value={login}
                onChange={this.handleChange}
                className={style.input}
                id="login"
                label="Login"
              />
              <TextField
                autoComplete="new-password"
                value={password}
                onChange={this.handleChange}
                className={style.input}
                type="password"
                id="password"
                label="Password"
              />
            </div>
            <button className={style.submitBtn} type="submit">
             Войти
            </button>
    
          </form>
       
        <NotificationContainer></NotificationContainer>
      
      </>
    );
  }
}
const mDTP = (dispatch) => ({
  login: (user) => dispatch(authOperations.login(user)),
  registration: (user) => dispatch(authOperations.register(user)),
});
// const mSTP = store => ({
//   isAuth: Selectors.getIsAuth(store),
// });

export default connect(null, mDTP)(Authorization);
