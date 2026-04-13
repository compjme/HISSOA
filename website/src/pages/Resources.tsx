import "./Resources.css";

function Resources() {
  return (
    <div className="">
      <h1 style={{ textAlign: "center" }}>Resources Page</h1>
      <p className="cunyCitizen">
        Through a close collaboration with the{" "}
        <span className="bold-text">CUNY Citizenship Now!</span> Program, ISSO
        provides comprehensive legal support tailored to the needs of our campus
        community. Services include: Legal Screenings: Personalized evaluations
        to understand individual circumstances and provide actionable advice.
        One-on-One Consultations: Private meetings with legal experts to address
        specific concerns and questions. Workshops and Legal Updates:
        Informative sessions to keep students and their families informed about
        their rights and policy changes.
      </p>
      <a
        href="https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="buttons"> Learn More</button>
      </a>
    </div>
  );
}

export default Resources;
