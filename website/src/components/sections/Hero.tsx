import "./Hero.css";
import TEAM from "../../assets/Team.jpeg";

const Hero = () => {
  return (
    <>
      <section className="hero-section">
        <div className="card">
          {/* left side */}
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
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  About Us
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("Team")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Meet the Team!
                </button>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="hero-image-wrapper">
            <img src={TEAM} alt="collageISSO" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
