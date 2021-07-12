import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutMenuProfileSidebar } from '../src/lib/AlurakutCommons';

function ProfileSideBar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'nathyts';

  const favoritesPeople = [
    'viitoriaferreiraa', 
    'ThamirezBastos',
    'andressadotpy',
    'juunegreiros', 
    'omariosouto', 
    'peas'
  ]

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
        
      <MainGrid>
        <div
          className="profileArea"
          style={{ gridArea: "profileArea" }}
        >

          <ProfileSideBar 
            githubUser = {githubUser}
          />

        </div>

        <div 
          className="welcomeArea" 
          style={{ gridArea: "welcomeArea" }}
        >

          <Box>
            <h1 className="title">
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          
        </div>

        <div 
          className="profileRelationsArea" 
          style={{ gridArea: "profileRelationsArea" }}
        >

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Devs ({favoritesPeople.length})
            </h2>

            <ul>
              {favoritesPeople.map(people => {
                return(
                  <li
                    key={people}
                  >
                    <a 
                      href={`/users/${people}`}
                    >
                      <img 
                        src={`https://github.com/${people}.png`}
                        style={{ borderRadius: "8px" }}
                      />
                      <span>{people}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            Comunidades
          </ProfileRelationsBoxWrapper>
        </div>
    </MainGrid>
    </>
  )
}
