import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import { DevSidebar, FollowingSidebar } from "../../src/components/ContentBox";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
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

const User = ({ githubUser }) => {
    return (
      <>
        <AlurakutMenu githubUser={githubUser} />
  
        <MainGrid>
          <div className="profileArea" style={{ gridArea: "profileArea" }}>
            <ProfileSideBar githubUser={githubUser} />
          </div>
  
          <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
            <Box>
              <h1 className="title">Bem vindo ao perfil de @{ githubUser }</h1>
  
              <OrkutNostalgicIconSet />
            </Box>
          </div>
  
          <div
            className="profileRelationsArea"
            style={{ gridArea: "profileRelationsArea" }}
          >
            <DevSidebar githubUser={githubUser} />

            <FollowingSidebar githubUser={githubUser} />
          </div>
        </MainGrid>
      </>
    );
}

export default User;
