# React Hooks
React의 Class 컴포넌트같은 경우 함수형 컴포넌트에 비해 코드가 길어지고 복잡해지고 컴포넌트 재사용에 어려운 점이 있지만, State관리와 Life Cycle Method 사용이 가능하기에 선택적으로 사용하고 있었다.  
하지만 함수형 컴포넌트에 Hook을 사용함으로써 코드는 간결해지며 State관리와 Life Cycle Method 사용이 가능하게 되었다.  

## State Hook (useState)
가장 기본적인 Hook으로써, 함수형 컴포넌트에서도 State 관리를 가능하게 해준다.  
useState는 하나의 상태 값만 관리할수 있기때문에 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용가능하다.  

```js
import React, { useState } from 'react';

const Count = () => {
	const [ count, setCount ] = useState(0);

	return (
		<div>
			<span>Number : {count}</span>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}

ReactDOM.render(<Count />, document.getElementById('root'));
```

## Effect Hook (useEffect)
매 렌더링이 완료된 후에 실행되는 Hook으로 기존 `componentDidMount, componentDidUpdate, componentWillUnmount`와 같은 기능을 하고있다.


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