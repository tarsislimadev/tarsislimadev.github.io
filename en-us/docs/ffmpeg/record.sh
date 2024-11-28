ffmpeg \
  -f x11grab -i :0 \
  -f alsa -i "" \
  -f v4l2 -i /dev/video0 \
  -map 0:v -f mp4 x11grab.1.mp4 \
  -map 1:a -f mp3 alsa.1.mp3 \
  -map 2:v -f mp4 v4l2.1.mp4 
