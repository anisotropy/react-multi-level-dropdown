import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDHeadInput from './DDHeadInput';
import DDHeadButton from './DDHeadButton';
import './dditem.less';

class DDItem extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.setRef = this.setRef.bind(this);
    this.setRefLabel = this.setRefLabel.bind(this);
    this.setRefArrow = this.setRefArrow.bind(this);
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickChildLabel = this.handleClickChildLabel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
  setRefLabel(node){
    this.refLabel = node;
  }
  setRefArrow(node){
    this.refArrow = node;
  }
  handleClickArrow(){
    this.setState({open: !this.state.open});
  }
  handleClickLabel(){
    this.props.onClickLabel(this.props.data.value);
  }
  handleKeyDown(e){
    switch(e.key){
      case 'Enter':
        this.ref.getElementsByClassName('dditem__area-of-label')[0].click(); break;
      case 'ArrowRight': if(this.props.data.children){
        if(!this.state.open){
          this.ref.getElementsByClassName('dditem__arrow')[0].click();
        } else {
          this.ref.getElementsByClassName('dditem__children')[0].children[0].children[0].focus();
        }} break;
      case 'ArrowLeft': {
        let parent = this.ref.parentElement.parentElement.parentElement.children[0];
        if(parent) parent.focus();
        if(this.state.open) this.ref.getElementsByClassName('dditem__arrow')[0].click();
      } break;
      case 'ArrowDown':
        if(this.ref.nextSibling) this.ref.nextSibling.children[0].focus(); break;
      case 'ArrowUp':
        if(this.ref.previousSibling) this.ref.previousSibling.children[0].focus(); break;
    }
  }
  handleClickChildLabel(value){
    this.props.onClickLabel(value);
  }
  handleBodyClick(e){
    if(this.ref && !this.ref.contains(e.target)){
      this.setState({open: false});
    }
  }
  render(){
    const {type, data, selected} = this.props;
    const {open} = this.state;
    const isSelected = (type == 'multi-select' ? selected.indexOf(data.value) >= 0 : selected == data.value);
    const body = (
      <div className="dditem__body" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <span className="dditem__label">{data.label}</span>
        <div className={isSelected ? 'dditem__check' : null}></div>
        <div className="dditem__area-of-label" onClick={this.handleClickLabel}></div>
        {data.children &&
          <div
            className={'dditem__arrow' + (open ? ' dditem__arrow--rotate' : '')}
            onClick={this.handleClickArrow}>
          </div>
        }
      </div>
    );
    const items = (!data.children ? null : data.children.map((d, i) => (
      <DDItem key={d.value}
        type={type}
        data={d}
        selected={selected}
        onClickLabel={this.handleClickChildLabel}
      />
    )));
    return (
      <div className="dditem" ref={this.setRef}>
        {body}
        <div className="dditem__children-wrapper">
          <div className={'dditem__children' + (open ? ' dditem__children--open' : '')}>
            {items}
          </div>
        </div>
      </div>
    );
  }
}
DDItem.propTypes = {
  type: PropTypes.oneOf(['menu', 'select', 'multi-select']).isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  onClickLabel: PropTypes.func.isRequired
};

export default DDItem;
