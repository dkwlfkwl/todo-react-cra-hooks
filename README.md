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
const Count = () => {
  const [ count, setCount ] = useState(0);

  return (
    <div>
      <span>Number : {count}</span>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```

## useEffect
기존 Life Cycle 메소드는 마운트, 언마운트, 업데이트의 기준의 전후로 실행되는 메소드들로 나눠졌지만 Hook에서의 useEffect는 초기 렌더링을 포함한 매 렌더링될 떄마다 실행되는 Side Effect이다.  
또한 두 번째 인자인 의존성배열을 통해 data fetch가 되어 업데이트될 때만 갱신할수 있고, 메모리 누수를 방지하기 위해 Cleanup함수를 리턴하여 언마운트 되는 상태값들을 정리할 수도 있다.  

```js
useEffect(() => {
  // 매 렌더링될 때 마다 실행할 함수 입력
  return () => {
    // 언마운트 될 때 cleanup할 함수 입력
  }
}, []); // date fetch할 값을 의존성배열에 입력
```

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [props.source]);
```

## useContext
기존 React Context를 이용하여 Context를 생성, Context.Provider로 저장, Context.Consumer로 접근하는 방식으로 계속 props를 내려받지 않아도 되었지만, context를 사용하는 갯수만큼 wrapping 해야하는 복잡한 구조였다.  
Hook useContext는 이 부분이 개선되어 warpping 하지 않아도 필요한 Context값을 불러낼 수 있게 되었다.  

```js
// Context 생성
const VingleContext = React.createContext();
const RandomContext = React.createContext();

function HelloWorld() {
  // 필요한 Context값을 불러옴
  const message = React.useContext(VingleContext);
  const num = React.useContext(RandomContext);

  return (
    // Context.Consumer로 wrapping하지 않음
    <h1>{message} and random is {num}</h1>
  );
}

function App() {
  return (
    // Context.Provider로 props값 저장
    <VingleContext.Provider value="Hello Vingle!">
      <RandomContext.Provider value={Math.random()}>
        <HelloWorld />
      </RandomContext.Provider>
    </VingleContext.Provider>
  );
}
```

## useReducer
useState의 대체 함수
다수의 하윗값을 갖는 경우 or 다음 state값과 이전 state값이 의존적인 경우
상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을때 사용하는 Hookl

```js
const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## useCallback
useCallback은 Memoization기반으로 첫 번째 인자로 전달된 함수를 기억한다.  
전달된 함수 안에서 참조된 값을 두 번째 인자인 의존성배열에 나타낸다면 참조된 값이 변경되었을때만 함수가 실행된다.  
의존성배열이 비어있을경우에는 리렌더링될때마다 함수가 실행된다.  

**Tip.** useCallback(fn, deps) = useMemo(() => fn, deps)

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

## useMemo
useMemo는 Memoization기반으로 첫 번째 인자로 전달된 함수의 return된 결과값을 기억한다.  
전달된 함수 안에서 참조된 값을 두 번째 인자인 의존성배열에 나타낸다면 참조된 값이 변경되었을때만 함수가 실행되어 새로운 결과값을 기억하게 된다.  
의존성배열이 비어있을경우에는 리렌더링될때마다 함수가 실행되어 새로운 결과값을 저장한다.  

```js
const memoizedValue = useMemo(() =>
  computeExpensiveValue(a, b),
  [a, b]
);

```

## useRef
컴포넌트에서 특정 DOM을 선택해야 할 때 주로 사용되며 useRef값이 바뀐다고 업데이트 되지 않는다.  
useRef가 관리하는 변수의 값이 변경되면 바로 조회가능하여 setTimeout, setInterval으로 출력된 값, 외부 라이브러리를 사용하여 생성된 인스턴스값, scroll 위치값 등을 관리할 때도 쓰인다.  

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
