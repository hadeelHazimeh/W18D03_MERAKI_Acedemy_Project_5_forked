const Home = () => {
  return (
    // <div style={{objectFit:"contain"}}>
    //    <video classNameName="w-100" autoPlay loop muted>
    //   <source
    //     src="https://mdbootstrap.com/img/video/animation-intro.mp4"
    //     type="video/mp4"
    //   />
    // </video>
    // </div>
    <div>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
          <video className="d-block w-100" autoPlay loop muted>
       <source
         src="https://mdbootstrap.com/img/video/animation-intro.mp4"
         type="video/mp4"
  />
     </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
