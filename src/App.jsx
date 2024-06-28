import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';

function App() {
  const [count, setCount] = useState(0)
  const [videoElement, setVideoElement] = useState(undefined);

  const sockit = io("http://localhost:5200");
  useEffect(()=>{
    setVideoElement(document.getElementById('video'));
  },[]);

  const handelClick = () => {
    sockit.emit('message', 'hello')
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(chunks =>{
      videoElement.srcObject = chunks;
    });
  };

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
    </>
  )
}

export default App
