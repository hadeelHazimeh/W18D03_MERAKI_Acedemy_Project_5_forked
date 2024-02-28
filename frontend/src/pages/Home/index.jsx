import "./index.css";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Footer2 from "../../components/Footer/Footer2";
const Home = () => {
  return (
    <div className="home">
      <div className="video-container">
        <video className="video-background" autoPlay muted  loop>
          <source
            src="https://res.cloudinary.com/dycpjbdto/video/upload/v1708783111/km_farah_720p_50f_20240224_142639_lkpe5z.3gp"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="seenContainer" style={{ width: "100%" }}>
        <img
          style={{ width: "100%" }}
          src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708910801/AsSeen_rnansm.jpg"
        />
      </div>
      <div className="card" id="card1">
        <img
          src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708823786/pexels-alena-koval-961402_eymjio.jpg"
          className="card-img"
          alt="..."
          style={{ border: "none" }}
        />
        <div className="card-img-overlay">
          <br />
          <br />
          <h5 className="card-title">
            <strong>
              Your Vision + Our Expertise = The Perfect Partnership
            </strong>
          </h5>
          <br />

          <p className="card-text">
            Our creativity, attention to detail, and passion for planning <br />
            will ensure that your next corporate event is a huge success.
            <br />
            We take the time to get to know your organization – your mission,{" "}
            <br />
            your goals, your vision, and we work with you to create an event
            that reflects your company brand.
          </p>
          <br />
          <a className="button arrow" href="/portfolio">
            OUR WORK
          </a>
        </div>
      </div>

      <div className="container my-5 py-5 z-depth-1">
        <section className="px-md-5 mx-md-5 dark-grey-text text-center text-lg-left">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0 d-flex  align-items-center justify-content-center">
              <img
                id="pacific"
                src="https://adornmentevents.com/wp-content/uploads/gallery2023-lodge-60-683x1024.jpg"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
              <h3 className="font-weight-bold">Preplanning Production</h3>
              <br />
              <p className="text-muted">
                Curating your vendor team to match your style & guest experience
                Refining and communicating your overall timeline & plan Menu
                development & catering detail management Communication liaison
                with venue and vendors for production schedule Establishing
                meeting schedule & appointments for entire planning process
                Managing all event orders, revisions & evolving details.
              </p>
              <a className="button arrow" id="with" href="/portfolio">
                Let your eyes shine
              </a>
            </div>
          </div>
        </section>
      </div>
      {/* {new card */}
      <div className="container my-5 py-5 z-depth-1">
        <section className="px-md-5 mx-md-5 dark-grey-text text-center text-lg-left">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
              <h3 className="font-weight-bold">Design</h3>
              <br />
              <p className="text-muted">
                Creating an individualized mood board & color palette Building
                custom layouts via our custom design program Curating custom
                installs and plans designed for guest experience Managing the
                printing suite design and presence.
              </p>
              <a className="button arrow" id="with" style={{alignSelf:"flex-start",justifySelf:"left",marginLeft:"0",padding:"0"}} href="/portfolio">
                Don't hesitate to take a look
              </a>
            </div>

            <div className="col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
              <img
                id="pacific"
                src="https://adornmentevents.com/wp-content/uploads/elementor/thumbs/2024-slide-Slide1-qjgy4ytsero88mn1zfj2k2itb37gl2mi46rra4zgcc.webp"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
      {/* {new card */}
      <div className="container my-5 py-5 z-depth-1">
        <section className="px-md-5 mx-md-5 dark-grey-text text-center text-lg-left">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
              <img
                id="pacific"
                src="https://adornmentevents.com/wp-content/uploads/gallery2023-coast-5.jpg"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
              <h3 className="font-weight-bold">Onsite Production</h3>
              <br />
              <p className="text-muted">
                Staffing your event needs with our team of event managers
                Supporting setup of all vendor components Partnering with Venue
                to manage onsite expectations Guest & Timeline Management
                throughout the experience Overseeing cleanup & load out of all.
              </p>
              <a className="button arrow" id="with" href="/portfolio">
                CONTACT US TO GET STARTED{" "}
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="heading">
        <h1 style={{ fontSize: "50px" }}>OUR EVENTS</h1>
      </div>
      <div
        className="center-line"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <hr style={{ width: "24%", color: "#666" }} />
      </div>
      <HomeSlider />
      <div className="gallery">
        <a className="child bounce" href="/portfolio">
          The Portfolio ⟶
        </a>
      </div>
      <footer>
        <Footer2/>
      </footer>
    </div>
  );
};

export default Home;
