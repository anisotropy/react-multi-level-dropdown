import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDItem from './DDItem';
import _ from 'underscore';
import './dropdown.less';

class Dropdown extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({open: !this.state.open});
  }
  render(){
    const {data, headText} = this.props;
    const {open} = this.state;
    return (
      <div className="dropdown">
        <DDItem
          head
          data={{label: headText, value: headText, children: data}}
          open={open}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}
Dropdown.propTypes = {
  data: PropTypes.array.isRequired,
  headText: PropTypes.string
};
Dropdown.defaultProps = {
  headText: 'Select'
};

export default Dropdown;
