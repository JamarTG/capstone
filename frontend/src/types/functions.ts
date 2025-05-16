import type { ChangeEvent } from "react";

export type voidFn = () => void;
export type voidHandleChangeFn = (e: ChangeEvent<HTMLInputElement>) => void;
export type OnSelectFn = (index:number) => void