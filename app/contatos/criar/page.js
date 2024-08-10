"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../contatos.module.css";
import Authenticator from '@/src/components/authenticator';
import useAuthenticatedFetch from '@/src/hooks/useAuthenticatedFetch';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function Criar() {
  const router = useRouter();
  const authenticatedFetch = useAuthenticatedFetch();

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
  const [data, setData] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 200 * 1024; // Tamanho máximo em bytes (200KB)    
    if (file.size > maxSize) {
      alert("A imagem excede o tamanho máximo de 200KB.");
      setImagem(null);
      event.target.value = null; // Limpar o campo de input
    } else {
      setImagem(file);
    }
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
    formData.append("data", data);
    if (imagem) {
      formData.append("image", imagem);
    }

    try {
      const resposta = await authenticatedFetch(`${baseUrl}/api/contatos`, {
        method: "POST",
        body: formData
      });

      if (resposta.ok) {
        router.push("/contatos");
      } else {
        alert("Erro ao cadastrar hidrante");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Erro ao cadastrar hidrante");
    }
  };

  return (
    <Authenticator>
      <div className={styles.scrollContainer}>
        <h2 className="text-4xl text-center font-bold dark:text-white">Cadastro de Hidrante</h2>
        <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="nome-hidrante" id="nome-hidrante" value={nome} onChange={(event) => setNome(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required />
            <label htmlFor="nome-hidrante" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do Hidrante</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="text-logradouro" id="floating_password" value={logradouro} onChange={(event) => setLogradouro(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required />
            <label htmlFor="text-logradouro" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Logradouro</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select id="bairro-select" name="bairro-select" value={bairro} onChange={(event) => setBairro(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer">
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
            <label htmlFor="bairro-select" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500">Bairro</label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="text-cidade" id="text-cidade" value={cidade} onChange={(event) => setCidade(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="text-cidade" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="text-uf" id="text-uf" value={uf} onChange={(event) => setUf(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="text-uf" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UF</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="number" name="latitude-number" id="latitude-number" value={latitude} onChange={(event) => setLatitude(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="latitude-number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude (S)</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="number" name="longitude-number" id="longitude-number" value={longitude} onChange={(event) => setLongitude(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="longitude-number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude (W)</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="" name="vazao-text" id="vazao-text" value={vazao} onChange={(event) => setVazao(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="vazao-text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vazão</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="pressao-text" id="pressao-text" value={pressao} onChange={(event) => setPressao(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="pressao-text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pressão</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="data-vistoria" id="data-vistoria" value={data} onChange={(event) => setData(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
              <label htmlFor="data-vistoria" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data da última vistoria</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select id="custom_select" name="custom_select" value={tipo} onChange={(event) => setTipo(event.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer">
                <option value="Hid Coluna Rosca">Hid Coluna Rosca</option>
                <option value="Hid Coluna Storz ">Hid Coluna Storz</option>
                <option value="Hid Caixa Rosca ">Hid Caixa Rosca</option>
                <option value="Hid Caixa Garra ">Hid Caixa Garra</option>
                <option value="Não informado ">Não informado </option>
              </select>
              <label htmlFor="custom_select" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500">Tipo de hidrante</label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">

            <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload da Imagem</label>
            <input type="file" name="image-upload" id="image-upload" onChange={handleImageChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
          </div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
          <textarea id="message" rows="4" value={observacao} onChange={(event) => setObservacao(event.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black-500 focus:border-black-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500" placeholder="Deixe aqui sua observaçao..."></textarea>
          <br></br>
          <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cadastrar</button>
          <Link href="/contatos" className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Cancelar</Link>
        </form>
      </div>
    </Authenticator>
  );
}
