import React, { useEffect, useState } from "react";

function Play(props) {
  const [count, setCount] = useState(0);

  useEffect(() => console.log(count),[]);
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
}

export default Play;
