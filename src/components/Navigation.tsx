import { AiOutlineLogin } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/navigation.module.css";
import { logoutFirebase } from "../utils/firebase";

const Navigation = () => {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logoutFirebase();
    logout();
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.logout} onClick={handleLogOut}>
        Log Out
        <AiOutlineLogin />
      </button>
    </nav>
  );
};

export default Navigation;
