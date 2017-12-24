export const makeRegExp = string => {

  const expression = string.replace(/[-/\\^$*+?.()|[\]]/g, '\\$&')
    .replace(/\$/g, '$$$$')
    .replace(/{(.*?)}/g, '(.[^/]*)');

  return new RegExp(expression);
}
