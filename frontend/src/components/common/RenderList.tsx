import type { JSX } from "react";

interface RenderListProps<T> {
  data: T[];
  renderFn: (item: T, index: number) => JSX.Element;
}

const RenderList = <T,>({ data, renderFn }: RenderListProps<T>) => {
  return <>{data.map(renderFn)}</>;
};

export default RenderList;
