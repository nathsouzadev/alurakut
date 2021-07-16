import { useState } from "react";
import { useRouter } from 'next/router';
import nookies from "nookies";

export default function Login() {
    const [user, setUser] = useState('');
    const router = useRouter();
    
    const handleLogin = (event) => {
        event.preventDefault();
        fetch('https://alurakut.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ githubUser: user })
        })
        .then(async (response) => {
            const data = await response.json();
            nookies.set(null, 'USER_TOKEN', data.token, {
                path: '/',
                maxAge: 86400
            });
            router.push('/')
        })
    }

    return(
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
            <section className="logoArea">
                <img src="https://alurakut.vercel.app/logo.svg" />
    
                <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
            </section>
    
            <section className="formArea">
                <form 
                    onSubmit={handleLogin}
                    className="box"
                >
                <p>
                    Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                </p>

                <input 
                    placeholder="Usuário"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                />

                <button type="submit" >
                    Login
                </button>

                {user !== '@nathyts' && <p>Informe o usuário correto</p>}
                </form>
    
                <footer className="box">
                <p>
                    Ainda não é membro? <br />
                    <a href="/login">
                    <strong>
                        ENTRAR JÁ
                    </strong>
                    </a>
                </p>
                </footer>
            </section>
    
            <footer className="footerArea">
                <p>
                © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                </p>
            </footer>
            </div>
        </main>
    )
}
