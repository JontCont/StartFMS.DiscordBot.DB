const express = require('express');
const app = express();

// 使用路由
app.use('/learn/jp', require('./src/learn-jp-individual-characters'));
app.use('/', require('./src/tiket'));

// 定義其他路由或中間件
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});