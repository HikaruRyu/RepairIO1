start-compose:
	docker compose build --no-cache
	docker compose up -d
start-docker:
	docker build -t test_rtmp .
#	docker run -it --rm -d -p 8080:80 -p 1935:1935 --name test_rtmp test_rtmp
	docker run -it --rm -p 8090:80 -p 1935:1935 -p 8088:8088 --name test_rtmp -v ./files/stream_server/nginx.conf:/etc/nginx/nginx.conf  \
	-v ./files/stream_server/index.html:/usr/share/nginx/html/index.html  \
	-v ./files/stream_server/rtmp:/etc/nginx/sites-available/rtmp -d test_rtmp 
	ffmpeg -re -i videos/Template_Video_Moov2.mp4  -c:v copy -c:a aac -ar 44100 -ac 1 -f flv rtmp://localhost/live/stream
start-composer:
	docker compose build --no-cache
	docker compose up -d
	ffmpeg -re -i videos/Template_Video_Moov2.mp4  -c:v copy -c:a aac -ar 44100 -ac 1 -f flv rtmp://localhost/live/stream