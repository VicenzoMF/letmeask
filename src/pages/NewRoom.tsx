import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';




import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Aside, Main, MainContent, PageAuth } from '../styles/auth';
import { Logo } from '../components/Logo';
import { SwitchTheme } from '../components/SwitchTheme';

export function NewRoom() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [NewRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event : FormEvent) {
        event.preventDefault();

        if (NewRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: NewRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`)
    }


    return (
        <PageAuth>
            <Aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas."/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </Aside>
            <Main>
                <div className="SwitchContainer">
                <SwitchTheme />
            </div>
                <MainContent>
                    <Logo />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={NewRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </MainContent>
            </Main>
        </PageAuth>
    )
}