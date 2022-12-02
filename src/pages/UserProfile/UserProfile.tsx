import UserBio from "../../components/UserBio/UserBio";

const UserProfile = () => {
  return (
    <div
      className="w-full min-h-screen bg-gray-300"
      data-testid="user-profile-wrapper"
    >
      <UserBio />
    </div>
  );
};

export default UserProfile;
