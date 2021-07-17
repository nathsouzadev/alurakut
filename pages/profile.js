import { useState, useEffect } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { DevSidebar, CommunitySidebar } from "../src/components/ContentBox";
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
        destination: '/',
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
          <DevSidebar githubUser={githubUser} />

          <CommunitySidebar community={community} />
        </div>
      </MainGrid>
    </>
  );
}
