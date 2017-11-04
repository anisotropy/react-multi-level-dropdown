const helpful = {
  extract: (obj, callback) => {
    for(let pn in obj){
      let value = callback(obj[pn], pn);
      if(value !== undefined) return value;
    }
  },
  class: (name, args) => {
    let suffixes = [name];
    args.forEach((arg) => {
      if(typeof arg === 'string'){
        suffixes.push(name+'--'+arg);
      }
      else if(Array.isArray(arg)){
        if(arg[0]) suffixes.push(name+'--'+arg[1]);
      }
      else if(typeof arg === 'object'){
        let pn = helpful.extract(arg, (pv, pn) => (pv ? pn : undefined));
        if(pn) suffixes.push(name+'--'+pn);
      }
    });
    return suffixes.join(' ');
  }
};

export default helpful;
