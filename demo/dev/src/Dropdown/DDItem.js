import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

class DDItem extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      openChild: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
    this.handleClickChildLabel = this.handleClickChildLabel.bind(this);
  }
  componentDidMount(){
    document.addEventListener('click', this.handleBodyClick);
  }
  componentWillUnmount(){
    document.removeEventListener('click', this.handleBodyClick);
  }
  handleClick(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onClick(this.props.open ? null : this.props.data.value);
  }
  handleClickLabel(e){
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.onClickLabel(this.props.data.value);
  }
  handleBodyClick(e){
    this.props.onClick(null);
  }
  handleClickChild(value){
    this.setState({openChild: value});
  }
  handleClickChildLabel(value){
    this.props.onClickLabel(value);
  }
  render(){
    const {head, open, data} = this.props;
    const {openChild} = this.state;
    const items = (!data.children ? null : _.map(data.children, (d, i) => (
      <DDItem
        key={d.value}
        open={d.value == openChild}
        data={d}
        onClick={this.handleClickChild}
        onClickLabel={this.handleClickChildLabel}
      />
    )));
    return (
      <div className={'dditem' + (head ? ' dditem--head' : '')}>
        <div className="dditem__body" onClick={this.handleClickLabel}>
          <span className="dditem__label">{data.label}</span>
          {data.children && <span className="dditem__arrow" onClick={this.handleClick}></span>}
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
  open: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickLabel: PropTypes.func.isRequired
};

export default DDItem;
