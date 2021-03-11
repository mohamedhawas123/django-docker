import React from 'react'

import { Form, Input, Button, Icon, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import QuestionForm from './QuestionForm'
import { connect } from "react-redux";
import { Createastn } from '../store/actions/assignment'

class AssignCreate extends React.Component {

  state = {
    formCount: 1
  }

  remove = () => {
    const { formCount } = this.state;
    this.setState({ formCount: formCount - 1 })
  };


  add = () => {
    const { formCount } = this.state;
    this.setState({ formCount: formCount + 1 })
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const questions = [];
        for (let i = 0; i < values.question.length; i++) {
          questions.push({
            title: values.question[i],
            choices: values.questions[i].choices.filter(el => el !== null),
            answer: values.answer[i]
          })
        }
        const anst = {
          teacher: this.props.username,
          title: values.title,
          questions

        }

        this.props.getast(anst, this.props.token)


      }
    });
  };

  render() {



    const { getFieldDecorator } = this.props.form;
    const questions = []
    for (let i = 0; i < this.state.formCount; i++) {
      questions.push(
        <React.Fragment>
          {questions.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove()}
            />
          ) : null}
          <QuestionForm {...this.props} id={i} />

          <Divider />
        </React.Fragment>

      )
    }

    return (
      <Form style={{ marginTop: "50px" }} onSubmit={this.handleSubmit}>
        <h1>Create an Assignment</h1>
        <Form.Item label={"Title: "} >
          {getFieldDecorator(`title`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                message: "please input a title.",
              },
            ],
          })(
            <Input placeholder="Add a Title" />
          )}
        </Form.Item>
        {questions}
        <Form.Item  >
          <Button type="secondary" onClick={this.add} >
            <Icon type="plus" /> Ask Question
             </Button>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
              </Button>
        </Form.Item>
      </Form>
    )
  }

}


const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token,
    loading: state.assignment.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getast: (astn, id) => dispatch(Createastn(astn, id))
  }
}



const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(AssignCreate);


export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicFieldSet);
