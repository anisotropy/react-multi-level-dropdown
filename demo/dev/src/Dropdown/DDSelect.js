import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDHeadInput from './DDHeadInput';
import DDItem from './DDItem';

class DDSelect extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.setRef = this.setRef.bind(this);
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
  }
  componentDidMount(){
    document.addEventListener('click', this.handleBodyClick);
  }
  componentWillUnmount(){
    document.removeEventListener('click', this.handleBodyClick);
  }
  setRef(node){
    this.ref = node;
  }
  handleClickArrow(e){
    this.setState({open: !this.state.open});
  }
  handleClickLabel(value){
    this.props.onClickLabel(value);
  }
  handleChangeKeyword(keyword){
    
  }
  handleBodyClick(e){
    if(this.ref && !this.ref.contains(e.target)){
      this.setState({open: false});
    }
  }
  render(){
    const {type, data, selected} = this.props;
    const {open} = this.state;
    const head = (
      <DDHeadInput
        type={type}
        data={data}
        selected={selected}
        open={open}
        onClickArrow={this.handleClickArrow}
        onClickLabel={this.handleClickLabel}
        onChangeKeyword={this.handleChangeKeyword}
      />
    );
    const items = (!data.children ? null : data.children.map((d, i) => (
      <DDItem key={d.value}
        type={type}
        data={d}
        selected={selected}
        onClickLabel={this.handleClickLabel}
      />
    )));
    return (
      <div ref={this.setRef} className="dropdown">
        {head}
        <div className="dropdown__children-wrapper">
          <div className={'dropdown__children' + (open ? ' dropdown__children--open' : '')}>
            {items}
          </div>
        </div>
      </div>
    );
  }
}
DDSelect.propTypes = {
  head: PropTypes.bool,
  type: PropTypes.oneOf(['select', 'multi-select']).isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  onClickLabel: PropTypes.func.isRequired
};

export default DDSelect;
