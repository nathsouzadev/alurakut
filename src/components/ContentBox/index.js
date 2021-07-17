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
        <h2 className="smallTitle">Devs ({profileDetail.followers})</h2>
  
        <ul>
          {followers.map((follower) => {
            return (
              <li key={follower.id}>
                <a href={follower.html_url}>
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
      </ProfileRelationsBoxWrapper>
    );
}
