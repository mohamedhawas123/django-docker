import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from 'antd'
import Results from './Componets/Results'
import {GetGradi} from '../store/actions/graded'

class ProfilePage extends Component {

    componentDidMount() {
        this.props.grad(this.props.username, localStorage.getItem("token"))
    }


    render() {
        console.log(this.props.username)
        return (
            <React.Fragment>
                <h1 style={{ marginTop: "50px" }} >Hi {this.props.username}</h1>
                <List style={{padding:"25px"}}  size="large" bordered
                dataSource={this.props.gradd}
                renderItem = {a => <Results key={a.id} grade={a.grade} /> } />

                
            </React.Fragment>
            
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        gradd: state.grad.graded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        grad: (username, token) => dispatch(GetGradi(username, token))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);