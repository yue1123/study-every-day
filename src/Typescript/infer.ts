type test = [12, 3, 4] extends [infer F, ...infer Rest] ? [Rest, F] : 1
