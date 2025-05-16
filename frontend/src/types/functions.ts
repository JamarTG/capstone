import type { ChangeEvent } from "react";

export type VoidHandleChangeFn = (e: ChangeEvent<HTMLInputElement>) => void;
export type OnSelectFn = (index:number) => void