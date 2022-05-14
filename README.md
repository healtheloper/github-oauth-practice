# Easy Github OAuth Server

### 05.14

- OAuth 사용 전 로그인-회원가입, 로그인된 유저 바탕으로 Post 받기 제작
  - DB 설정을 따로 하지않고 fake array 를 사용하고있어 서버가 재시작되면 배열이 초기화되므로 이점 유의

### `login`

- 로그인시 token 반환

### `/uploadComment`

- header 에 Authorization : 'token ~~' 을 넘겨줘야 사용가능
- token ~~ 에 ~~ 는 회원가입-로그인 로직에서, 로그인 한 이후 response 로 받는 token 을 저장해서 headers 에 추가하여 보내면 됨
