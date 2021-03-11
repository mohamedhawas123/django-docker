import React from 'react'

import { Form, Input, Icon, Button } from 'antd';

let id = 0;

class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        
        label={index === 0 ? 'Choices' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`questions[${this.props.id}]choices[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: "Please input a Choices.",
            },
          ],
        })(<Input placeholder="Answer Choice "  />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>

<Form.Item label="Question" >
        {getFieldDecorator(`question[${this.props.id}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input the question ",
            },
          ],
        })(
          <Input placeholder="Please input the question ?" />
        )}
        </Form.Item>


        <Form.Item label="answer" >
        {getFieldDecorator(`answer[${this.props.id}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input an answar to this question.",
            },
          ],
        })(
          <Input placeholder="what is the answer ?" />
        )}
        </Form.Item>
        {formItems}
        <Form.Item >
          <Button type="dashed" onClick={this.add} >
            <Icon type="plus" /> Add an Answer Choice
          </Button>
        </Form.Item>
       
      </Form>
    );
  }
}

const QuestionFormy = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default QuestionFormy;
