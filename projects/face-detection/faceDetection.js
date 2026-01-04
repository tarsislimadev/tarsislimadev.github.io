
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let streaming = false;
let faceCascade;
let eyeCascade;
let src;
let gray;
let faces;
let eyes;

function onOpenCvReady() {
    console.log('OpenCV is ready.');
    cv.onRuntimeInitialized = () => {
        console.log('OpenCV runtime is initialized.');
        faceCascade = new cv.CascadeClassifier();
        eyeCascade = new cv.CascadeClassifier();
        // Load pre-trained classifiers
        let faceCascadeFile = 'haarcascade_frontalface_default.xml';
        let eyeCascadeFile = 'haarcascade_eye.xml';
        createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            faceCascade.load(faceCascadeFile);
        });
        createFileFromUrl(eyeCascadeFile, eyeCascadeFile, () => {
            eyeCascade.load(eyeCascadeFile);
        });
        startCamera();
    };
}

function startCamera() {
    if (streaming) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            streaming = true;
            video.addEventListener('canplay', onVideoCanPlay, false);
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
}

function onVideoCanPlay() {
    if (streaming) {
        src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        gray = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        faces = new cv.RectVector();
        eyes = new cv.RectVector();
        setTimeout(processVideo, 0);
    }
}

function processVideo() {
    try {
        if (!streaming) {
            // clean and stop.
            src.delete();
            gray.delete();
            faces.delete();
            eyes.delete();
            return;
        }
        let begin = Date.now();
        // start processing.
        ctx.drawImage(video, 0, 0, video.width, video.height);
        src.data.set(ctx.getImageData(0, 0, video.width, video.height).data);
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        // detect faces.
        faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);
        for (let i = 0; i < faces.size(); ++i) {
            let roiGray = gray.roi(faces.get(i));
            let roiSrc = src.roi(faces.get(i));
            let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
            cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
            // detect eyes in face ROI.
            eyeCascade.detectMultiScale(roiGray, eyes);
            for (let j = 0; j < eyes.size(); ++j) {
                let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
                let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height);
                cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
            }
            roiGray.delete();
            roiSrc.delete();
        }
        cv.imshow('canvas', src);
        // schedule the next one.
        let delay = 1000 / 30 - (Date.now() - begin);
        setTimeout(processVideo, delay);
    } catch (err) {
        console.log(err);
    }
};

function createFileFromUrl(path, url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function (ev) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = new Uint8Array(request.response);
                cv.FS_createDataFile('/', path, data, true, false, false);
                callback();
            } else {
                console.error('Failed to load ' + url + ' status: ' + request.status);
            }
        }
    };
    request.send();
}
