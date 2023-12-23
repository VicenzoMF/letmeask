import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import {
  Aside,
  CreateRoomButton,
  Main,
  MainContent,
  PageAuth,
  Separator,
} from "../styles/auth";
import { Logo } from "../components/Logo";

import { SwitchTheme } from "../components/SwitchTheme";

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    navigate("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }



  return (
    <PageAuth>
      <Aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas."
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </Aside>
      <Main>
          <div className="SwitchContainer">
            <SwitchTheme />
          </div>
        <MainContent>
          <Logo/>

          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </CreateRoomButton>
          <Separator>ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContent>
      </Main>
    </PageAuth>
  );
}
