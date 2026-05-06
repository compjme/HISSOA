import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../App.css";

const appointmentTypes = [
  {
    title: "General ISSO Advising",
    description:
      "Get support with questions about resources, campus support, and next steps.",
  },
  {
    title: "Immigrant Student Support",
    description:
      "Meet with staff for guidance related to undocumented, immigrant, and first-generation student needs.",
  },
  {
    title: "Resource Navigation",
    description:
      "Find help connecting with campus offices, community organizations, and available services.",
  },
];

export default function Scheduling() {
  const { user, loginWithEmail, authError } = useAuth();
  const [email, setEmail] = useState("");

  return (
    <div className="scheduling-page">
      <h1>Schedule an Appointment</h1>

      <p className="scheduling-intro">
        Students can view scheduling information here. To schedule an
        appointment, please sign in with your Brooklyn College email.
      </p>

      <div className="scheduling-actions">
        {user ? (
          <a
            className="schedule-primary-btn"
            href="https://www.brooklyn.cuny.edu/web/about/offices/studentaffairs/navigate.php"
            target="_blank"
            rel="noreferrer"
          >
            Open Navigate360
          </a>
        ) : (
          <div className="schedule-login-box">
            <input
              type="email"
              placeholder="yourname@bcmail.cuny.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="schedule-email-input"
            />

            <button
              className="schedule-primary-btn"
              onClick={() => loginWithEmail(email)}
            >
              Sign in to Schedule
            </button>

            {authError && <p className="schedule-error">{authError}</p>}
          </div>
        )}

        <a className="schedule-secondary-btn" href="mailto:isso@brooklyn.cuny.edu">
          Email ISSO
        </a>
      </div>

      <div className="appointment-grid">
        {appointmentTypes.map((item) => (
          <div className="appointment-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="scheduling-note">
        <h2>Before your appointment</h2>
        <p>
          Please prepare any questions, documents, or concerns you would like to
          discuss. If you cannot find availability, contact ISSO directly.
        </p>
      </div>
    </div>
  );
}