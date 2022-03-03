/* eslint-disable no-shadow */
const getShortHand = (style, ...values) => {
  if (values.length === 1) {
    return { [style]: values[0] };
  }
  const _genCss = (...values) => ({
    [`${style}Top`]: values[0],
    [`${style}Right`]: values[1],
    [`${style}Bottom`]: values[2],
    [`${style}Left`]: values[3],
  });
  if (values.length === 2) {
    return _genCss(values[0], values[1], values[0], values[1]);
  }
  if (values.length === 3) {
    return _genCss(values[0], values[1], values[2], values[1]);
  }
  return _genCss(values[0], values[1], values[2], values[3]);
};

export const padding = (...values) => getShortHand('padding', ...values);
export const margin = (...values) => getShortHand('margin', ...values);
