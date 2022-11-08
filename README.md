# 요구 사항 분석

## 1. 유저

1. 회원가입 및 로그인

- 회원 가입: 기본 정보를 통해 등록
- 로그인: 이메일 및 패스워드를 통해 로그인

### 요청

1. 회원가입

- Functional
- api: POST /auth/signUp 혹은 POST /auth/signIn

## 2. 셀러

### Functional

#### 1. 입점 등록

- api: POST /seller/register

#### 2. 셀러 상품 등록

- api: POST /seller/product
- e.g. https://www.croket.co.kr/seller/product/form

#### 3. 셀러 상품 수정

- api: PATCH /seller/product/:id
- path parameter: id - 상품 아이디

#### 4. 셀러 상품 삭제

- api: DELETE /seller/product/:id
- path parameter: id - 상품 아이디
## 3. 상품

### 1. C

### 2. R

- api: **GET /market**
- query: page
- e.g. https://www.croket.co.kr/market

#### Functions

1. search
> - query
> 1. 상품명: name
> 2. 카테고리: category
> 3. 국가별: nation
> 
> e.g. https://www.croket.co.kr/market?inputText=%ED%95%9C%EA%B5%AD&yg_type=web_search&yg_method=%ED%95%9C%EA%B5%AD  
> 크로켓의 경우 텍스트 하나로 서치를 구현함

2. filter
> 1. 카테고리
> 2. 국가별
> 
> e.g. **카테고리** - https://www.croket.co.kr/market?category=%5B%7B%22mainCategory%22%3A%22%EC%8A%A4%ED%82%A8%2F%EB%B0%94%EB%94%94%2F%ED%97%A4%EC%96%B4%22%7D%5D  
> e.g. **국가별** - https://www.croket.co.kr/market?nation=%5B%22US%22,%22NZ%22%5D

3. order
> query: sortType
> 1. 최신순 - 기본값
> 2. 주문 마감일 순: orderDeadline
>
> e.g. **인기순** - https://www.croket.co.kr/market?sortType=%EC%9D%B8%EA%B8%B0%EC%88%9C

### 3. U

- [상품 수정](#3-셀러-상품-수정)

### 4. D

- [상품 삭제](#4-셀러-상품-삭제)

# DB Model

## 1. 유저(User)

- id: 유저 고유 아이디
- email, password: password는 암호화하여 저장
- userType: 일반 이용자, 셀러, 어드민
- createdAt, updatedAt, deletedAt: 데이트 컬럼

## 2. 마켓(Market)

- id: 셀러 고유 아이디
- name: 입점 점포 명
- description: 점포 소개
- createdAt, updatedAt, deletedAt: 데이트 컬럼

## 3. 상품(Products)
- id: 상품 고유 아이디
- name: 상품명
- description: 상품 설명
- price: 가격
- category: 카테고리
- nation: 국가
- orderDeadline: 주문 마감일

# 활용 기술스택

- Language: Typescript
- Runtime: Node.js
- Framework: NestJS
- Environment: NodeJS
- NoSQL: MongoDB
- ORM: Prisma
- Package Manager: yarn
- Etcs: Github Actions

# 기타

