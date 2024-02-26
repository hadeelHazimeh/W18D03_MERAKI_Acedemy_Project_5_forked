import "./index.css";

const Home = () => {
  return (
    <div className="home">
      <div className="video-container">
        <video className="video-background" autoPlay muted controls loop>
          <source
            src="https://res.cloudinary.com/dycpjbdto/video/upload/v1708783111/km_farah_720p_50f_20240224_142639_lkpe5z.3gp"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="seenContainer" style={{ width: "100%" }}>
        <img src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708910801/AsSeen_rnansm.jpg" />
      </div>
      <div className="card bg-dark ">
        <img
          src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708823786/pexels-alena-koval-961402_eymjio.jpg"
          className="card-img"
          alt="..."
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

              <p className="text-muted">
                Curating your vendor team to match your style & guest experience
                Refining and communicating your overall timeline & plan Menu
                development & catering detail management Communication liaison
                with venue and vendors for production schedule Establishing
                meeting schedule & appointments for entire planning process
                Managing all event orders, revisions & evolving details
              </p>
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

              <p className="text-muted">
                Creating an individualized mood board & color palette Building
                custom layouts via our custom design program Curating custom
                installs and plans designed for guest experience Managing the
                printing suite design and presence
              </p>
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
                src="https://adornmentevents.com/wp-content/uploads/gallery2023-lodge-60-683x1024.jpg"
                className="img-fluid"
                alt=""
              />
            </div>

            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
              <h3 className="font-weight-bold">Onsite Production</h3>
<br/>
              <p className="text-muted">
                Staffing your event needs with our team of event managers
                Supporting setup of all vendor components Partnering with 
                
                Venue to manage onsite expectations Guest & Timeline Management
                throughout the experience Overseeing cleanup & load out of all.
              </p>
              <p className="Link" >
                <a href="#" class="text-decoration-none" style={{color:'#555454'}}>
                CONTACT US TO GET STARTED
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    ></path>
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer></footer>
    </div>
  );
};

export default Home;
