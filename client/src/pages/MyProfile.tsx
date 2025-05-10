import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { isLoggedIn } from "@/lib/localStorage";

const MyProfile = () => {
  const navigate = useNavigate();

  // Verificar se o usuário está logado
  React.useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  return <Profile />;
};

export default MyProfile;
