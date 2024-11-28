# [ffmpeg]()

## record screen and mic, saving video in MP4 and audio in mp3 files

```sh
ffmpeg -f x11grab -i "${DISPLAY}" -f alsa -i "" -map 0:v -f mp4 x11grab.1.mp4 -map 1:a -f mp3 alsa.1.mp3 
```

## record from screen

```sh
ffmpeg -f x11grab  -i "${DISPLAY}" x11grab.1.mp4
```

## extract images from a video

```sh
ffmpeg -i x11grab.1.mp4 -r 1 -f image2 image-%03d.jpeg
```

## let video's volume high

```sh
ffmpeg -i x11grab.1.mp4 -filter:a "volume=3" x11grab.2.mp4
```

## detect volume

```sh
ffmpeg -y -i input.mp3 -filter:a volumedetect output.mp3 
```

## join video and audio files

```sh
ffmpeg -i video.mp4 -i audio.mp3 video.audio.mp4
```
