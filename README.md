# React Hooks
React의 컴포넌트는 클래스컴포넌트와 함수형컴포넌트로 나누어 지는데
함수형컴포넌트는 클래스컴포넌트와 달리 State관리와 Life Cycle method를 사용할 수 없어 선택적으로만 사용해 왔다.  
하지만 클래스컴포넌트같은 경우 state, props 참조를 위한 this바인딩처리, Life Cycle method 사용시 로직이 2번 중복되는 경우와 재사용성을 위한 HOC의 복잡성 등의 문제점 있었다.  
이러한 문제의 해결책으로 나온 것이 Hook이다. Hook으로 함수컴포넌트에서도 State관리, Side Effects기능과 Custom Hook을 이용해 재사용성이 용이한 독립적인 컴포넌트를 생성할수 있게 되었다.

## useState
가장 기본적인 Hook으로써, 함수컴포넌트에서도 State관리를 가능하게 해준다.  
클래스컴포넌트의 state와 달리 Hook의 state는 꼭 객체일 필요없이 어떤 타입이든 가능하다.  
또한 useState는 처음 렌더링 되었을 때 한번 생성되며, state값을 기억하여 리렌더링 되었을 때 최신 state값을 반환한다.  


```js
const [state, setState] = useState(initialState);
// 첫 번째로 전달 된 인자(initialState)는 처음 렌더링되었을 때의 초기값.
// 첫 번째 배열 state는 현재 state값이며, 두 번째 배열 setState는 state값을 업데이트하는 함수.
```

```js
import React, { useState } from 'react';

const Count = () => {
  const [ count, setCount ] = useState(0);

  return (
    <div>
      <span>Number : {count}</span>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

ReactDOM.render(<Count />, document.getElementById('root'));
```

## useEffect
기존 Life Cycle API를 대체하는 기능으로 매 렌더링이 된 후 실행되는 Side Effects이다.


```js
// 마운트될때
useEffect(() => {
  // 컴포넌트가 마운트 될 때 실행할 코드
}, []);

// 업데이트될때
useEffect(() => {
  // 컴포넌트가 업데이트 될 때 실행할 코드
});

// 언마운트될때
useEffect(() => {
  return () => {
    // 컴포넌트가 언마운트 될 때 실행할 코드
  }
}, []);
```

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('root'));
```

## useContext
기존에는 데이터를 전달받기 위해서 전달받을 컴포넌트까지 몇번이고 props를 전달시켜야하는 번거러움이 있었는데 Context API로 이 부분이 해결되었고 Hook API의 useContext로 더욱 쉽게 사용이 가능해졌다.

## useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```js
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );

  ReactDOM.render(<Counter />, document.getElementById('root'));
}
```

## useCallback

## useMemo

## useRef