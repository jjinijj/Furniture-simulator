# ❓ React 핵심 개념 Q&A 가이드

**작성일:** 2025년 12월 23일  
**목적:** useEffect, State, TypeScript 핵심 개념 이해  
**난이도:** ⭐⭐⭐☆☆

---

## 📋 목차

1. [useEffect의 return (Cleanup)](#질문-1-useeffect의-return)
2. [마운트(Mount)란?](#질문-2-마운트란)
3. [setState 함수형 vs 직접](#질문-3-setstate-함수형-vs-직접)
4. [TypeScript 타입 정의](#질문-4-typescript-타입-정의)
5. [따옴표 선택](#질문-5-따옴표-선택)

---

## 질문 1: useEffect의 return

### return은 언제 실행되나?

```tsx
useEffect(() => {
  console.log('1. useEffect 실행');
  
  return () => {
    console.log('2. Cleanup 실행');
  };
}, []);
```

---

### 실행 시점 3가지

#### Case 1: 컴포넌트가 사라질 때 (Unmount)

```tsx
function App() {
  const [show, setShow] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShow(!show)}>토글</button>
      {show && <MyComponent />}
    </div>
  );
}

function MyComponent() {
  useEffect(() => {
    console.log('마운트!');
    
    return () => {
      console.log('언마운트! return 실행됨');
    };
  }, []);
  
  return <div>Hello</div>;
}
```

**동작:**
```
토글 버튼 클릭 (show = false)
→ MyComponent 화면에서 사라짐
→ return 함수 실행!
```

---

#### Case 2: 의존성 배열 변경 시

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect 실행, count:', count);
    
    return () => {
      console.log('Cleanup 실행, 이전 count:', count);
    };
  }, [count]);  // count가 변경될 때마다
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**동작 순서:**
```
초기: count = 0
→ useEffect 실행 (count: 0)

버튼 클릭: count = 1
→ return 실행 (이전 count: 0)  ← Cleanup!
→ useEffect 재실행 (count: 1)

버튼 클릭: count = 2
→ return 실행 (이전 count: 1)  ← Cleanup!
→ useEffect 재실행 (count: 2)
```

---

#### Case 3: Strict Mode 테스트 (개발 중)

```tsx
useEffect(() => {
  console.log('실행!');
  
  return () => {
    console.log('Cleanup!');
  };
}, []);
```

**개발 모드 (Strict Mode ON):**
```
1. 실행!
2. Cleanup!    ← 테스트용
3. 실행!       ← 다시 실행
```

**프로덕션 빌드:**
```
1. 실행!       ← 한 번만
```

---

### Cleanup이 필요한 경우

#### 1. 타이머 정리

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('1초마다 실행');
  }, 1000);
  
  // 컴포넌트 사라질 때 타이머 정리 필수!
  return () => {
    clearInterval(timer);
  };
}, []);
```

**Cleanup 없으면:**
```
컴포넌트 사라짐
→ 타이머는 계속 실행 중
→ 메모리 누수!
→ 에러 발생 가능!
```

---

#### 2. 이벤트 리스너 제거

```tsx
useEffect(() => {
  const handleScroll = () => {
    console.log('스크롤 중');
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

#### 3. API 요청 취소

```tsx
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(response => response.json())
    .then(data => console.log(data));
  
  return () => {
    controller.abort();  // 요청 취소
  };
}, []);
```

---

### 핵심 정리

**return 실행 = 정리(Cleanup) 시점**

```
✅ 컴포넌트 사라질 때 (Unmount)
✅ 의존성 배열 변경되기 전
✅ Strict Mode 테스트 (개발 중만)

항상 필요한 것은 아님:
- 타이머: 필수! ⭐
- 이벤트 리스너: 필수! ⭐
- API 요청: 권장
- 단순 로그: 불필요
```

---

## 질문 2: 마운트란?

### 컴포넌트 생명주기 (Lifecycle)

```
1. Mount (마운트): 탄생 🐣
2. Update (업데이트): 변화 🔄
3. Unmount (언마운트): 소멸 💀
```

---

### Mount (마운트) - 탄생 🐣

**컴포넌트가 처음 화면에 나타나는 순간!**

```tsx
function App() {
  return (
    <div>
      <Header />      {/* ← Mount! */}
      <Content />     {/* ← Mount! */}
    </div>
  );
}
```

**실행 순서:**
```
1. 컴포넌트 함수 실행
2. JSX 생성
3. 화면에 렌더링 (Mount!)
4. useEffect (의존성 []) 실행
```

---

### Update (업데이트) - 변화 🔄

**State나 Props가 변경되는 순간!**

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // count 변경 → Update!
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

**실행 순서:**
```
1. State 변경
2. 컴포넌트 재실행 (Re-render)
3. 화면 업데이트 (Update!)
4. useEffect (의존성 배열에 해당 값) 실행
```

---

### Unmount (언마운트) - 소멸 💀

**컴포넌트가 화면에서 사라지는 순간!**

```tsx
function App() {
  const [show, setShow] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        토글
      </button>
      
      {show && <MyComponent />}  {/* ← 조건부 렌더링 */}
    </div>
  );
}
```

**실행 순서:**
```
show = false로 변경
→ MyComponent 제거됨 (Unmount!)
→ useEffect의 return (Cleanup) 실행
→ 컴포넌트 완전히 사라짐
```

---

### useEffect와 생명주기

#### Mount 시에만 실행

```tsx
useEffect(() => {
  console.log('🐣 Mount: 처음 나타날 때만!');
  
  // API 호출, 초기 설정 등
  fetchData();
}, []);  // ← 빈 배열!
```

---

#### Update 시 실행

```tsx
useEffect(() => {
  console.log('🔄 Update: count 변경될 때마다!');
}, [count]);  // ← count 감시
```

---

#### Unmount 시 실행

```tsx
useEffect(() => {
  return () => {
    console.log('💀 Unmount: 사라질 때!');
    // 정리 작업
  };
}, []);
```

---

#### 전체 생명주기 예시

```tsx
function LifecycleExample() {
  const [count, setCount] = useState(0);
  
  // Mount
  useEffect(() => {
    console.log('🐣 Mount');
  }, []);
  
  // Mount + Update (count 변경 시)
  useEffect(() => {
    console.log('🔄 Update: count =', count);
  }, [count]);
  
  // Unmount
  useEffect(() => {
    return () => {
      console.log('💀 Unmount');
    };
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**실행 순서:**
```
컴포넌트 나타남:
→ 🐣 Mount
→ 🔄 Update: count = 0

버튼 클릭 (count = 1):
→ 🔄 Update: count = 1

버튼 클릭 (count = 2):
→ 🔄 Update: count = 2

컴포넌트 사라짐:
→ 💀 Unmount
```

---

### 핵심 정리

```
Mount (마운트):
- 컴포넌트가 처음 화면에 나타남
- useEffect(fn, []) 실행

Update (업데이트):
- State/Props 변경
- 재렌더링
- useEffect(fn, [deps]) 실행

Unmount (언마운트):
- 컴포넌트가 화면에서 제거
- useEffect의 return (Cleanup) 실행
```

---

## 질문 3: setState 함수형 vs 직접

### 두 가지 방식

```tsx
const [count, setCount] = useState(0);

// 방식 1: 직접 업데이트
setCount(count + 1);

// 방식 2: 함수형 업데이트
setCount(c => c + 1);
         ↑    ↑
      이전값  새값
```

---

### 차이점

#### Case 1: 일반 상황 (동일)

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* 둘 다 정상 작동 */}
      <button onClick={() => setCount(count + 1)}>
        방식 1: {count}
      </button>
      
      <button onClick={() => setCount(c => c + 1)}>
        방식 2: {count}
      </button>
    </div>
  );
}
```

**결과:** 둘 다 똑같이 1씩 증가 ✅

---

#### Case 2: 연속 업데이트 (다름!) ⚠️

```tsx
function MultiUpdate() {
  const [count, setCount] = useState(0);
  
  const handleBad = () => {
    setCount(count + 1);  // count = 0 → 1
    setCount(count + 1);  // count = 0 → 1 (같은 값!)
    setCount(count + 1);  // count = 0 → 1 (같은 값!)
    // 결과: 1 ❌
  };
  
  const handleGood = () => {
    setCount(c => c + 1);  // 0 → 1
    setCount(c => c + 1);  // 1 → 2
    setCount(c => c + 1);  // 2 → 3
    // 결과: 3 ✅
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleBad}>잘못된 방식</button>
      <button onClick={handleGood}>올바른 방식</button>
    </div>
  );
}
```

**왜 다른가?**
```
직접 방식:
- count 변수 값을 그대로 사용 (0으로 고정)
- 세 번 호출해도 모두 같은 값 (0 + 1)

함수형 방식:
- 이전 값을 받아서 사용 (최신 값)
- 첫 번째: 0 + 1 = 1
- 두 번째: 1 + 1 = 2
- 세 번째: 2 + 1 = 3
```

---

#### Case 3: setInterval에서 (중요!) ⭐⭐⭐

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // ❌ 잘못된 방식 - 버그 발생!
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setSeconds(seconds + 1);  // seconds는 0으로 고정!
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isRunning]);  // seconds를 의존성에 안 넣음
  
  // 결과: 0 → 1 → 1 → 1 ... (계속 1!)
}
```

**문제:**
```
useEffect 실행 시점에 seconds = 0
→ setInterval 안에서 계속 seconds = 0 사용
→ 0 + 1 = 1만 반복!
```

---

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // ✅ 올바른 방식 - 함수형 업데이트!
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setSeconds(s => s + 1);  // 항상 최신 값 사용!
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isRunning]);
  
  // 결과: 0 → 1 → 2 → 3 ... (정상!)
}
```

**해결:**
```
함수형 업데이트 사용
→ 항상 최신 seconds 값을 받아옴
→ 정상적으로 증가!
```

---

### 실전 비교

| 상황 | 직접 방식 | 함수형 방식 | 추천 |
|------|----------|------------|------|
| 일반 클릭 | ✅ OK | ✅ OK | 둘 다 |
| 연속 업데이트 | ❌ 버그 | ✅ OK | 함수형 |
| setInterval | ❌ 버그 | ✅ OK | 함수형 |
| setTimeout | ❌ 버그 | ✅ OK | 함수형 |
| 이벤트 리스너 | ⚠️ 주의 | ✅ OK | 함수형 |

---

### 언제 함수형을 써야 하나?

**필수:**
```tsx
// 타이머
setInterval(() => setState(s => s + 1), 1000);  ✅

// 연속 업데이트
setState(s => s + 1);
setState(s => s + 1);  ✅

// 이벤트 리스너
window.addEventListener('scroll', () => {
  setState(s => s + 1);  ✅
});
```

**선택:**
```tsx
// 일반 클릭
<button onClick={() => setState(state + 1)}>  ✅
<button onClick={() => setState(s => s + 1)}>  ✅
```

---

### 핵심 정리

```
일반 상황:
setCount(count + 1)       ✅ OK
setCount(c => c + 1)      ✅ OK (더 안전)

타이머/연속 업데이트:
setCount(count + 1)       ❌ 버그!
setCount(c => c + 1)      ✅ 필수!

기억할 것:
- 타이머에서는 항상 함수형!
- 이전 값 기반 업데이트는 함수형!
- 헷갈리면 함수형 사용하면 안전!
```

---

## 질문 4: TypeScript 타입 정의

### 코드 분석

```tsx
let interval: NodeJS.Timeout | null = null;
```

---

### 분해하기

```tsx
let interval
    ↓
  변수명

: NodeJS.Timeout | null
  ↓              ↓    ↓
타입1         또는  타입2

= null
  ↓
초기값
```

---

### 각 요소 설명

#### 1. NodeJS.Timeout

```tsx
// setInterval, setTimeout의 반환 타입
const timer: NodeJS.Timeout = setInterval(() => {
  console.log('실행');
}, 1000);

// 브라우저 환경에서는:
const timer: number = setInterval(() => {}, 1000);

// Node.js 환경에서는:
const timer: NodeJS.Timeout = setInterval(() => {}, 1000);
```

**React는 Node.js 타입 사용!**

---

#### 2. | (파이프) - Union Type

```tsx
// "A 또는 B" 의미
string | number           // 문자열 또는 숫자
true | false              // boolean
'red' | 'blue' | 'green'  // 3가지 색상 중 하나
NodeJS.Timeout | null     // Timeout 또는 null
```

**예시:**
```tsx
let value: string | number;

value = "hello";    // ✅ OK (string)
value = 123;        // ✅ OK (number)
value = true;       // ❌ 에러! (boolean 불가)
```

---

#### 3. null

```tsx
// "값이 없음"
let value: string | null = null;

value = "hello";  // ✅ OK
value = null;     // ✅ OK
value = 123;      // ❌ 에러! (number 불가)
```

---

### 전체 의미

```tsx
let interval: NodeJS.Timeout | null = null;
```

**해석:**
```
interval 변수는:
- NodeJS.Timeout 타입이거나
- null 값일 수 있다
- 초기값은 null
```

---

### 실전 사용 예시

```tsx
function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  
  // 타이머 저장 변수
  let interval: NodeJS.Timeout | null = null;
  
  useEffect(() => {
    if (isRunning) {
      // interval에 Timeout 할당
      interval = setInterval(() => {
        console.log('실행');
      }, 1000);
    }
    
    return () => {
      // null 체크 후 정리
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);
}
```

---

### 왜 null을 포함하나?

```tsx
// 처음에는 타이머 없음
let interval: NodeJS.Timeout | null = null;

// 나중에 타이머 생성
if (isRunning) {
  interval = setInterval(() => {}, 1000);
}

// 정리할 때 null 체크
if (interval !== null) {  // null이 아닐 때만
  clearInterval(interval);
}
```

**만약 null을 포함 안 하면:**
```tsx
let interval: NodeJS.Timeout;  // null 불가능

interval = null;  // ❌ 에러!
// Type 'null' is not assignable to type 'NodeJS.Timeout'
```

---

### TypeScript 없이 JavaScript라면?

```javascript
// 타입 없음
let interval = null;

if (isRunning) {
  interval = setInterval(() => {}, 1000);
}

// null이어도 에러 안 남 (위험!)
clearInterval(interval);
```

**문제:**
```
interval이 null일 때
clearInterval(null) 호출
→ JavaScript는 에러 안 나지만
→ 의도한 동작이 아닐 수 있음
```

---

### 다른 Union Type 예시

#### 여러 타입 조합

```tsx
// 문자열 또는 숫자
let id: string | number;
id = "ABC123";  // ✅
id = 456;       // ✅

// 특정 문자열들
let color: 'red' | 'blue' | 'green';
color = 'red';     // ✅
color = 'yellow';  // ❌ 에러!

// 배열 또는 null
let items: string[] | null;
items = ['a', 'b'];  // ✅
items = null;        // ✅
```

---

### 핵심 정리

```tsx
let interval: NodeJS.Timeout | null = null;
              ↓                ↓      ↓
          타이머 타입        또는    초기값

의미:
- interval은 타이머 또는 null
- 처음엔 null (타이머 없음)
- 나중에 타이머 할당 가능
- null 체크 후 사용

Union Type:
- A | B = "A 또는 B"
- 여러 타입 조합 가능
- TypeScript의 강력한 기능
```

---

## 질문 5: 따옴표 선택

### 세 가지 방식

```tsx
// 1. 작은따옴표 (Single Quote)
const name = 'React';
<button className='btn'>클릭</button>

// 2. 큰따옴표 (Double Quote)
const name = "React";
<button className="btn">클릭</button>

// 3. 백틱 (Backtick / Template Literal)
const name = `React`;
<button className={`btn`}>클릭</button>
```

---

### 결론: 모두 똑같아요! ✅

```javascript
'hello' === "hello" === `hello`  // true

// 문자열로서 완전히 동일
console.log('React');   // React
console.log("React");   // React
console.log(`React`);   // React
```

---

### 차이점: 백틱만 특별!

#### 변수 삽입 (Template Literal)

```tsx
const name = 'React';
const version = 18;

// ❌ 작은따옴표/큰따옴표 - 변수 삽입 불가
const message1 = 'Hello ${name}!';
console.log(message1);  // "Hello ${name}!" (그대로)

const message2 = "Hello ${name}!";
console.log(message2);  // "Hello ${name}!" (그대로)

// ✅ 백틱 - 변수 삽입 가능!
const message3 = `Hello ${name}!`;
console.log(message3);  // "Hello React!"

const info = `${name} version ${version}`;
console.log(info);  // "React version 18"
```

---

#### 여러 줄 문자열

```tsx
// ❌ 작은따옴표/큰따옴표 - 에러
const text1 = 'Hello
World';  // ❌ SyntaxError

// 이렇게 해야 함
const text2 = 'Hello\nWorld';

// ✅ 백틱 - 여러 줄 가능
const text3 = `Hello
World
!`;
console.log(text3);
// Hello
// World
// !
```

---

### React에서 사용

#### 정적 문자열 (모두 동일)

```tsx
// 모두 정상 작동
<button className='btn'>A</button>
<button className="btn">B</button>
<button className={`btn`}>C</button>
```

---

#### 동적 클래스명 (백틱 추천!)

```tsx
const color = 'green';

// ❌ 작은따옴표/큰따옴표 - 변수 사용 불가
<button className='btn btn-${color}'>버튼</button>
// 결과: class="btn btn-${color}" (그대로!)

// ✅ 문자열 결합
<button className={'btn btn-' + color}>버튼</button>
// 결과: class="btn btn-green"

// ✅ 백틱 (가장 깔끔!)
<button className={`btn btn-${color}`}>버튼</button>
// 결과: class="btn btn-green"
```

---

#### 복잡한 조합

```tsx
const variant = 'primary';
const size = 'large';
const disabled = true;

// 문자열 결합 (복잡!)
<button 
  className={
    'btn btn-' + variant + ' btn-' + size + 
    (disabled ? ' disabled' : '')
  }
>
  버튼
</button>

// 백틱 (깔끔!)
<button 
  className={`btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`}
>
  버튼
</button>
```

---

### 프로젝트 스타일 가이드

#### Airbnb 스타일 가이드 (인기)

```tsx
// 작은따옴표 추천
const name = 'React';
<button className='btn' />

// 백틱은 변수 삽입 시에만
const message = `Hello ${name}`;
```

---

#### Prettier 기본값

```tsx
// 큰따옴표
const name = "React";
<button className="btn" />
```

---

#### Google 스타일 가이드

```tsx
// 작은따옴표
const name = 'React';
```

---

### 혼용 가능?

```tsx
// 같은 파일에서 섞어 써도 작동함
const name = 'React';
const version = "18";
const message = `Hello ${name}`;

// 하지만 비추천!
// ⚠️ 일관성 없어 보임
// ⚠️ ESLint 경고 발생 가능
```

---

### ESLint 설정

**.eslintrc.json:**
```json
{
  "rules": {
    "quotes": ["error", "single"]  // 작은따옴표 강제
    // 또는
    "quotes": ["error", "double"]  // 큰따옴표 강제
  }
}
```

**Prettier 설정 (.prettierrc):**
```json
{
  "singleQuote": true  // 작은따옴표 사용
}
```

---

### 실전 권장사항

#### 기본 문자열: 작은따옴표 또는 큰따옴표

```tsx
// 일관성 있게 하나만 선택
const name = 'React';
const greeting = 'Hello';
<button className='btn' />
```

---

#### 변수 삽입: 백틱

```tsx
const name = 'React';
const message = `Welcome to ${name}!`;
<div className={`container ${isActive ? 'active' : ''}`} />
```

---

#### ESLint 따르기

```
프로젝트에 ESLint 설정 있으면 그대로 따르기
→ 자동 포맷팅 (Prettier)
→ 팀 컨벤션 유지
```

---

### 핵심 정리

```
문자열만:
'hello' = "hello" = `hello`  (동일)

변수 삽입:
`Hello ${name}`  ✅ (백틱만 가능)
'Hello ${name}'  ❌ (그대로 출력)
"Hello ${name}"  ❌ (그대로 출력)

권장:
- 기본: 작은따옴표 또는 큰따옴표
- 변수 삽입: 백틱
- 일관성 유지!
- ESLint 설정 따르기
```

---

## 📊 전체 요약

### 5가지 핵심 개념

#### 1. useEffect return
```
- Cleanup 함수
- 컴포넌트 사라질 때
- 의존성 변경 전
- 타이머/리스너 정리 필수
```

#### 2. 마운트
```
Mount: 🐣 탄생 (첫 렌더링)
Update: 🔄 변화 (재렌더링)
Unmount: 💀 소멸 (제거)
```

#### 3. setState
```
일반: 둘 다 OK
타이머: 함수형 필수!
setCount(c => c + 1)
```

#### 4. TypeScript 타입
```
NodeJS.Timeout | null
= Timeout 또는 null
Union Type (A | B)
```

#### 5. 따옴표
```
' = " = ` (동일)
변수 삽입: ` (백틱만 가능)
일관성 유지!
```

---

## 🎓 학습 체크리스트

```
□ useEffect return이 언제 실행되는지 이해
□ Cleanup이 필요한 경우 구분 가능
□ Mount/Update/Unmount 개념 이해
□ setState 함수형 업데이트의 필요성 이해
□ 타이머에서 함수형 사용 필수 인지
□ TypeScript Union Type 이해
□ null 체크 필요성 이해
□ 백틱의 변수 삽입 기능 이해
□ 프로젝트에서 일관된 따옴표 사용
```

---

## 💡 추가 학습 자료

### 공식 문서

**React:**
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)

**TypeScript:**
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Type Annotations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

**JavaScript:**
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

---

## 🎯 실습 과제

### 1. Cleanup 연습

타이머가 있는 컴포넌트를 만들고 제거해보기

### 2. 함수형 setState 연습

setInterval에서 함수형 업데이트 사용해보기

### 3. Union Type 연습

여러 타입을 조합하는 타입 만들어보기

### 4. 템플릿 리터럴 연습

동적 클래스명 만들어보기

---

**문서 버전:** 1.0  
**마지막 업데이트:** 2025년 12월 23일  
**작성자:** Claude (Anthropic)  
**프로젝트:** Furniture Simulator - React 학습

**Happy Learning! 🚀**
