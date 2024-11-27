# [ffmpeg]()

## record from screen

```sh
ffmpeg -f x11grab  -i "${DISPLAY}" input.mkv 
```

## extract images from a video:

```sh
ffmpeg -i input.mkv -r 1 -f image2 image-%03d.jpeg
```

## let volume high

```sh
ffmpeg -i input.mkv -filter:a "volume=3" output.mkv
```
