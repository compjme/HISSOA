import logo from "../assets/logo.webp";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Welcome to</h2>
      <h1>Immigrant Student Success Office</h1>

      <img
        src={logo}
        alt="ISSO logo "
        style={{ width: "200px", marginTop: "40px" }}
      />
    </div>
  );
}

export default Home;
