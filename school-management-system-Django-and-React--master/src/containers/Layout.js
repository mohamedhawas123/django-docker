import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

class CustomLayout extends React.Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        
 
       
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Home</Menu.Item>
            </Link>
              <Link to="/create">
                <Menu.Item header>Create</Menu.Item>
              </Link>
            

            <Link to={`/profile/${this.props.userid}`}>
              <Menu.Item header>Profile</Menu.Item>
            </Link>
            {authenticated ? (
              <Menu.Item header onClick={() => this.props.logout()}>
                Logout
              </Menu.Item>
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item header>Login</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Signup</Menu.Item>
                </Link>
              </React.Fragment>
            )}
          </Container>
        </Menu>
              
       
        {this.props.children}

       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    userid: state.auth.userid

  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
