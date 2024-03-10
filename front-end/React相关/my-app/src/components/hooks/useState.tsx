import React, { useState } from "react";

export const Count: React.FC = () => {
  const [count, setCount] = useState(0);
  const add = () => setCount(count + 1);
  return (
    <div>
      <h1>count 的值是：{count}</h1>
      <button onClick={add}>+1</button>
    </div>
  );
};
