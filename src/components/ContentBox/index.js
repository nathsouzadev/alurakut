import { useState, useEffect } from "react";
import ProfileRelationsBoxWrapper from "../ProfileRelations";

export function CommunitySidebar({ community }) {
    const communitys = community.slice(0, 6);
  
    return(
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades ({community.length})</h2>
  
        <ul>
          {communitys.map((community) => {
            return (
              <li key={community.id}>
                <a href={community.Url !== null ? community.Url : "#"}>
                  <img
                    src={community.imageUrl}
                    style={{ borderRadius: "8px" }}
                  />
                  <span>{community.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <hr />
        <a 
          href="#"
        >
          Ver todos
        </a>
      </ProfileRelationsBoxWrapper>
    )
}

export function DevSidebar({ githubUser }) {
    const [follower, setFollower] = useState([]);
    const [profileDetail, setProfileDetail] = useState([]);
  
    useEffect(async () => {
      const url = `https://api.github.com/users/${githubUser}`;
      const response = await fetch(url);
      setProfileDetail(await response.json());
    }, []);
  
    useEffect(async () => {
      const url = `https://api.github.com/users/${githubUser}/followers`;
      const response = await fetch(url);
      setFollower(await response.json());
    }, []);
  
    const followers = follower.slice(0, 6);
  
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Seguidores ({profileDetail.followers})</h2>
  
        <ul>
          {followers.map((follower) => {
            return (
              <li key={follower.id}>
                <a href={`/user/${ follower.login }`}>
                  <img
                    src={`https://github.com/${follower.login}.png`}
                    style={{ borderRadius: "8px" }}
                  />
                  <span>{follower.login}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <hr />
        <a 
          href="#"
        >
          Ver todos
        </a>
      </ProfileRelationsBoxWrapper>
    );
}

export function FollowingSidebar({ githubUser }) {
  const [follwing, setFollwing] = useState([]);
  const [profileDetail, setProfileDetail] = useState([]);

  useEffect(async () => {
    const url = `https://api.github.com/users/${githubUser}`;
    const response = await fetch(url);
    setProfileDetail(await response.json());
  }, []);

  useEffect(async () => {
    const url = `https://api.github.com/users/${githubUser}/following`;
    const response = await fetch(url);
    setFollwing(await response.json());
  }, []);

  const follwings = follwing.slice(0, 6);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Seguindo ({profileDetail.following})</h2>

      <ul>
        {follwings.map((follower) => {
          return (
            <li key={follower.id}>
              <a href={`/user/${ follower.login }`}>
                <img
                  src={`https://github.com/${follower.login}.png`}
                  style={{ borderRadius: "8px" }}
                />
                <span>{follower.login}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <hr />
      <a 
        href="#"
      >
        Ver todos
      </a>
    </ProfileRelationsBoxWrapper>
  );
}
