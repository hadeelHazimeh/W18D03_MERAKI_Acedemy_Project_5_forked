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
      <div className="card bg-dark ">
  <img src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708823786/pexels-alena-koval-961402_eymjio.jpg" className="card-img" alt="..."/>
  <div className="card-img-overlay">
    <br/><br/>
    <h5 className="card-title" ><strong>Your Vision +
Our Expertise = The Perfect Partnership</strong></h5>
<br/>

    <p className="card-text">Our creativity, attention to detail, and passion for planning <br/>
    will ensure that your next corporate event is a huge success.<br/>
     We take the time to get to know your organization – your mission,  <br/>your goals, your vision,
     and we work with you to create an event that reflects your company brand.</p>
     <br/>
     <a class="button arrow" href="/portfolio">OUR WORK</a>
  </div>

</div>

    </div>
  );
};

export default Home;
