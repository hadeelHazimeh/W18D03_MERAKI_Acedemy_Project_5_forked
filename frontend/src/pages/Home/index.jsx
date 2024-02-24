import Carousel from "react-bootstrap/Carousel";
import "./index.css";
const Home = () => {
  return (
    <div>
      <div className="video-container">
        <video className="video-background" autoPlay muted controls loop>
          <source
            src="https://res.cloudinary.com/dycpjbdto/video/upload/v1708783111/km_farah_720p_50f_20240224_142639_lkpe5z.3gp"
            type="video/mp4"
          />
        </video>
      </div>

    </div>

  );
};

export default Home;
