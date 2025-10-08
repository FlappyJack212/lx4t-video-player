// Screen Recorder - LX4T Platform
let mediaRecorder;
let recordedChunks = [];
let stream;
let timerInterval;
let startTime;

const preview = document.getElementById('preview');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const timer = document.getElementById('timer');

// Start recording
startBtn.addEventListener('click', async () => {
    try {
        // Get display media
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: 'always',
                displaySurface: 'monitor'
            },
            audio: true
        });
        
        // Show preview
        preview.srcObject = stream;
        
        // Create media recorder
        const options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm';
        }
        
        mediaRecorder = new MediaRecorder(stream, options);
        recordedChunks = [];
        
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            preview.srcObject = null;
            preview.src = url;
            preview.controls = true;
            
            downloadBtn.style.display = 'block';
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = `lx4t-recording-${Date.now()}.webm`;
                a.click();
            };
        };
        
        // Start recording
        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Start timer
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
        
        // Handle stream stop (user clicked browser stop button)
        stream.getVideoTracks()[0].onended = () => {
            stopRecording();
        };
        
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Failed to start recording. Make sure you granted permissions!');
    }
});

// Stop recording
stopBtn.addEventListener('click', stopRecording);

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    timer.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

