import { SignInDto, SignUpDto } from '../api/types';

export type SignInArgs = SignInDto;

export type SignUpArgs = SignUpDto;

export type StateChanged<S> = (prevState: S) => S;

export type PartialDispatch<S> = (f: StateChanged<S>) => void;
