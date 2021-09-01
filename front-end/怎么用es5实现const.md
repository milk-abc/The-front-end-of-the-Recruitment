利用 Object.defineProperty 的能力劫持当前对象，设置 set 方法，判断新值和旧值是否相等，如果不等就报错。
