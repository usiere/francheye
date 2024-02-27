'use client'
import React, { useState, useEffect } from "react";
import { SocialCard } from "./reuse/SocialCard";
import HeaderImg from "@/app/assets/header.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faEraser, faRefresh, faDownload, faTrashAlt, faUpload, faSave, faFillDrip, faCheckCircle, faStar, faLocationDot, faFaceSmile, faArrowRight } from '@fortawesome/free-solid-svg-icons'


export function Canvas() {

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        const data = await response.json();
        // Take the first 8 entries for simplicity
        const firstEightImages = data.slice(0, 8);
        setImageData(firstEightImages);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className="grid grid-cols-3 main">
    {/* left section */}
    <div className="col-span-2 p-4">
      <div className="">
      <img src={HeaderImg} alt="My Image" />
      </div>

      {/* grid 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h3 className="font-semibold text-2xl">Umoru Emmanuel  <FontAwesomeIcon icon={faCheckCircle} /></h3>
          <span className="text-gray-500">manny@francheye.com <FontAwesomeIcon icon={faStar} /></span>
          <span className="text-gray-500">#Consumer goods #Health, wellness and fitness, #Home</span>
          <span className="text-gray-500"> <FontAwesomeIcon icon={faLocationDot} /> United States of America</span>
          <span className="font-bold mt-4">My Bio</span>
          <div>My mind is a kaleidoscope of art. I craft creations that inspire. Fueled by the need to prove and always pushing boundaries, I’m here to redefine content creation. Join me on this wild ride!</div>
        </div>

        <div className="flex flex-col">
          <button className="bg-blune-500 text-white py-2 px-4">Follow</button>
          <span className="font-bold"> Languages</span>
          <span>French, English, Spanish</span>
          <span className="font-bold">Content Type</span>
          <span><FontAwesomeIcon icon={faFaceSmile} /> Face Creator</span>
          <span>Brands I've worked with</span>


        </div>
      </div>

      <span className="mt-4">Connected accounts: </span>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <SocialCard />
        </div>
        <div>
        <SocialCard />
        </div>
        <div>
        <SocialCard />
        </div>

      </div>

      <h4>Previous works</h4>

      <div className="grid grid-cols-3 gap-4">
        {imageData.map((image) => (
          <div key={image.id}>
            <img src={image.url} alt={`Image ${image.id}`} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>

    <div className="col-span-1 p-4">
      <div>UGC Nav section</div>
      <div>Videos Photos</div>

      {/* UGC row */}
      <div className="grid grid-cols-2 gap-20 mt-10">
        <div className="flex flex-col">
          <span className="font-bold">Package 1</span>
          <span className="text-sm">1 UGC video</span>
          <span className="text-xs">7 days delivery</span>
          <span className="text-xs">Editing</span>
          <span className="text-xs">Brief creation</span>
        </div>
        <div>USD 200</div>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-10">
        <div className="flex flex-col">
          <span className="font-bold">Package 1</span>
          <span className="text-xs">1 UGC video</span>
          <span className="text-xs">7 days delivery</span>
          <span className="text-xs">Editing</span>
          <span className="text-xs">Brief creation</span>
        </div>
        <div>USD 200</div>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-10">
        <div className="flex flex-col">
          <span className="font-bold">Package 1</span>
          <span className="text-xs">1 UGC video</span>
          <span className="text-xs">7 days delivery</span>
          <span className="text-xs">Editing</span>
          <span >Brief creation</span>
        </div>
        <div>USD 200</div>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 mt-10">Contact Emmanuel</button>

      <div>
        <h3>Our Guarantee</h3>
        <div className="bg-blue-500 h-40 m-4">Your Satisfaction is our top priority. Payments only get released to the creator once the order is completed</div>
      </div>
    </div>
  </div>
 
  );
}