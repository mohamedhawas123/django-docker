import React from 'react'
import { Steps, Button } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class Question extends React.Component {
  
        state = {
            current: 0,
      };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const {questions} = this.props
    return (
      <div style={{height: '100%'}} >
        <Steps progressDot current={current}>
          {questions.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{questions[current]}</div>
        <div className="steps-action">
          {current < questions.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === questions.length - 1 && (
            <Button type="primary" onClick={() => this.props.submit() }>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}


export default Question;
