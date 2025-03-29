import React from "react";
import { JSX } from "react";

interface RenderListProps<T> {
  data: T[];
  renderFn: (item: T,index:number) => JSX.Element;
}

const RenderList = <T,>({ data, renderFn }: RenderListProps<T>) => {
  return <React.Fragment>{data.map(renderFn)}</React.Fragment>;
};

export default RenderList;
