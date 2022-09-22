# What is this project?

## 개 요
설문조사 혹은 투표를 진행할 수 있는 웹 사이트입니다.

## 개발 의도
프로그램을 포함한 모든 서비스는 고객의 의견을 수용함으로써 더욱 발전해나갑니다.  
이에 고객과의 대표적인 소통 방식인 '설문조사' 혹은 '투표' 서비스를 구현해보았습니다.

## 사용 스킬
### REACT
본인 인증이나 투표 진행, 투표 결과 확인과 같은 여러 작업을 페이지 이동 없이 수행합니다.  
state 문법을 통해 원하는 컴포넌트를 필요할 때마다 렌더링하는 'Single Page Application' 입니다.

### SCSS
SCSS의 최대 강점인 재사용이나 변수 선언 등의 문법은 사용하지 않았습니다.  
그러나 Nested 구조로 작성된 코드를 유지보수하는 과정에서 충분히 강점을 느꼈습니다.

### Axios
서버와의 통신을 위해 사용하였습니다. 
필요할 때마다 원하는 데이터를 동적으로 받아올 수 있어 마찬가지로  'Single Page Application' 구현에 도움을 주었습니다.  

### Spring
클라이언트 요청에 따라 적절한 데이터를 내려줄 서버를 구현하였습니다.  
사실 본 프로젝트는 휴대폰 번호로 본인을 인증하고, 간단한 투표를 진행하는 정도라 통신에 보안을 적용할 필요는 없습니다.  
속도가 빠른 GET 방식만으로도 충분히 구현이 가능하였으나 POST 방식으로도 구현하여 기본 소양을 갖췄음을 증명하였습니다.

### Oracle DB
중복 투표 방지를 위한 인증에 필요한 정보와 투표 진행 정보를 저장하는 데이터베이스로 Oracle사의 제품을 사용하였습니다.
JDBC를 이용하여 접근하는 로직을 구현하였습니다.


## 고 찰
### Github issue
Github의 원격 저장소에 데이터를 push하고, 원격 저장소로부터 데이터를 pull 하는 명령은 분명 다룰 줄 알고 있었습니다.  
그런데 제대로 데이터가 push 되지 않는 오류가 종종 발생하였고, 그 원인은 아래와 같았습니다.

1. 원격 저장소에 있는 파일/폴더가 로컬 저장소에 없는 경우 ( 혹은 그 반대도 성립 )
    - git pull origin main : 우선 데이터를 로컬로 pull해서 프로젝트 구성을 맞추어 해결할 수 있습니다.
    - git pull origin main --allow-u-nrealted-histories  : 서로 구성이 다른 로컬 저장소와 원격 저장소의 두 프로젝트를 병합하여 구성을 통일시켜 해결할 수도 있습니다.  

2. 원격 저장소에 업로드는 되나, 화살표 표시가 뜨며 정상적으로 업로드되지 않는 경우
    - git init을 통해 최상위 디렉터리에 .git 파일이 생성되었으나 하위 디렉토리에서 push하는 과정 중에 .git 파일이 중복으로 생성되어 발생한 오류입니다. 
    - 우선, 문제가 발생한 해당 디렉터리로 이동하여 .git 파일을 삭제합니다. ( 숨겨져 있으므로 주의 )
    - 스테이지 영역에서도 내려주고  ( git rm --cached . -rf )
    - 이후 정상적인 파일을 commit하여 push하는 것으로 해결할 수 있습니다.

### CSS Selector
input 태그에 무엇이 입력되어야 하는 지를 안내하는 placeholder에도 스타일을 적용할 수 있다는 사실을 알게 되었습니다.  
::placeholder 선택자로 글꼴과 색상을 동적으로 조작하여 디자인하였습니다.

### Parameter
POST 요청에는 반드시 들어가야 하는 요소인 Parameter를 GET 요청에서도 전달할 수 있습니다.  
axios를 이용하여 요청을 보낼 때, POST와 같은 방식으로 Parameter를 전송하려고 하니 오류가 발생하였습니다.  
axios.get(URL,{ params : { "key" : "value" } }) 형식으로 전송하여 오류를 수정하였습니다.  
덧붙여 POST 요청은 axios.post(URL,{"key":"value"}) 형식으로 전송합니다.  
GET 요청의 Parameter는 서버에서 @RequestParam으로, POST 요청은 @RequestBody로 받아 사용할 수 있습니다.

### Maximun
가장 득표 수가 많은 데이터에 대해 붉은 배경색을 입혀 강조할 계획이었습니다.  
state를 이용하여 최대 value를 가진 데이터의 index를 저장하고, 해당 데이터에 스타일을 입혀보았으나 원치 않는 결과가 발생하였습니다.  
잠시 후에 결과 창을 다시 렌더링하면 그제서야 의도했던 결과가 나왔습니다.  
원인을 찾고 수정할 계획입니다.