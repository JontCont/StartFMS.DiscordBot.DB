const express = require('express');
const app = express();

// 引入路由
const learnJpIC = require('./src/learn-jp-individual-characters');

// 使用路由
app.use('/learn/jp', learnJpIC);

// 定義其他路由或中間件
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});