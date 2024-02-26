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
      <br />
      <br />
      <div class="container my-5 py-5 z-depth-1">
        <section class="px-md-5 mx-md-5 dark-grey-text text-center text-lg-left">
          <div class="row">
            <div class="col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
              <img
                id="pacific"
                src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708912321/Scenic8-cropped_qlxqmv.png"
                class="img-fluid"
                alt=""
              />
            </div>

            <div class="col-lg-6 mb-4 mb-lg-0">
              <h3 class="font-weight-bold">Pacific NW</h3>

              <p class="text-muted">
                Ready to explore the options that the Pacific NW has to offer?
                Our team of collaborative event managers take on the brunt of
                all the questions and logistics that come along with a
                destination experience. Building a custom travel plan,
                leveraging local relationships and resourcing the right vendors
                to create a curated experience tailored to your story. Explore
                Dundee Wine Country, Mt Hood, the renowned Columbia Gorge,
                Eastern Oregon’s Bend and the Oregon Coastline as options with
                the most gorgeous backdrops at every turn for your special day.
                With years of experience creating events across all of these
                landscapes, solid partnerships, local knowledge, and a refined
                long-distance planning process, we provide an ease to wedding
                planning for our couples.
              </p>
            </div>
          </div>
        </section>
      </div>
      <br />
      <div class="container my-5 py-5 z-depth-1">
        <section class="px-md-5 mx-md-5 dark-grey-text text-center text-lg-left">
          <div class="row">
          <div class="col-lg-6 mb-4 mb-lg-0">
              <h3 class="font-weight-bold">Pacific NW</h3>

              <p class="text-muted">
                Ready to explore the options that the Pacific NW has to offer?
                Our team of collaborative event managers take on the brunt of
                all the questions and logistics that come along with a
                destination experience. Building a custom travel plan,
                leveraging local relationships and resourcing the right vendors
                to create a curated experience tailored to your story. Explore
                Dundee Wine Country, Mt Hood, the renowned Columbia Gorge,
                Eastern Oregon’s Bend and the Oregon Coastline as options with
                the most gorgeous backdrops at every turn for your special day.
                With years of experience creating events across all of these
                landscapes, solid partnerships, local knowledge, and a refined
                long-distance planning process, we provide an ease to wedding
                planning for our couples.
              </p>
            </div>
            <br/>
            <br/>
            <div class="col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center">
              <img
                id="pacific"
                src="https://res.cloudinary.com/dycpjbdto/image/upload/v1708912321/Scenic8-cropped_qlxqmv.png"
                class="img-fluid"
                alt=""
              />
            </div>

            
          </div>
        </section>
      </div>
      <footer></footer>
    </div>
  );
};

export default Home;
