"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../contatos.module.css"
import Authenticator from '@/src/components/authenticator';

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [vazao, setVazao] = useState("");
  const [pressao, setPressao] = useState("");
  const [datadaultimavistoria, setDatadaultimavistoria] = useState("");
  const [imagem, setImagem] = useState(null)

  const handleImageChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("logradouro", logradouro);
    formData.append("bairro", bairro);
    formData.append("cidade", cidade);
    formData.append("uf", uf);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("tipo", tipo);
    formData.append("observacao", observacao);
    formData.append("vazao", vazao);
    formData.append("pressao", pressao);
    formData.append("datadaultimavistoria", datadaultimavistoria);
    if (imagem) {
      formData.append("image", imagem);
    }

    const resposta = await fetch(`${baseUrl}/api/contatos`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    });
    if (resposta.ok) {
      router.push("/contatos")
    }
    else {
      alert("Erro ao cadastrar hidrante")
    }
  }

  return (
    <Authenticator>
      <div className={styles.scrollContainer}>
        <h2 class="text-4xl text-center font-bold dark:text-white">Cadastro de Hidrante</h2>
        <form class="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="nome-hidrante" id="nome-hidrante" value={nome} onChange={(event) => setNome(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="nome-hidrante" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do Hidrante</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="text-logradouro" id="floating_password" value={logradouro} onChange={(event) => setLogradouro(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="text-logradouro" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Logradouro</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select id="bairro-select" name="bairro-select" value={bairro} onChange={(event) => setBairro(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <option value="Brigadeira">Brigadeira</option>
              <option value="Centro">Centro</option>
              <option value="Estância Velha">Estância Velha</option>
              <option value="Fátima">Fátima</option>
              <option value="Guajuviras">Guajuviras</option>
              <option value="Harmonia">Harmonia</option>
              <option value="Igara">Igara</option>
              <option value="Ilha das Garças">Ilha das Garças</option>
              <option value="Industrial">Industrial</option>
              <option value="Marechal Rondon">Marechal Rondon</option>
              <option value="Mathias Velho">Mathias Velho</option>
              <option value="Mato Grande">Mato Grande</option>
              <option value="Niterói">Niterói</option>
              <option value="Nossa Senhora das Graças">Nossa Senhora das Graças</option>
              <option value="Olaria">Olaria</option>
              <option value="Rio Branco">Rio Branco</option>
              <option value="São José">São José</option>
              <option value="São Luiz">São Luiz</option>
            </select>
            <label for="bairro-select" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Bairro</label>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="text-cidade" id="text-cidade" value={cidade} onChange={(event) => setCidade(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="text-cidade" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="text-uf" id="text-uf" value={uf} onChange={(event) => setUf(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="text-uf" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UF</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input type="number" name="latitude-number" id="latitude-number" value={latitude} onChange={(event) => setLatitude(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="latitude-number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude (S)</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="number" name="longitude-number" id="longitude-number" value={longitude} onChange={(event) => setLongitude(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="longitude-number" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude (W)</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="" name="vazao-text" id="vazao-text" value={vazao} onChange={(event) => setVazao(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="vazao-text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vazão</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="pressao-text" id="pressao-text" value={pressao} onChange={(event) => setPressao(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="pressao-text" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pressão</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input type="text" name="data-vistoria" id="data-vistoria" value={datadaultimavistoria} onChange={(event) => setDatadaultimavistoria(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="data-vistoria" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data da última vistoria</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <select id="custom_select" name="custom_select" value={tipo} onChange={(event) => setTipo(event.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                <option value="Hid Coluna Rosca">Hid Coluna Rosca</option>
                <option value="Hid Coluna Storz ">Hid Coluna Storz</option>
                <option value="Hid Caixa Rosca ">Hid Caixa Rosca</option>
                <option value="Hid Caixa Garra ">Hid Caixa Garra</option>
                <option value="Não informado ">Não informado </option>
              </select>
              <label for="custom_select" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Tipo de hidrante</label>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload da Imagem</label>
            <input type="file" name="image-upload" id="image-upload" onChange={handleImageChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
          <textarea id="message" rows="4" value={observacao} onChange={(event) => setObservacao(event.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deixe aqui sua observaçao..."></textarea>
          <br></br>
          <button type="submit" class="text-white mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cadastrar</button>
          <Link href="/contatos" class='text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-2'>Cancelar</Link>
        </form>
      </div>
    </Authenticator>

  );
}