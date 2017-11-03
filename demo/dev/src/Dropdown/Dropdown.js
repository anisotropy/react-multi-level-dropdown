import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDItem from './DDItem';
import update from 'immutability-helper';
import './dropdown.less';

class Dropdown extends PureComponent {
  constructor(props){
    super(props);
    this.handleClickLabel = this.handleClickLabel.bind(this);
  }
  handleClickLabel(value){
    const {selected, onChange} = this.props;
    if(onChange){
      if(typeof selected === 'string' || typeof selected === 'number' || selected === null || selected === ''){
        if(selected == value) onChange(null); else onChange(value);
      }
      else if(Array.isArray(selected)){
        let indexOfValue = selected.indexOf(value);
        if(indexOfValue >= 0){
          onChange(update(selected, {$splice: [[indexOfValue, 1]]}));
        } else {
          onChange(update(selected, {$push: [value]}));
        }
      }
    }
  }
  render(){
    const {data, headText, selected} = this.props;
    return (
      <div className="dropdown">
        <DDItem head
          data={{label: headText, value: headText, children: data}}
          selected={selected}
          onClickLabel={this.handleClickLabel}
        />
      </div>
    );
  }
}
Dropdown.propTypes = {
  data: PropTypes.array.isRequired,
  headText: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};
Dropdown.defaultProps = {
  headText: 'Select'
};

export default Dropdown;
