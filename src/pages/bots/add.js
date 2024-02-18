import Navbar from "../../components/Navbar";

export default function CreateBot() {
    return (
        <div>
        <Navbar />
        <section className="addCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
            <div>
                <h2 className="heroTitle">Adicione seu bot em nossa lista</h2>
                <h2 className="heroSubtitle">e veja ele crescer!</h2>
            </div>
        </section>
        <div className="addCard max-w-screen-xl mx-auto p-4 mt-10 rounded overflow-hidden shadow-lg">
            <form>
                <div className="flex flex-col">
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium" htmlFor="name">ID do bot</label>
                        <input type="text" id="id" name="id" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium" htmlFor="invite">Convite do bot</label>
                        <input type="text" id="invite" name="invite" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="avatar">Avatar do bot</label>
                        <input type="text" id="avatar" name="avatar" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">Descrição do bot</label>
                        <textarea id="description" name="description" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="tags">Tags do bot</label>
                        <input type="text" id="tags" name="tags" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="website">Website do bot</label>
                        <input type="text" id="website" name="website" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="github">GitHub do bot</label>
                        <input type="text" id="github" name="github" className="formInput" />
                    </div>
                    <div className="w-1/2">
                        <label className="formQuestion block text-sm font-medium text-gray-700 dark text-gray-200" htmlFor="support">Servidor de suporte do bot</label>
                        <input type="text" id="support" name="support" className="formInput" />
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}