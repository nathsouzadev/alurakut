import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import ProfileRelationsBoxWrapper from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

function ProfileSideBar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr/>
      
      <a className="boxLink" href={`https://github.com/${githubUser}.png`}>
        @{ githubUser }
      </a>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />

    </Box>
  );
}

function DevsSidebar({ githubUser }) {
  const [follower, setFollower] = useState([]);

  useEffect(async () => {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const response = await fetch(url);
    setFollower(await response.json());
  }, []);

  const followers = follower.slice(0, 6);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Devs ({follower.length})</h2>

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

export default function Home() {
  const githubUser = "nathyts";

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <DevsSidebar githubUser={githubUser}/>

          <ProfileRelationsBoxWrapper>Comunidades</ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
