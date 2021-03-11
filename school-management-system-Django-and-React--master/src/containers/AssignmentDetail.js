import React, { Component } from 'react'
import { Card, Skeleton, message } from 'antd';
import { connect } from "react-redux";
import { getDetailAssign } from '../store/actions/assignment'
import Question from './Qestion'
import Choices from './Componets/Choices'
import { CreateGrade } from '../store/actions/graded'

class AssignDetail extends Component {

    state = {
        userAnswars: {}
    }




    componentDidMount() {
        const { ID } = this.props.match.params
        console.log(this.props)
        const token = this.props.token
        this.props.getDetail(token, ID)
    }

    onChange = (e, qid) => {
        console.log('radio checked', e.target.value);
        const { userAnswars } = this.state;
        userAnswars[qid] = e.target.value;
        this.setState({
            userAnswars
        });
    };

    handleSubmit() {
        message.success('Submitting your assignment')
        const { userAnswars } = this.state;


        const astn = {
            username: this.props.username,
            astnId: this.props.assigmentt.id,
            answers: userAnswars
        }
        this.props.creategrade(localStorage.getItem("token"), astn)
    }



    render() {
        const detail = this.props.assigmentt
        console.log(detail.title)
        const { userAnswars } = this.state;
        return (
            <React.Fragment>
                {Object.keys(detail).length > 0 ? (

                    <React.Fragment>
                        <Card style={{ marginTop: "50px" }} title={detail.title}>
                            <Card type="inner" />
                            <Question submit={() => this.handleSubmit()} questions={detail.questions.map(q => {
                                return (
                                    <Card style={{ marginTop: "20px", marginBottom: "20px" }} type="inner" key={q.id} title={`${q.ordering} - ${q.question}`} >
                                        <Choices userAnswars={userAnswars} questionid={q.ordering} change={this.onChange} choice={q.choices} />
                                    </Card>
                                )
                            })} />
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Inner Card title"
                            extra={<a href="#">More</a>}
                        >
                        </Card>

                    </React.Fragment>

                ) : null
                }
            </React.Fragment>



        )

    }
}



const mapStateToProps = state => {
    return {
        assigmentt: state.assignment.CurrentASsign,
        error: state.assignment.error,
        loading: state.assignment.loading,
        username: state.auth.username,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetail: (token, id) => dispatch(getDetailAssign(token, id)),
        creategrade: (token, astn) => dispatch(CreateGrade(token, astn))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignDetail);