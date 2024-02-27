import Navbar from "../../../components/Navbar.jsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EditBot() {
    const { data: auth } = useSession();
    const [botData, setBotData] = useState({});
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
        apiKey: "",
    });

    const [mostrarChave, setMostrarChave] = useState(false);

    const toggleChave = () => {
      setMostrarChave((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchBot = async () => {
            try {
                const response = await fetch(`/api/bots/${window.location.pathname.split("/")[3]}?apiKey=true`);
                const data = await response.json();
                console.log(data)

                if (data.owner !== auth.token.sub) {
                    window.location.href = "/";
                }

                document.getElementById("id").value = data._id;
                document.getElementById("description").value = data.description || "";
                document.getElementById("longDescription").value = data.longDescription || "";
                document.getElementById("website").value = data.website || "";
                document.getElementById("github").value = data.github || "";
                document.getElementById("support").value = data.support || "";
                document.getElementById("invite").value = data.invite || `https://discord.com/oauth2/authorize?client_id=${data._id}&permissions=8&scope=bot%20applications.commands`;


                setBotData(data);

                setFormData({
                    id: data._id,
                    invite: data.invite || "",
                    avatar: data.avatar || "",
                    description: data.description || "",
                    longDescription: data.longDescription || "",
                    website: data.website || "",
                    github: data.github || "",
                    support: data.support || "",
                    owner: data.owner || "",
                    apiKey: data.apiKey || "",
                });
            } catch (error) {
                console.error("Error fetching bot:", error);
            }
        };

        fetchBot();
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/bots/edit/${window.location.pathname.split("/")[3]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_API_KEY,
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                console.log("[@discoverd/logs] Bot editado com sucesso!");
                window.location.href = `/bots/${botData._id}?edit=success`;
            } else {
                document.querySelector(".errorCard").style.display = "block";
                document.getElementById("errorDetails").innerText = "Erro ao editar bot na API";
                console.error("[@discoverd/logs] Erro ao editar bot na API");
            }
        } catch (error) {
            console.error("[@discoverd/logs] Erro inesperado", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!auth?.session.user) {
        return (
            <div>
                <Navbar />
                <section className="max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                    <div>
                        <h2 className="heroTitle">Você precisa estar logado para editar um bot</h2>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <section className="hidden successCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <div>
                    <h2 className="heroTitle">Bot adicionado com sucesso!</h2>
                    <h2 className="heroSubtitle">Agora aguarde nossa equipe verificar ele!</h2>
                </div>
            </section>
            <section className="hidden errorCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <div>
                    <h2 className="heroTitle">Ocorreu um erro ao adicionar seu bot</h2>
                    <h2 className="heroSubtitle" id="errorDetails">Tente novamente mais tarde</h2>
                </div>
            </section>
            <section className="max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
        <p className="apiText">API Key:&nbsp;</p>
        <p className={mostrarChave ? 'apiText' : 'apiText borrado'}>
          {botData.apiKey}
        </p>
        &nbsp;
        <div>
        &nbsp;
        &nbsp;
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={toggleChave}>
          {mostrarChave ? 'Ocultar Chave' : 'Mostrar Chave'}
        </button>
        </div>
      </section>
            <section className="max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <form onSubmit={handleSubmit}>
                <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="id">ID do bot</label>
                        <input required={true} type="number" placeholder="O ID de seu bot no discord (vulgo aplicativo)" id="id" name="id" className="formInput" disabled={true} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Descrição curta</label>
                        <input minLength={50} maxLength={250} placeholder="Utilize aqui para dar informações curtas e rápidas sobre seu bot" required={true} type="text" id="description" name="description" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Convite do bot</label>
                        <p className="info text-sm mb-2">Se deixado em branco, criaremos um automaticamente</p>
                        <input type="text" placeholder="Algo tipo: https://discord.com/oauth2/authorize?client_id=ID&permissions=0&scope=bot%20applications.commands" id="invite" name="invite" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">Descrição do bot</label>
                        <textarea placeholder="Fale por que o seu bot é revolucionador e o motivo de adicionar ele" minLength={250} maxLength={4000} id="longDescription" name="longDescription" required={true} className="formInput h-32 resize-none" onChange={handleChange} ></textarea>
                    </div>
                    <div className="col-span-1 mb-4">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="website">Website do bot</label>
                        <input placeholder="Autoexplativo, algo tipo: https://andrepaiva.dev" type="text" id="website" name="website" className="formInput" onChange={handleChange} />
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Salvar Edições
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
