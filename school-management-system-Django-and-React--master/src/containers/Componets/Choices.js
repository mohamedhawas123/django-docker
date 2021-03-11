import React from 'react'


import { Radio, Input } from 'antd';

class Choices extends React.Component {
 

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    
    return (
      <Radio.Group onChange={(e, qid) => this.props.change(e, this.props.questionid)} value={this.props.userAnswars[this.props.questionid]}>
          {this.props.choice.map((q, index) => {
              return (
                  <Radio style={radioStyle} key={index} value={q}>
                        {q}
        </Radio>
              )
          })}
        
     
     
      </Radio.Group>
    );
  }
}


export default Choices;
