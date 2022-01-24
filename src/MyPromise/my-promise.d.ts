export type Resolve<T> = (value: T) => void
export type Reject = (reason?: any) => void

export type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

type onFulfilled<T, TResult1> =
    | ((value: T) => TResult1 | PromiseLike<TResult1>)
    | undefined
    | null

type onRejected<TResult2> =
    | ((reason: any) => TResult2 | PromiseLike<TResult2>)
    | undefined
    | null
