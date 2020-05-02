/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Menu } from 'antd'
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const signButton = (
    <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up</a>
        </Menu.Item>
      </Menu>
  )

  const logoutButton = (
    <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
  )

  if (user.userData && !user.userData.isAuth) {
    return (
      signButton
    )
  } else {
    return (
      logoutButton
    )
  }
}

export default withRouter(RightMenu);
