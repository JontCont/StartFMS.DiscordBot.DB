# 使用官方 Node.js LTS 版本作為基礎映像
FROM node:lts-alpine

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝應用依賴
RUN npm install --production

# 複製應用程式碼
COPY . .

# 暴露應用運行的端口
EXPOSE 3000

# 使用非 root 用戶來運行應用
RUN chown -R node /usr/src/app
USER node

# 啟動應用
CMD ["node", "index.js"]