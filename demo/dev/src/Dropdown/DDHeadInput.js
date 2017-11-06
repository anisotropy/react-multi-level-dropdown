import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDHeadLabel from './DDHeadLabel';
import AutosizeInput from 'react-input-autosize';
import h_ from './helpful';
import './ddheadinput.less';

class DDHeadInput extends PureComponent {
  constructor(props){
    super(props);
    this.state = {keyword: ''};
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
  }
  handleClickArrow(){
    this.props.onClickArrow();
  }
  handleClickLabel(value){
    this.props.onClickLabel(value);
  }
  handleChangeKeyword(e){
    this.props.onChangeKeyword(e.target.value);
  }
  findLabel(data, value){
    return h_.extract(data, (d) => (
      d.value == value ? d.label : (d.children ? this.findLabel(d.children, value) : undefined)
    ));
  }
  render(){
    const {type, data, selected, open, keyword} = this.props;
    const labels = selected.map((value) => (
      <DDHeadLabel key={value}
        value={value}
        label={this.findLabel(data, value)}
        onClick={this.handleClickLabel}
      />
    ));
    const input = (
      <AutosizeInput
        className="ddheadinput__input"
        value={keyword}
        style={{minWidth:
          (type == 'multi-select' && selected.length > 0) || (type == 'selected' && selected) ? '1em' : '5em'
        }}
        onChange={this.handleChangeKeyword}
      />
    );
    return (
      <div className="ddheadinput">
        <div className={h_.class('ddheadinput__arrow', [{open}])} onClick={this.handleClickArrow}></div>
        <div className="ddheadinput__labels">
          {labels}
          {input}
        </div>
      </div>
    );
  }
}
DDHeadInput.propTypes = {
  type: PropTypes.oneOf(['select', 'multi-select']).isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  open: PropTypes.bool,
  keyword: PropTypes.string,
  onClickArrow: PropTypes.func.isRequired,
  onClickLabel: PropTypes.func.isRequired,
  onChangeKeyword: PropTypes.func.isRequired
};

export default DDHeadInput;
