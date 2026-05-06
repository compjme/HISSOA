import "./MeetTeam.css";
import leslie from "../../assets/leslie.jpg";
import jesus from "../../assets/jesus.jpg";

const MeetTeam = () => {
  const teamMembers = [
    // array for the team members
    {
      name: "Jesus Perez",
      role: "Director of ISSO",
      email: "jperez@brooklyn.cuny.edu",
      image: jesus,
      description:
        "The founding director of the Immigrant Student Success Office (ISSO) at Brooklyn College, where he has led since 2019 with a mission to empower immigrant and first-generation students to achieve their academic dreams. Under his leadership, ISSO has become a critical resource, providing essential support that enables students to overcome barriers and thrive.",
    },
    {
      name: "Leslie Ramirez Carbajal",
      role: "Program Coordinator of ISSO",
      email: "l.ramirezcarbajal@brooklyn.cuny.edu",
      image: leslie,
      description:
        "dedicated to empowering undocumented and immigrant students, currently serving as a key advocate at Brooklyn College's Immigrant Student Success Office as the Program Coordinator. She previously played a pivotal role at John Jay College’s Immigrant Student Success Center, the first of its kind within the CUNY system, where she helped students navigate complex challenges and access vital resources.",
    },
  ];

  return (
    <section id="team" className="team-section">
      <div className="team-card">
        <div className="team-header">
          <h2>Meet the Team</h2>
          <p>
            The Immigrant Student Success office, team of committed staff whose
            focus is to support undocumented and immigrant students as they
            navigate their academic and personal journeys. At ISSO, we proudly
            serve students by providing guidance, resources, and a community of
            care to ensure every individual feels valued, seen, and empowered.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-member-card" key={member.email}>
              <img
                src={member.image}
                alt={`${member.name} profile`}
                className="team-image"
              />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <a href={`mailto:${member.email}`} className="team-email">
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTeam;
