import logo from "./logo.svg";
import "./App.css";
// import { Count } from "./components/use_state/01base.tsx";
// import { MyComponent } from "./components/classcomponent/01state.tsx";
import { Count2 } from "./components/hooks/useRef.tsx";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  console.log("render");
  useEffect(() => {
    console.log("effect");
    return () => {
      console.log("clear effect");
    };
  });
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
}

export default App;
