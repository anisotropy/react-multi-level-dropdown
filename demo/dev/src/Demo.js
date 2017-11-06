import React, {PureComponent} from 'react';
import Dropdown from './Dropdown/Dropdown';
import {data} from './data';

class Demo extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      selected: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selected){
    this.setState({selected: selected});
  }
  render(){
    const {selected} = this.state;
    return (
      <div className="Demo">
        <Dropdown data={data} selected={selected} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Demo;
