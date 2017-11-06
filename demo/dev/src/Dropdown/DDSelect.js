import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DDHeadInput from './DDHeadInput';
import DDItem from './DDItem';
import h_ from './helpful';

class DDSelect extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      keyword: '',
      result: []
    };
    this.setRef = this.setRef.bind(this);
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleClickLabelInResult = this.handleClickLabelInResult.bind(this);
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
    this.setState({open: !this.state.open, keyword: '', result: []});
  }
  handleClickLabel(value){
    this.props.onClickLabel(value);
  }
  handleClickLabelInResult(value){
    this.props.onClickLabel(value);
    this.setState({keyword: '', result: []});
  }
  handleChangeKeyword(keyword){
    let regexp = new RegExp(keyword, 'i');
    const search = (data) => {
      let result = [];
      if(keyword){
        data.forEach((d) => {
          if(d.label.match(regexp)) result.push({label: d.label, value: d.value});
          if(d.children) result = result.concat(search(d.children));
        });
      }
      return result;
    };
    this.setState({open: false, keyword: keyword, result: search(this.props.data)});
  }
  handleBodyClick(e){
    if(this.ref && !this.ref.contains(e.target)){
      this.setState({open: false});
    }
  }
  render(){
    const {type, data, selected} = this.props;
    const {open, keyword, result} = this.state;
    const head = (
      <DDHeadInput
        type={type}
        data={data}
        selected={selected}
        open={open}
        keyword={keyword}
        onClickArrow={this.handleClickArrow}
        onClickLabel={this.handleClickLabel}
        onChangeKeyword={this.handleChangeKeyword}
      />
    );
    const items = data.map((d) => (
      <DDItem key={d.value}
        type={type}
        data={d}
        selected={selected}
        onClickLabel={this.handleClickLabel}
      />
    ));
    const searchResult = result.length > 0 && (
      <div className="dropdown__result">
        {result.map((d) => (
          <DDItem key={d.value}
            type={type}
            data={d}
            selected={selected}
            onClickLabel={this.handleClickLabelInResult}
          />
        ))}
      </div>
    );
    return (
      <div ref={this.setRef} className="dropdown">
        {head}
        <div className="dropdown__children-wrapper">
          <div className={h_.class('dropdown__children', [{open}])}>
            {items}
          </div>
          {searchResult}
        </div>
      </div>
    );
  }
}
DDSelect.propTypes = {
  head: PropTypes.bool,
  type: PropTypes.oneOf(['select', 'multi-select']).isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.bool]),
  onClickLabel: PropTypes.func.isRequired
};

export default DDSelect;
