"use client"

export default function Home() {
    return (
        <div style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "20px"
        }}>
            <h2 className="text-4xl mt-5 text-center font-bold dark:text-white">Página de Ajuda</h2>
            <p className="text-center my-4 text-lg text-gray-500">Clique no card que melhor representar a sua dúvida.</p>

            <div className='mt-10 md:container md:mx-auto flex align-center justify-center gap-4 flex-wrap'>
                <a href="#comologar" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como entrar na minha conta?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> 
                    Dúvidas sobre como entrar na sua conta? Clique aqui.
                </p>
                </a>

                <a href="#comocadastrar" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como cadastrar um hidrante?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">                    
                    Dúvidas sobre como cadastrar um hidrante? Clique aqui.
                </p>
                </a>

                <a href="#comopreencher" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como preencher o cadastro de hidrante?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">                    
                    Dúvidas sobre como preencher o cadastro de um hidrante? Clique aqui.
                </p>
                </a>


                <a href="#comoeditar-excluir" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Posso editar ou excluir um hidrante?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> 
                    Dúvidas sobre editar ou excluir um hidrante? Clique aqui.
                </p>
                </a>

                <a href="#comolocalizar" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como posso localizar um hidrante mais rapidamente?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> 
                    Dúvidas sobre como localizar mais rapidamente o hidrante? Clique aqui.
                </p>

                </a>
                <a href="#comoadministrar" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Como administrar usuários?</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> 
                    Dúvidas sobre como administrar os usuários? Clique aqui.
                </p>
                </a>
                 <div className='mt-10 px-[11%]'>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <h2 className="text-4xl text-center font-bold dark:text-white">Mais informações</h2>
                    <p id="comologar" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Como fazer entrar na sua conta?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    1 - Na página inicial, localize o menu superior e clique em <strong>Login</strong>. <br></br>
                    2 - Você será direcionado para a página login.<br></br>
                    3 - Na página de login, Utilize suas credenciais de acesso para entrar no sistema.<br></br>
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p id="comocadastrar" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Como cadastrar um hidrantes?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    1 - Na página inicial, localize o menu superior e clique em <strong>Hidrantes</strong>. <br></br>
                    2 - Você será direcionado para a página de listagem de hidrantes.<br></br>
                    3 - Na página de listagem, clique no botão <strong>Adicionar Hidrante</strong>.<br></br>
                    4 - Será solicitado o login para realizar a ação de cadastro.<br></br>
                    5 - Utilize suas credenciais de acesso para entrar no sistema. <br></br>
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br>

                    <p id="comopreencher" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Como preencher o cadastro de hidrante?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    Nome do Hidrante (Código): Insira um nome descritivo para o hidrante, seguido de um código único para identificação. <br></br>
                    Logradouro (Endereço): Informe o endereço completo do local onde o hidrante está instalado, incluindo rua, número, complemento, bairro e CEP.<br></br>
                    Bairro: Selecione o bairro onde o hidrante está localizado.<br></br>
                    Cidade: Selecione a cidade onde o hidrante está localizado.<br></br>
                    UF: Selecione o estado (UF) onde o hidrante está localizado.<br></br>
                    Latitude: Insira a latitude geográfica do local onde o hidrante está instalado. A latitude é medida em graus e varia de 0° a 90° norte ou sul.<br></br>
                    Longitude: Insira a longitude geográfica do local onde o hidrante está instalado. A longitude é medida em graus e varia de 0° a 180° leste ou oeste.<br></br>
                    Tipo de Hidrante: Selecione o tipo de hidrante que está sendo cadastrado, de acordo com as opções disponíveis no sistema.<br></br>
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p id="comoeditar-excluir" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Posso editar ou excluir um hidrante?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    Caso você tenha permissao de Administrador é possível editar ou excluir.<br></br>
                    1 - Localize o menu superior e clique em <strong>Hidrantes</strong>. <br></br>
                    2 - Você será direcionado para a página de listagem de hidrantes.<br></br>
                    3 - Na página de listagem, clique no botão <strong>Detalhes</strong>.<br></br>
                    4 - Abrirá uma aba com mais detalhes do hidrante já com as opçoes de editar ou excluir o hidrante selecionado.<br></br>
                    5 - Edite ou Exclua o hidrante desejado. <br></br>
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p id="comolocalizar" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Como posso localizar um hidrante mais rapidamente?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    Caso você tenha permissao de Administrador é possível editar ou excluir.<br></br>
                    1 - Localize o menu superior e clique em <strong>Hidrantes</strong>. <br></br>
                    2 - Você será direcionado para a página de listagem de hidrantes.<br></br>
                    3 - Na página de listagem, clique no botão <strong>Localizar</strong>.<br></br>
                    4 - Abrirá uma nova aba em seu navegador na página do google maps com a localizaçao do hidrante desejado<br></br>
                    </p>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p id="comoadministrar" className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Como administrar usuários?</p>
                    <p className="text-gray-500 dark:text-gray-400">
                    Neste caso, é necessário que você seja um administrador. Já logado em sua conta siga o passo-a-passo:<br></br>
                    1 - Localize o menu superior e clique em <strong>Usuários</strong>. <br></br>
                    2 - Você será direcionado para a página de usuários<br></br>
                    3 - Na página de usuários, localize o usuário que deseja administrar.<br></br>
                    4 - Clique no botão <strong>Detalhes</strong> <br></br>
                    5 - Abrirá uma aba com mais detalhes do usuário desejado. <br></br>
                    </p>

                </div>
            </div>
        </div>
    )
}