import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class DDItem extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.setRef = this.setRef.bind(this);
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickChildLabel = this.handleClickChildLabel.bind(this);
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
  handleClickLabel(){
    this.props.onClickLabel(this.props.data.value);
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
    const {head, type, data, selected} = this.props;
    const {open} = this.state;
    const isSelected = (type == 'multi-select' ? selected.indexOf(data.value) >= 0 : selected == data.value);
    const items = (!data.children ? null : data.children.map((d, i) => (
      <DDItem key={d.value}
        type={type}
        data={d}
        selected={selected}
        onClickLabel={this.handleClickChildLabel}
      />
    )));
    return (
      <div ref={this.setRef} className={'dditem' + (head ? ' dditem--head' : '')}>
        <div className="dditem__body">
          <span className="dditem__label">{data.label}</span>
          <div className={isSelected ? 'dditem__check' : null}></div>
          {!head &&
            <div className="dditem__area-of-label" onClick={this.handleClickLabel}></div>
          }
          {data.children &&
            <div className={'dditem__arrow' + (open ? ' dditem__arrow--rotate' : '')}
              onClick={this.handleClickArrow}>
            </div>
          }
        </div>
        <div>
          <div className={'dditem__children' + (open ? ' dditem__children--open' : '')}>
            {items}
          </div>
        </div>
      </div>
    );
  }
}
DDItem.propTypes = {
  head: PropTypes.bool,
  type: PropTypes.oneOf(['menu', 'select', 'multi-select']).isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  onClickLabel: PropTypes.func.isRequired
};

export default DDItem;
