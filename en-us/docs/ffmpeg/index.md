# [ffmpeg]()

## record screen and mic, saving video in MP4 and audio in mp3 files

```sh
ffmpeg -y -t 10 -f x11grab -i "${DISPLAY}" -f alsa -i "" -map 0:v -f mp4 x11grab.1.mp4 -map 1:a -f mp3 alsa.1.mp3 
```

## record from screen

```sh
ffmpeg -f x11grab  -i "${DISPLAY}" input.mkv 
```

## extract images from a video

```sh
ffmpeg -i input.mkv -r 1 -f image2 image-%03d.jpeg
```

## let video's volume high

```sh
ffmpeg -i input.mkv -filter:a "volume=3" output.mkv
```
