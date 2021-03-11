import React, { Component } from 'react'
import { List, Typography, Divider } from 'antd';
import { getAssing } from '../store/actions/assignment'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class AssignmentList extends Component {

    componentDidMount() {
        const token = this.props.token
        this.props.getassign(token)
    }

    renderItem(item) {
        return (
            <React.Fragment>
                <Link to={`/assignments/${item.id}`}>
                    <List.Item style={{ fontSize: "30px", margin: '20px', padding: '15px', border: "2px solid red", borderRadius: '5px' }} >{item.title}</List.Item>
                </Link>
            </React.Fragment>

        )


    }

    render() {

        const { assigments, error, loading } = this.props;
        console.log(this.props)

        return (
            <React.Fragment>

                <Divider style={{ marginTop: '50px', fontFamily: 'Arial', marginLeft: '25px', color: 'rgb(51, 51, 204)' }} orientation="left"><h1>assignment list</h1></Divider>
                <List
                    size="large"


                    bordered
                    dataSource={this.props.assigments}
                    renderItem={item => this.renderItem(item)}
                />
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        assigments: state.assignment.assignments,
        error: state.assignment.error,
        loading: state.assignment.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getassign: (token) => dispatch(getAssing(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);