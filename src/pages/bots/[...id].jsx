import Link from "next/link"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock, faChartBar } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function BotPage() {
    const [botData, setBotData] = useState([]);
    useEffect(() => {
        const fetchBot = async () => {
            try {
                const response = await fetch(`/api/bots/${window.location.pathname.split("/")[2]}`);
                const data = await response.json();
                setBotData(data);
            } catch (error) {
                console.error("Error fetching bot:", error);
            }
        };
        fetchBot();
    }, [])
    if (botData.message) return (
        <section className="max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
            <div>
                <h2 className="heroTitle">Bot não encontrado, verifique o ID e tente novamente</h2>
            </div>
        </section>
    );
    if (botData.verified === false) {
        document.querySelector(".errorCard").style.display = "block";
    }
    return (
        <main>
            <Navbar/>
            <section className="hidden errorCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <div>
                    <h2 className="heroTitle">Este bot ainda não foi verificado</h2>
                    <h2 className="heroSubtitle hidden md:block" id="errorDetails">Para sua segurança, recomenda-se que que aguarde avaliação de vossa equipe</h2>
                </div>
            </section>
            <section className="addCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg" id="botDetails">
                <div>
                    <div className="py-2">
                    <Image className="botPageAvatar" src={botData.avatar} width="64" height="64" alt={botData.name} />
                    <h2 className="botPageTitle">{botData.name}</h2>
                    <p className="botCardDescription py-2">
                        {botData.description}
                    </p>
                    </div>
                    <div className="botPageData">
                        <div>
                            <FontAwesomeIcon icon={faFire} />&nbsp;
                            <span className="botDataText">{Number(botData.votes).toLocaleString('pt-BR')} votos</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faClock} />&nbsp;
                            <span className="botDataText">Adicionado em {new Date(botData.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChartBar} />&nbsp;
                            <span className="botDataText">{Number(botData.servers).toLocaleString('pt-BR')} servidores</span>
                        </div>
                    </div>
                    <button className="voteButton">
                        <Link href={`/bots/${botData._id}/vote`}>
                            Votar
                        </Link>
                    </button>
                    <button className="addButton">
                        <Link href={`/api/bots/${botData._id}?type=invite`}>
                            Adicionar
                        </Link>
                    </button>
                </div>
            </section>
            <section className="botDescription max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden">
                {botData.longDescription}
            </section>
        </main>
    )
}