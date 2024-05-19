import React,{useState,useEffect,memo} from 'react'
import img1 from '../../public/images/icons8-motorcar-hands-32.png'
import img2 from '../../public/images/icons8-motorcar-hands-96.png'
import { Link } from 'react-router-dom';



function Logo() {

  const [imgsrc,setImgSrc]=useState(null)
  console.log(imgsrc)

  const updateImageSrc = () => {
    if (window.innerWidth >= 1024) {
      setImgSrc(img2)
    } else if (window.innerWidth >= 768) {
      setImgSrc(img2)
        } else {
          setImgSrc(img1)    }
  };

  useEffect(() => {
    updateImageSrc(); // Set the initial image source
    window.addEventListener('resize', updateImageSrc); // Update on resize

    return () => {
      window.removeEventListener('resize', updateImageSrc); // Cleanup on unmount
    };
  }, []);

  return (
    
      <div className='p-[5px] flex justify-start justify-items-center font-black	dark:text-white '>
        <h3>M</h3>
        <img className='h-[30px]' src={imgsrc} alt="responsice-logo" />
        <h3>TORMart</h3>
      </div>
     
  )
}

export default memo(Logo)