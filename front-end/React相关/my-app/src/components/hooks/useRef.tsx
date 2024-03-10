import { useRef } from "react";
export const Count2 = () => {
  const ref = useRef(0);
  const add = () => {
    ref.current += 1;
    console.log("点击", ref.current);
  };
  return (
    <div>
      <h1>count的值：{ref.current}</h1>
      <button onClick={add}>+1</button>
    </div>
  );
};
