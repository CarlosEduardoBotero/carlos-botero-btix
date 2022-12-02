import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/getUsers";
import Map from "../Map/Map";

const UserBio: React.FC = () => {
  const [userData, setUserData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();

      setUserData(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="bg-white rounded-md p-6 flex flex-col gap-6 w-full mb-4">
        <div>
          <h1 className="text-2xl font-medium">{userData?.name}</h1>
          <p className="text-gray-800">{userData?.username}</p>
        </div>
        <div>
          <p className="text-gray-600">
            Mora em{" "}
            <span className="text-gray-800 font-medium">
              {userData?.address?.city}
            </span>
          </p>
          <p className="text-gray-600">
            Trabalha em{" "}
            <span className="text-gray-800 font-medium">
              {userData?.company?.name}
            </span>
          </p>
          <p className="text-gray-600">
            Website{" "}
            <a
              href={"https://" + userData?.website}
              target="_blank"
              className="text-blue-600 underline font-medium"
            >
              {userData?.website}
            </a>
          </p>
        </div>
      </div>
      <Map
        lat={Number(userData?.address.geo.lat)}
        lng={Number(userData?.address.geo.lng)}
      />
    </div>
  );
};

export default UserBio;
