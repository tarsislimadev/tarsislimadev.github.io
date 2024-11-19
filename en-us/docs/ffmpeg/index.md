# ffmpeg

## for extracting images from a video:

```sh
ffmpeg -i <filename of video> -r 1 -f image2 image-%03d.jpeg
```
