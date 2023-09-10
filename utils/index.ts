export const sleep = (fn: (record: any) => void, delay: number) => {
  return (record: any, i: number) => {
    setTimeout(() => {
      fn(record);
    }, i * delay);
  };
};
