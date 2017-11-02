import React, {PureComponent} from 'react';
import Dropdown from './Dropdown/Dropdown';
import {data} from './data';

class Demo extends PureComponent {
  render(){
    return (
      <div className="Demo">
        <Dropdown data={data} />
      </div>
    );
  }
}

export default Demo;
