import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe(); // ✅ cleanup
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Welcome to Browse Page</h1>
      <p>Logged in as: {user?.displayName || user?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Browse;
