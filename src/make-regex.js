export const makeRegExp = string => {

  const expression = string.replace(/[-/\\^$*+?.()|[\]]/g, '\\$&')
    .replace(/\$/g, '$$$$')
    .replace(/{(.*?)}/g, '(.[^/]*)')
    .replace(/^(.*)$/, '^$1$');

  return new RegExp(expression);

};
