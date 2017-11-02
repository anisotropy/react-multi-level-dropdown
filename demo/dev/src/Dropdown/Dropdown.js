import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './dropdown.less';

class Dropdown extends PureComponent {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        Dropdown
      </div>
    )
  }
}
Dropdown.propTypes = {
  data: PropTypes.array.isRequired
};

export default Dropdown;
