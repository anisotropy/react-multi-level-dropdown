import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDItem from './DDItem';
import _ from 'underscore';
import './dropdown.less';

class Dropdown extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      selected: []
    };
    this.handleClickLabel = this.handleClickLabel.bind(this);
  }
  handleClickLabel(value){
    console.log(value);
  }
  render(){
    const {data, headText} = this.props;
    return (
      <div className="dropdown">
        <DDItem head
          data={{label: headText, value: headText, children: data}}
          onClickLabel={this.handleClickLabel}
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
