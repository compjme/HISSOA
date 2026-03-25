import "../layout/hero.css";
import TEAM from "../../assets/Team.jpeg";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        {/* brand info */}
        <div className="hero-text-section">
          <div className="hero-text">
            <p className="hero-subtitle">Immigrant Student Success Office</p>
            <h1 className="hero-title">
              You're Not <span className="aloneText">Alone.</span>
            </h1>
            <p className="hero-description">
              Support, Guidance, and Community For Immigrant Students.
            </p>
            <div className="hero-buttons">
              <button> About Us </button>
              <button> Meet the Team! </button>
            </div>
          </div>
        </div>
        {/* hero image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
            height: "600px",
            paddingRight: "100px",
          }}
        >
          <img src={TEAM} alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
