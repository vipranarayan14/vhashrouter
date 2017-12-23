function makeRegExp(str) {

  str = str.replace(/[-/\\^$*+?.()|[\]]/g, '\\$&')
    .replace(/\$/g, '$$$$')
    .replace(/{(.*?)}/g, '(.[^/]*)');

  str = new RegExp(str);

  return str;
}

export default makeRegExp;