export const arrayToJSON = (arr: Array<string>) => {
  let result: string = "";

  result = result.concat("[");

  arr.forEach((e, i) => {
    if (i == arr.length - 1) {
      result = result.concat(e);
    } else {
      result = result.concat(e, ", ");
    }
  });

  result = result.concat("]");

  return result;
};
