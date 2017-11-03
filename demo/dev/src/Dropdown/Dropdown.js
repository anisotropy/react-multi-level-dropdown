import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDItem from './DDItem';
import update from 'immutability-helper';
import './dropdown.less';

class Dropdown extends PureComponent {
  constructor(props){
    super(props);
    this.type = this.getType();
    this.handleClickLabel = this.handleClickLabel.bind(this);
  }
  getType(){
    const {selected} = this.props;
    if(typeof selected === 'undefined'){
      return 'menu';
    }
    else if(typeof selected !== 'object'){
      return 'select';
    }
    else if(Array.isArray(selected)){
      return 'multi-select';
    }
  }
  handleClickLabel(value){if(this.props.onChange){
    const {selected} = this.props;
    switch(this.type){
      case 'select':
        if(selected == value) this.props.onChange(null); else this.props.onChange(value); break;
      case 'multi-select':
        let indexOfValue = selected.indexOf(value);
        if(indexOfValue >= 0){
          this.props.onChange(update(selected, {$splice: [[indexOfValue, 1]]}));
        } else {
          this.props.onChange(update(selected, {$push: [value]}));
        } break;
      case 'menu':
        break;
    }
  }}
  render(){
    const {data, headText, selected} = this.props;
    return (
      <div className="dropdown">
        <DDItem head
          type={this.type}
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
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  onChange: PropTypes.func
};
Dropdown.defaultProps = {
  headText: 'Select'
};

export default Dropdown;
