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

  const organizations = [
    // this array stores community organization names
    "Higher Ed Immigration Portal",
    "Make the Road",
    "New York Immigration Coalition",
  ];

  return (
  <main className="resources-page">
    <section className="resources-hero">
      <h1>Student Resources</h1>
      <p> HISSOA connects immigrant students and families with trusted legal, educational, and community resources</p>
    </section>

    <section className="resource-section">
      <h2>CUNY Citizenship Now</h2>
      <p>Through a close collaboration with {" "} <span className="bold">CUNY Citizenship Now!</span>, ISSO provides legal support tailored to the needs of our campus community.</p>
    <ul>
      <li>Legal screenings for students and families</li>
      <li> One-on-one consulations with legal experts</li>
      <li> Workshops and immigration policy updates</li>
    </ul>

    <a href= "https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/"
    target= "_blank"
    rel="noopener noreferrer"
    >
      <button className="buttons">Learn More</button>
    </a>
    </section>

    <section className="resource-section">
      <h2>Immigration Updates</h2>
      <p>Students can stay informed about changes that may affect DACA, work permits, visas, citizenship, and other immigration-related matter</p>
      
      <a href="https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/services/immigration_updates/"
          target="_blank"
          rel="noopener noreferrer"
          >
            <button className="buttons">View Updates</button>
          </a>
      </section>

      <section className="resource-section">
        <h2>Workshops and legal updates</h2>
        <div className="resource-grid">

          <div className="resource-card">
            <h3>Know Your Rights</h3>
            <p>Presentations that educate students and families about their legal rights and practical steps to protect themselves</p>
          </div>

          <div className="resource-card">
            <h3>Policy Updates</h3>
            <p> Sessions that explain immigration law and policy changes that may affect students and their families</p>
          </div>
        </div>
      </section>

  </main>
  )

export default Resources;
