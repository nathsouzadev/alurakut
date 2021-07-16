import { useState, useEffect } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
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

function CommunitySidebar({ community }) {
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

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;
  const { githubUser } = jwt.decode(token)

  // console.log(token)

  // fetch('https://alurakut.vercel.app/api/auth', {
  //   headers: {
  //     Authorization: token
  //   }
  // }).
  // then((response) => response.json())
  // .then((result) => {
  //   console.log(result);
  // })

  if(githubUser !== 'nathyts'){
    return{
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  return{
    props: {
      githubUser: githubUser
    },
  }
}

export default function Home({ githubUser }) {
  const [community, setCommunity] = useState([]);

  const [titleCommunity, setTitleCommunity] = useState('');
  const [imageCommunity, setImageCommunity] = useState('')

  useEffect(async () => {
    const data = await fetch("/api/community");
    setCommunity(await data.json());
  }, []);

  function handleCreateComunnity (event) {
    event.preventDefault();

    if(titleCommunity.length === 0) {
      return alert('Informe um título');
    }

    if(imageCommunity.length === 0) {
      return alert('Informe a URL de uma imagem');
    }

    const newCommunity = { 
      title: titleCommunity,
      imageUrl: `https://picsum.photos/200/${community.length}00`,
      communityUrl: '#'
    }

    fetch("/api/create-community", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommunity)
    })
    .then(async (response) => {
      const data = await response.json();
      const updateCommunity = [...community, data.newCommunity];
      setCommunity(updateCommunity);
    })
  }

  const handleLogout = () => {
    alert('Logout');
  }

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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateComunnity} >
              <div>
                <input
                  placeholder="Qual o nome da comunidade?"
                  name="title"
                  aria-label="Qual o nome da comunidade?"
                  type="text"
                  value={titleCommunity}
                  onChange={event => setTitleCommunity(event.target.value)}
                />
              </div>

              <div>
                <input
                  placeholder="Insira uma URL para imagem"
                  name="image"
                  aria-label="Insira uma URL para imagem"
                  value={imageCommunity}
                  onChange={event => setImageCommunity(event.target.value)}
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <DevsSidebar githubUser={githubUser} />

          <CommunitySidebar community={community} />
        </div>
      </MainGrid>
    </>
  );
}
