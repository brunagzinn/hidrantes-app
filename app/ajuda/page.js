"use client"

export default function Home() {
    return (
        <div style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "20px"
        }}>
            <div className='mt-20 md:container md:mx-auto flex align-center justify-center gap-4 flex-wrap'>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como Cadastrar hidrantes?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Na página inicial, no menu superior clique em Hidrantes e você será redirecionado para a
                        página da listagem de Hidrantes, clique em Adicionar. Será solicitado o login para realizar a
                        ação. Deve ser preenchido Nome do hidrante(código), logradouro(endereço), selecionar
                        bairro, cidade, UF, latitude e longitude, e por fim o tipo de hidrante. Clique em cadastrar para
                        finalizar a ação.
                    </p>
                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <ul style={{ listStyle: "unset" }}>
                            <li>A latitude é a medida em graus de qualquer ponto da superfície terrestre até a Linha
                                do Equador, que varia de 0º até 90º norte ou sul.</li>
                            <li>E longitude é a medida em graus de qualquer ponto da superfície terrestre até o
                                Meridiano de Greenwich, que varia de 0º até 180º leste ou oeste.</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar usuários?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar usuários?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar usuários?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar usuários?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>

                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar usuários?</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
                <div className='mt-10 px-[11%]'>
                    <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work and deploy.</p>
                    <p className="text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>
                </div>
            </div>
        </div>
    )
}