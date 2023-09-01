import { useContext } from "react";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navigation />
      <Layout>
        <p style={{ marginTop: "2rem" }}>Welcome back {user?.name}👋</p>
      </Layout>
    </>
  );
};

export default Home;
