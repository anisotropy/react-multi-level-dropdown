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
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
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
  handleBodyClick(e){
    this.props.onClick(null);
  }
  handleClickChild(value){
    this.setState({openChild: value});
  }
  render(){
    const {head, open, data} = this.props;
    const {openChild} = this.state;
    const items = (!data.children ? null : _.map(data.children, (d, i) => (
      <DDItem key={d.value} open={d.value == openChild} data={d} onClick={this.handleClickChild} />
    )));
    return (
      <div className={'dditem' + (head ? ' dditem--head' : '')} onClick={this.handleClick}>
        <div className="dditem__body">
          {data.label}
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
  onClick: PropTypes.func.isRequired
};

export default DDItem;
