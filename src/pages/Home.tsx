<<<<<<< HEAD
import logo from "../assets/logo.png";
=======
import ISSOLOGO from "../assets/ISSOLOGO.png";
>>>>>>> abae9a7b9d48f6b468a7f6c574ccb17b82c20f68

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Welcome to</h2>
      <h1>Immigrant Student Success Office</h1>

      <img
        src={ISSOLOGO}
        alt="ISSO logo "
        style={{ width: "200px", marginTop: "40px" }}
      />
    </div>
  );
}

export default Home;
