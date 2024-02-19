import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRef } from 'react';

export default function CreateBot() {
    const { data: auth } = useSession();
    const ownerRef = useRef();

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
        apiKey: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerValue = ownerRef.current.value;
        try {
            const response = await fetch("/api/bots/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.NEXT_PUBLIC_API_KEY
                },
                body: JSON.stringify({ ...formData, owner: ownerValue }),
            });
            if (response.status === 200) {
                document.querySelector(".errorCard").style.display = "none";
                document.querySelector(".addCard").style.display = "none";
                document.querySelector(".successCard").style.display = "block";
                document.querySelectorAll("input").forEach((input) => {
                    input.disabled = true;
                });
                document.querySelectorAll("textarea").forEach((textarea) => {
                    textarea.disabled = true;
                });
                document.getElementById("sendButton").disabled = true;
                console.log("[@discoverd/logs] Bot enviado com sucesso!");
            } else {
                document.querySelector(".errorCard").style.display = "block";
                document.querySelector(".addCard").style.display = "none";
                switch (response.status) {
                    case 400:
                        document.getElementById("errorDetails").innerText = "Requisição inválida";
                        break;
                    case 401:
                        document.getElementById("errorDetails").innerText = "Não autorizado";
                        break;
                    case 403:
                        document.getElementById("errorDetails").innerText = "Proibido";
                        break;
                    case 404:
                        document.getElementById("errorDetails").innerText = "Bot não encontrado ou não existente";
                        break;
                    case 409:
                        document.getElementById("errorDetails").innerText = "Bot já adicionado";
                        break;
                    case 500:
                        document.getElementById("errorDetails").innerText = "Erro interno do servidor";
                        break;
                    default:
                        document.getElementById("errorDetails").innerText = "Erro inesperado";
                        break;
                }
                console.error("[@discoverd/logs] Erro ao enviar bot para a API");
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
                        <h2 className="heroTitle">Você precisa estar logado para adicionar um bot</h2>
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
            <section className="addCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
                <div>
                    <h2 className="heroTitle">Adicione seu bot em nossa lista</h2>
                    <h2 className="heroSubtitle">e veja ele crescer!</h2>
                </div>
            </section>
            <div className="max-w-screen-xl mx-auto p-4 mt-10 rounded">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium" htmlFor="id">ID do bot</label>
                        <input required="true" type="number" id="id" name="id" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Descrição curta</label>
                        <input placeholder="Utilize aqui para dar informações curtas e rápidas sobre seu bot" required="true" type="text" id="description" name="description" className="formInput" onChange={handleChange} />
                    </div>
                    <div>
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Convite do bot</label>
                        <p className="info text-sm mb-2">Se deixado em branco, criaremos um automaticamente</p>
                        <input type="text" id="invite" name="invite" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">Descrição do bot</label>
                        <textarea id="longDescription" name="longDescription" required="true" className="formInput h-32 resize-none" onChange={handleChange} ></textarea>
                    </div>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="website">Website do bot</label>
                        <input type="text" id="website" name="website" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="github">GitHub do bot</label>
                        <input type="text" id="github" name="github" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-1">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark text-gray-200" htmlFor="support">Servidor de suporte do bot</label>
                        <input type="text" id="support" name="support" className="formInput" onChange={handleChange} />
                    </div>
                    <div className="col-span-2">
                        <button type="submit" id="sendButton" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Enviar Bot</button>
                    </div>
                    <div>
                        <input type="hidden" id="owner" name="owner" className="formInput" ref={ownerRef} value={auth.token.sub} />
                    </div>
                </form>
            </div>
        </div>
    );
}
