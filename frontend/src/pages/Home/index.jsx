const Home = () => {
  return (
    <div style={{objectFit:"contain"}}>
      <video className="w-100" autoPlay loop muted>
      <source
        src="https://mdbootstrap.com/img/video/animation-intro.mp4"
        type="video/mp4"
      />
    </video>

    <div className="slider_scroll_down icon-down"></div>
    </div>
    
    
  )
}

export default Home
