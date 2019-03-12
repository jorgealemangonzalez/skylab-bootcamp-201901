import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import Card from "../../components/Card";
import logic from "../../logic";

const Favorites = () => {
  const { user } = useContext(UserContext);
  const { token } = user;
  const [userFavorites, setUserFavorites] = useState([]);

  const retrieveUserFavs = () => {
    logic.retrieveUser(token).then(user => setUserFavorites(user.favorites));
  };

  useEffect(() => {
    retrieveUserFavs();
  }, []);
  console.log(userFavorites, "joooooooooooooo");
  return (
    <div className="fav-list">
      {userFavorites &&
        userFavorites
          .reverse()
          .map(userFavorite => (
            <Card
              title={userFavorite.title}
              image={userFavorite.image}
              description={userFavorite.description}
              comments={userFavorite.comments}
              postId={userFavorite._id}
              userFavorites={userFavorites}
              call={retrieveUserFavs}
            />
          ))}
    </div>
  );
};

export default Favorites;
