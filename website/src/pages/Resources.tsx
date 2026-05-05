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
      <div className="transparent-card">
        <section className="resources-hero">
          {" "}
          {/* top section of the page */}
          <h1>Student Resources</h1>
          <p>
            {" "}
            HISSOA connects immigrant students and families with trusted legal,
            educational, and community resources
          </p>
        </section>

        <section className="resource-section">
          <h2>CUNY Citizenship Now</h2>
          <p>
            Through a close collaboration with{" "}
            <span className="bold">CUNY Citizenship Now!</span>, ISSO provides
            legal support tailored to the needs of our campus community.
          </p>
          <ul>
            <li>Legal screenings for students and families</li>
            <li> One-on-one consulations with legal experts</li>
            <li> Workshops and immigration policy updates</li>
          </ul>

          <a
            href="https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="buttons">Learn More</button>
          </a>
        </section>

        <section className="resource-section">
          <h2>Immigration Updates</h2>
          <p>
            Students can stay informed about changes that may affect DACA, work
            permits, visas, citizenship, and other immigration-related matter
          </p>

          <a
            href="https://www.cuny.edu/about/administration/offices/communications-marketing/citizenship-now/services/immigration_updates/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="buttons">View Updates</button>
          </a>
        </section>

        <section className="resource-section">
          {" "}
          {/* card section */}
          <h2>Workshops and legal updates</h2>
          <div className="resource-grid">
            <div className="resource-card">
              {" "}
              {/* card 1 */}
              <h3>Know Your Rights</h3>
              <p>
                Presentations that educate students and families about their
                legal rights and practical steps to protect themselves
              </p>
            </div>

            <div className="resource-card">
              {" "}
              {/* card 2 */}
              <h3>Policy Updates</h3>
              <p>
                {" "}
                Sessions that explain immigration law and policy changes that
                may affect students and their families
              </p>
            </div>

            <div className="resource-card">
              {/* card 3 */}
              <h3>Family-Focused Resources</h3>
              <p>
                workshops designed to help families stay informed, prepared and
                supported.{" "}
              </p>
            </div>
          </div>
        </section>

        <section className="resource-section">
          <h2>Additional Legal Services</h2>

          {/* This section uses the array made above and the .map() function that loops through each item and creates a card  */}
          <div className="resource-grid">
            {legalServices.map((service) => (
              <div className="resource-card" key={service.name}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <h2> Community Organizations</h2>

          <ul className="organization-list">
            {organizations.map((organization) => (
              <li key={organization}>{organization}</li>
            ))}
          </ul>
        </section>

        <section className="resource-disclaimer">
          <p>
            Disclaimer: HISSOA does not provide legal advice. Students and
            Non-students should contact qualified legal professional or trusted
            organizations for guidance about their specific situation
          </p>
        </section>
      </div>
    </main>
  );
}

export default Resources;
