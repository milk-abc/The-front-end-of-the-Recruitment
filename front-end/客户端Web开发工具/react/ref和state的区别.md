当你希望组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 ref：
const ref = useRef(0);
与 state 一样，ref 在重新渲染之间由 React 保留。但是，设置 state 会重新渲染组件，而更改 ref 不会！你可以通过 ref.current 属性访问该 ref 的当前值。
请注意，组件不会在每次递增时重新渲染。 与 state 一样，React 会在每次重新渲染之间保留 ref。但是，设置 state 会重新渲染组件，更改 ref 不会！