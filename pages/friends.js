
import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { 
    AlurakutMenu, 
    AlurakutProfileSidebarMenuDefault, 
    ProfileRelationsBoxWrapper 
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

const FriendsPage = () => {
    const githubUser = 'nathyts'

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
                    <h1>Amigos</h1>
                </Box>
            </div>
          </MainGrid>
        </>
    );
}

export default FriendsPage;
