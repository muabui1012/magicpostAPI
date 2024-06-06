Backend Document: https://documenter.getpostman.com/view/31165624/2s9YsDjEmW

Chạy dự án ở localhost:
- Cài đặt NodeJS và NPM cho client (thư mục magic_)
	+ Mở 2 cửa sổ IDE, 1 IDE mở folder backend, 1 IDE mở folder frontend
	+ Ở IDE mở folder backend, chạy lệnh "npm install" rồi "npm run start:dev" ở terminal
	+ Ở IDE mở folder frontend, chạy lệnh "npm install" rồi "npm run dev" ở terminal
	+ Nếu thành công, app sẽ chạy ở đường dẫn http://127.0.0.1:5173/

- Cài đặt server backend (thư mục magicpost)
	- cài đặt xampp, copy thư mục magicpost vào thư mục htdocs của xampp
	- cài đặt php composer
		- cd vào thư mục magicpost
		- chạy cmd lệnh composer i
		- chạy cmd cài đặt laravel composer global require laravel/installer
		- setup lại file .env (bỏ đuôi .example của .env.example) 
		- khởi tạo cơ sở dữ liệu bằng lệnh: php artisan migrate hoặc sử dụng file cơ sơ dữ liệu backup import vào xampp
		- khởi tạo backend server bằng lệnh: php artisan serve



Tài khoản dùng thử:
	+ Department login (cục đăng kiểm): department ID: 123456, password: testing123
	+ Center login (trung tâm đăng kiểm): center ID: 654321, password: testing123
