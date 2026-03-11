import COMMUNPIC from "../assets/CommunityPIC.png";

function Community() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Community Page</h1>;
      <div className="COMMUNITYPIC">
        <img src={COMMUNPIC} alt=""></img>
      </div>
    </div>
  );
}

export default Community;
