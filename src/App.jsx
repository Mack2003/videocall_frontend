import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';

function App() {
  const [count, setCount] = useState(0)
  const [videoElement, setVideoElement] = useState(undefined);
  const [videocall, setVideocall] = useState(undefined);
  // https://videochat-backend-36fr.onrender.com/
  // http://localhost:5200
  const sockit = io("https://videochat-backend-36fr.onrender.com/");
  useEffect(() => {
    setVideoElement(document.getElementById('video'));
    setVideocall(document.getElementById('videocall'));
  }, []);

  const handelClick = () => {
    sockit.emit('message', 'hello')
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(chunks => {
      // videoElement.srcObject = chunks;
      sockit.broadcast.emit('video', chunks);
    });
  };

  sockit.on('showVideo', data => {
    alert(data)
  });

  sockit.on('getmsg', data => {
    alert(`${data}`);
  });

  return (
    <>
      <button
        className='p-3 bg-green-600 rounded-lg m-5'
        onClick={handelClick}>send msg</button>
      <video
        className='h-[10rem] w-[10rem] border-2 border-red-700'
        id='video'
        autoPlay
        playsInline></video>

      <video
        className='h-[20rem] w-[20rem] border-2 border-red-700 m-auto'
        id='videocall'
        autoPlay
        playsInline></video>
    </>
  )
}

export default App
