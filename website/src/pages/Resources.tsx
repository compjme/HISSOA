import "./Resources.css";

function Resources() {
  const legalServices = [
    //this is an array that stores the legal service organizations
    {
      name: "Coalition for Immigrant Freedom",
      description:
        "Free telephone or video consulations on immigration-related matters.",
    },
    {
      name: "Immigrant Defense Project",
      description:
        "Free legal services for immigrants affected by the criminal justice system or facing detention or deportation.",
    },
    {
      name: "Legal Aid Society",
      description:
        "Urgent legal services for low-income immigrants seeking lawful status, citizenship support, or deportation defense.",
    },
    {
      name: "Northern Manhattan Imporvement Corporation",
      description:
        "Free legal assistance with citizenship, DACA, Temporary Protected Status, and other forms of immigrant relief. ",
    },
    {
      name: "Unlocal",
      description:
        "Free legal advice and representation for immigrant communities throughout New York State. ",
    },
  ];

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
