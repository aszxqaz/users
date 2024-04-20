export type StateChanged<S> = (prevState: S) => S;

export type Dispatch<S> = (f: StateChanged<S>) => void;
