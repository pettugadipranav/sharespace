
const Profile = ({ socket, username, room }) => {
  return (
    <div className="profile d-flex justify-content-center pt-5">
      <h4 className="pb-4">{username}</h4>
    </div>
  );
};

export default Profile;
