import { Fragment, JSX } from "react";

interface RenderListProps<T> {
  data: T[];
  renderFn: (item: T, index: number) => JSX.Element;
}

const RenderList = <T,>({ data, renderFn }: RenderListProps<T>) => {
  return <Fragment>{data.map(renderFn)}</Fragment>;
};

export default RenderList;
