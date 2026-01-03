const onOpenCvReady = () => {
  document.getElementById('buttonPlay').remove()

  const video = document.getElementById('videoInput')
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream
      video.play()
    })

  const src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
  const gray = new cv.Mat(video.height, video.width, cv.CV_8UC1)
  const dst = new cv.Mat(video.height, video.width, cv.CV_8UC1)
  const cap = new cv.VideoCapture(video)

  const processVideo = () => {
    try {
      cap.read(src)
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
      cv.Canny(gray, dst, 50, 150, 3, false)
      cv.imshow('canvasOutput', dst)
    } catch (err) {
      console.error(err)
    }
    requestAnimationFrame(processVideo)
  }

  requestAnimationFrame(processVideo)
}

document.getElementById('buttonPlay').addEventListener('click', onOpenCvReady)
