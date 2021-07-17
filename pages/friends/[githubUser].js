
import { useState, useEffect } from "react";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import ProfileRelationsBoxWrapper from "../../src/components/ProfileRelations";
import { 
    AlurakutMenu, 
    AlurakutProfileSidebarMenuDefault, 
} from "../../src/lib/AlurakutCommons";

export async function getStaticPaths() {
  return {
      paths: [{
          params: {
              githubUser: 'nathyts'
          }
      }],
      fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const githubUser = context.params.githubUser

  return{
      props: {
          githubUser: githubUser
      }
  }
}

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

const FriendsPage = ({ githubUser }) => {
    const [follower, setFollower] = useState([]);
  
    useEffect(async () => {
        const url = `https://api.github.com/users/${githubUser}/followers`;
        const response = await fetch(url);
        setFollower(await response.json());
    }, []);

    return (
        <>
          <AlurakutMenu githubUser={githubUser} />
    
          <MainGrid>
            <div className="profileArea" style={{ gridArea: "profileArea" }}>
              <ProfileSideBar githubUser={githubUser} />
            </div>
    
            <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
                <Box>
                    <ProfileRelationsBoxWrapper>
                    <h2 className="smallTitle">Amigos</h2>
                        <ul>
                            {follower.map((follower) => {
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
                    </ProfileRelationsBoxWrapper>
                </Box>
            </div>
          </MainGrid>
        </>
    );
}

export default FriendsPage;
