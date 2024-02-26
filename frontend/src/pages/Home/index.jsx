import "./index.css";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <div>
      <div classNameName="video-container">
        <video classNameName="video-background" autoPlay muted controls loop>
          <source
            src="https://res.cloudinary.com/dycpjbdto/video/upload/v1708783111/km_farah_720p_50f_20240224_142639_lkpe5z.3gp"
            type="video/mp4"
          />
        </video>
      </div>
      <div classNameName="card bg-dark ">
  <img src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708823786/pexels-alena-koval-961402_eymjio.jpg" classNameName="card-img" alt="..."/>
  <div classNameName="card-img-overlay">
    <br/><br/>
    <h5 classNameName="card-title" ><strong>Your Vision +
Our Expertise = The Perfect Partnership</strong></h5>
<br/>

    <p classNameName="card-text">Our creativity, attention to detail, and passion for planning <br/>
    will ensure that your next corporate event is a huge success.<br/>
     We take the time to get to know your organization – your mission,  <br/>your goals, your vision,
     and we work with you to create an event that reflects your company brand.</p>
     <br/>
     <a className="button arrow" href="/portfolio">OUR WORK</a>
  </div>

</div>





    </div>
  );
};

export default Home;
