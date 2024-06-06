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
		- khởi tạo backend server bằng lệnh: php artisan server

Screenshots:
![vlcsnap-2024-06-06-16h14m29s390](https://github.com/muabui1012/magicpostAPI/assets/39801919/5b7ae23f-cdea-45ea-8916-abc1f6b783bd)

![vlcsnap-2024-06-06-16h15m00s854](https://github.com/muabui1012/magicpostAPI/assets/39801919/b0af1a00-07c2-44e3-921c-22008663f508)

![Uploading vlcsnap-2024-06-06-16h15m14s950.png…]()

