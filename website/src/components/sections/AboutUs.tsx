import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section id="about" className="about-us">
      <div className="about-card">
        <h2 className="about-quote">
          "We believe that every student deserves a safe, inclusive, empowering,
          and supportive space to thrive academically, personally, and
          professionally."
        </h2>

        <div className="about-content">
          <h3>About ISSO</h3>

          <p>
            The Immigrant Student Success Office supports immigrant,
            undocumented, DACA, TPS, and mixed-status students by connecting
            them with resources, guidance, campus support, and community.
          </p>

          <p>
            ISSO is designed to make important information easier to find,
            including legal resources, student events, workshops, appointment
            support, and trusted community organizations.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-info-card">
            <h4>Support</h4>
            <p>
              Helps students find guidance, campus services, and resources that
              match their needs.
            </p>
          </div>

          <div className="about-info-card">
            <h4>Resources</h4>
            <p>
              Provides access to legal, educational, and community-based
              resources for students and families.
            </p>
          </div>

          <div className="about-info-card">
            <h4>Community</h4>
            <p>
              Creates a welcoming space where students feel seen, supported, and
              connected.
            </p>
          </div>
        </div>

        <p className="about-closing">
          Whether students are looking for information, support, or a place to
          belong, ISSO helps guide them toward the right next step.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
