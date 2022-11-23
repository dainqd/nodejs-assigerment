Các bước khởi tạo project
1. Mở terminal và thực hiện các lệnh:
    - npm install
    - npm install sql
    - npm install mysql
    - npm install express
    - npm install ejs
    - npm install cors
    - npm install path

    Start Xampp và tạo db có tên là exam-nodejs
2. Tại terminal chạy lệnh chuyển đến thư mục app:
    - cd app
3. Tại thư mục app chạy lệnh chuyển đến thư mục database:
    - cd database
4. Tại thư mục database chạy lần lượt các lệnh sau:
   - node create_table.js
   - node insert_table.js
5. Lúc này db đã được tạo và bảng user kèm theo data đã được
chèn vào:
6.  Mở cửa sổ terminal mới và chạy lần lượt các lệnh sau:
    - cd app
    - cd config
    - node server.js
Lúc này server đã chạy và mở cổng: http://localhost:8888
7. Chúng ta cùng thực các api trong thư mục router nhé