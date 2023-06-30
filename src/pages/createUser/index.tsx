import { useState } from "react";
import { initialUser } from "./utils/constants";
import CreateUserForm from "./components/createUserForm";

function CreateUser() {
  const [userInfo, setUserInfo] = useState<UserData>(initialUser);
  const [isActive] = useState(true);

  return (
    <CreateUserForm
      isActive={isActive}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
    />
  );
}

export default CreateUser;
