

ffmpeg \
  -f v4l2 -i /dev/video0 \
  -f x11grab -i :0 \
  -f alsa -i "" \
  -map 0:v -f mp4 v4l2.1.mp4 \
  -map 1:v -f mp4 x11grab.1.mp4 \
  -map 2:a -f mp3 alsa.1.mp3 


