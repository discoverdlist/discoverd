import Navbar from "../../components/Navbar.jsx";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef, useCallback } from "react";

export default function CreateBot() {
    const generateApiKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const { data: auth } = useSession();
    const ownerRef = useRef();
    const [botBlock, setBotBlock] = useState({});
    const [formData, setFormData] = useState({
        id: "",
        invite: "",
        avatar: "",
        description: "",
        longDescription: "",
        website: "",
        github: "",
        support: "",
        owner: "",
        apiKey: generateApiKey(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerValue = ownerRef.current.value;

        try {
            const response = await fetch("/api/bots/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_API_KEY,
                },
                body: JSON.stringify({ ...formData, owner: ownerValue }),
            });

            if (response.ok) {
                showSuccessMessage();
            } else {
                showErrorMessage(response.status);
            }
        } catch (error) {
            console.error("[@discoverd/logs] Erro inesperado", error);
        }
    };

    const showSuccessMessage = () => {
        toggleCardVisibility("successCard", "addCard", "errorCard");
        disableFormInputs();
        console.log("[@discoverd/logs] Bot enviado com sucesso!");
    };

    const showErrorMessage = (status) => {
        toggleCardVisibility("errorCard", "addCard", "successCard");
        const errorDetails = getErrorMessage(status);
        document.getElementById("errorDetails").innerText = errorDetails;
        console.error("[@discoverd/logs] Erro ao enviar bot para a API");
    };

    const toggleCardVisibility = (show, hide1, hide2) => {
        document.querySelector(`.${show}`).style.display = "block";
        document.querySelector(`.${hide1}`).style.display = "none";
        document.querySelector(`.${hide2}`).style.display = "none";
    };

    const getErrorMessage = (status) => {
        const errorMessages = {
            400: "Requisição inválida",
            401: "Não autorizado",
            403: "Proibido",
            404: "Bot não encontrado ou não existente",
            409: "Bot já adicionado",
            500: "Erro interno do servidor",
        };
        return errorMessages[status] || "Erro inesperado";
    };

    const disableFormInputs = () => {
        document.querySelectorAll("input, textarea").forEach((element) => element.disabled = true);
        document.getElementById("sendButton").disabled = true;
    };

    const handleChange = useCallback(async (e) => {
        if (e.target.name === "id" && e.target.value !== "") {
            fetchBotDetails(e.target.value);
        }

        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const fetchBotDetails = async (botId) => {
        try {
            const response = await fetch(`/api/bots/botblock/${botId}`);
            const data = await response.json();
            setBotBlock(data || {});
        } catch (error) {
            console.error("Error fetching bot:", error);
        }
    };

    useEffect(() => {
        if (botBlock?.id) {
            setFormData({
                id: botBlock.id,
                invite: botBlock.invite || "",
                avatar: botBlock.avatar || "",
                description: botBlock.description || "",
                longDescription: botBlock.longDescription || "",
                website: botBlock.website || "",
                github: botBlock.github || "",
                support: botBlock.support || "",
                owner: auth.token.sub,
                apiKey: generateApiKey(),
            });
        }
    }, [botBlock, auth]);

    if (!auth?.session.user) {
        return (
            <div>
                <Navbar />
                <section className="max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                    <h2 className="heroTitle">Você precisa estar logado para adicionar um bot</h2>
                </section>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <section className="hidden successCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <h2 className="heroTitle">Bot adicionado com sucesso!</h2>
                <h2 className="heroSubtitle">Agora aguarde nossa equipe verificar ele!</h2>
            </section>
            <section className="hidden errorCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <h2 className="heroTitle">Ocorreu um erro ao adicionar seu bot</h2>
                <h2 className="heroSubtitle" id="errorDetails">Tente novamente mais tarde</h2>
            </section>
            <section className="addCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <h2 className="heroTitle">Adicione seu bot em nossa lista</h2>
                <h2 className="heroSubtitle">e veja ele crescer!</h2>
            </section>
            <div className="max-w-screen-xl mx-auto p-4 mt-10 rounded">
                <form onSubmit={handleSubmit}>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="id">ID do bot</label>
                        <input required type="number" placeholder="O ID de seu bot no discord (vulgo aplicativo)" id="id" name="id" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="description">Descrição curta</label>
                        <input minLength={50} maxLength={250} placeholder="Utilize aqui para dar informações curtas e rápidas sobre seu bot" required type="text" id="description" name="description" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Convite do bot</label>
                        <p className="info text-sm mb-2">Se deixado em branco, criaremos um automaticamente</p>
                        <input type="text" placeholder="Algo tipo: https://discord.com/oauth2/authorize?client_id=ID&permissions=0&scope=bot%20applications.commands" id="invite" name="invite" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">Descrição do bot</label>
                        <textarea placeholder="Fale por que o seu bot é revolucionador e o motivo de adicionar ele" minLength={250} maxLength={4000} id="longDescription" name="longDescription" required className="formInput h-32 resize-none" onChange={handleChange}></textarea>
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="website">Website do bot</label>
                        <input placeholder="Autoexplicativo, algo tipo: https://andrepaiva.dev" type="text" id="website" name="website" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="github">GitHub do bot</label>
                        <input placeholder="Se ele for código aberto, algo tipo: https://github.com/euandrelucas" type="text" id="github" name="github" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark text-gray-200" htmlFor="support">Servidor de suporte do bot</label>
                        <input placeholder="Autoexplicativo também, algo tipo: https://discord.gg/dreamteam" type="text" id="support" name="support" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-2 mb-4">
                        <button type="submit" id="sendButton" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Enviar Bot</button>
                    </div>
                    <input type="hidden" id="owner" name="owner" ref={ownerRef} value={auth.token.sub} />
                </form>
            </div>
        </div>
    );
}
