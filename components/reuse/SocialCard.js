// Import Tailwind CSS styles
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faEraser, faRefresh, faDownload, faTrashAlt, faUpload, faSave, faFillDrip, faCheckCircle, faStar, faLocationDot, faFaceSmile, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export function SocialCard() {
  return (
    <div className="social-card flex flex-col">

      <div className="row1 grid grid-cols-1 md:grid-cols-3">
           {/* Image Section */}
        <div className="image-section">
          <img src="/path/to/your/image.jpg" className="w-full h-auto" />
        </div>
        <span>Masachuset</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

      <div className="row2 grid grid-cols-1 md:grid-cols-3">
        <div className="row2-col flex flex-col">
          <span className='text-xs'>10k</span>
          <span className='text-xs'>Total lifetime views</span>
        </div>

        <div className="row2-col flex flex-col">
          <span className='text-xs'>10k</span>
          <span className='text-xs'>Total lifetime views</span>
        </div>

        <div className="row2-col flex flex-col">
          <span className='text-xs'>10k</span>
          <span className='text-xs'>Total lifetime views</span>
        </div>
      </div>

    </div>
  );
}
