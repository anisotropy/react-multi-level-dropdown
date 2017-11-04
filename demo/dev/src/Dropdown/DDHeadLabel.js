import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './ddheadlabel.less';

class DDHeadLabel extends PureComponent {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.onClick(this.props.value);
  }
  render(){
    return (
      <span className="ddheadlabel" onClick={this.handleClick}>
        {this.props.label}
      </span>
    );
  }
}
DDHeadLabel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DDHeadLabel;
