const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello, Server!');
});

// 즐겨찾기 목록을 저장할 변수 (임시로 배열 사용)
let favorites = [];

// 즐겨찾기 목록 조회
app.get('/api/favorites', (req, res) => {

  res.json({ favorites });
});

// 즐겨찾기 목록 업데이트
app.post('/api/favorites', (req, res) => {
  const updatedFavorites = req.body.favorites;
  favorites = updatedFavorites;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// '즐겨찾기' 버튼을 누르면 데이터베이스에 정보를 저장하고, 
// 해당 정보를 즐겨찾기 메뉴에서 보여주려면 다음과 같은 단계를 따를 수 있습니다:

// 데이터베이스 연결 설정: MongoDB에 연결하기 위해 필요한 설정을 작성해야 
// 합니다. 이를 위해 MongoDB 클라이언트를 설치하고, 연결 정보를 얻어야 합니다.

// Express 애플리케이션에서 POST 요청 처리: 클라이언트에서 '즐겨찾기' 버튼을 
// 눌렀을 때, Express 애플리케이션의 적절한 라우트를 설정하여 POST 요청을 
// 처리해야 합니다. 요청으로부터 전송된 데이터를 받아와 MongoDB에 저장하는 
// 로직을 구현해야 합니다.

// 데이터베이스에 정보 저장: POST 요청을 처리하는 핸들러 함수에서, 받아온 
// 데이터를 MongoDB에 저장해야 합니다. MongoDB 클라이언트를 사용하여 
// 데이터베이스와 컬렉션에 접근하고, 데이터를 삽입하는 작업을 수행해야 합니다.

// 즐겨찾기 메뉴에서 정보 표시: 즐겨찾기 메뉴를 눌렀을 때, 서버에서 
// MongoDB에서 데이터를 조회하여 해당 정보를 가져와야 합니다. Express 
// 애플리케이션에서 GET 요청을 처리하는 핸들러 함수를 작성하여 MongoDB에서 
// 데이터를 검색하고, 클라이언트로 데이터를 응답해야 합니다.


// const express = require('express');
// const { MongoClient } = require('mongodb');
// const app = express();
// const mongoose = require('mongoose');
// const PORT = 8000;

// // MongoDB 연결 정보
// const uri = 'mongodb://localhost:27017'; // MongoDB 서버 URI
// const dbName = 'mydatabase'; // 사용할 데이터베이스 이름

// // 데이터베이스 모델 정의
// const Product = mongoose.model('Product', {
//   name: String,
//   price: Number,
// });

// // 미들웨어 설정
// app.use(express.json());

// // 라우트 설정
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // 데이터베이스 연결
// MongoClient.connect(uri, (err, client) => {
//   if (err) {
//     console.error('MongoDB 연결 실패:', err);
//     return;
//   }
//   console.log('MongoDB 연결 성공');

//   const db = client.db(dbName);

//   // 상품 조회 API
//   app.get('/products', (req, res) => {
//     // MongoDB에서 상품 데이터를 조회하고 클라이언트에 응답
//     Product.find()
//       .then((products) => {
//         res.status(200).json(products);
//       })
//       .catch((error) => {
//         console.error('상품 조회 오류:', error);
//         res.status(500).json({ error: '상품 조회 중 오류가 발생했습니다.' });
//       });
//   });

//   // 즐겨찾기 상품 추가 API
//   app.post('/shop/favorites', (req, res) => {
//     const { productId } = req.body;

//     // MongoDB에 데이터 저장
//     const favoriteProduct = new FavoriteProduct({ productId });
//     favoriteProduct
//       .save()
//       .then(() => {
//         console.log('상품이 즐겨찾기에 추가되었습니다.');
//         res.status(201).json({ message: '상품이 즐겨찾기에 추가되었습니다.' });
//       })
//       .catch((error) => {
//         console.error('상품 추가 오류:', error);
//         res.status(500).json({ error: '상품 추가 중 오류가 발생했습니다.' });
//       });
//   });

//   // 서버 실행
//   app.listen(PORT, () => {
//     console.log(`서버가 http://localhost:${PORT}/ 에서 실행 중입니다.`);
//   });

//   mongoose.connect('mongodb://localhost:27017/mydatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   mongoose.connection.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
//   mongoose.connection.once('open', () => {
//     console.log('MongoDB에 연결되었습니다.');
//   });
// });