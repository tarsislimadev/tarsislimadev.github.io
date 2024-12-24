
datetime=$( date +%Y%m%d%H%M%S )

ffmpeg \
  -f v4l2 -i /dev/video0 \
  -f x11grab -i :0 \
  -f alsa -i "" \
  -map 0:v -map 2:a -f mp4 "v4l2+alsa.${datetime}.mp4" \
  -map 1:v -f mp4 "x11grab.${datetime}.mp4"
