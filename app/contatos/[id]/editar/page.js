"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Authenticator from '@/src/components/authenticator';
import styles from "../../contatos.module.css"

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContato(id) {
    try {
        const resposta = await fetch(`${baseUrl}/api/contatos/${id}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return [];
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [contato, setContato] = useState({
        nome: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        latitude: '',
        longitude: '',
        pressao: '',
        vazao: '',
        tipo: '',
        observacao: '',
        data: ''
    })
    const [imagem, setImagem] = useState(null)

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

    useEffect(() => {
        async function fetchData() {
            const data = await buscarContato(id)
            setContato(data)
        }
        fetchData()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setContato(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nome", contato.nome);
        formData.append("logradouro", contato.logradouro);
        formData.append("bairro", contato.bairro);
        formData.append("cidade", contato.cidade);
        formData.append("uf", contato.uf);
        formData.append("latitude", contato.latitude);
        formData.append("longitude", contato.longitude);
        formData.append("tipo", contato.tipo);
        formData.append("observacao", contato.observacao);
        formData.append("vazao", contato.vazao);
        formData.append("pressao", contato.pressao);
        formData.append("data", contato.data);
        if (imagem) {
            formData.append("image", imagem);
        }

        const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        });
        if (resposta.ok) {
            router.push("/contatos")
        }
        else {
            alert("Erro ao atualizar hidrante")
        }
    }

    return (
        <Authenticator>
            <div className={styles.scrollContainer}>
                <h2 className="text-4xl text-center font-bold dark:text-white">Atualizar Hidrante</h2>
                <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="nome" id="nome" value={contato.nome} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required />
                        <label htmlFor="nome" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do Hidrante</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="logradouro" id="logradouro" value={contato.logradouro} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required />
                        <label htmlFor="logradouro" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Logradouro</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select id="bairro-select" name="bairro" value={contato.bairro} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer">
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
                            <input type="text" name="cidade" id="cidade" value={contato.cidade} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="cidade" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="uf" id="uf" value={contato.uf} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="uf" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UF</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="number" name="latitude-" id="latitude" value={contato.latitude} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="latitude" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Latitude (S)</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="number" name="longitude" id="longitude" value={contato.longitude} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="longitude" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Longitude (W)</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="" name="vazao" id="vazao" value={contato.vazao} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="vazao" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vazão</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="pressao" id="pressao" value={contato.pressao} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="pressao" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pressão</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="data" id="data" value={contato.data} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " />
                            <label htmlFor="data" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data da última vistoria</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <select id="custom_select" name="custom_select" value={contato.tipo} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer">
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
                    <label htmlFor="observacao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
                    <textarea id="observacao" name="observacao" rows="4" value={contato.observacao} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black-500 focus:border-black-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500" placeholder="Deixe aqui sua observaçao..."></textarea>
                    <br></br>
                    <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cadastrar</button>
                    <Link href="/contatos" className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Cancelar</Link>
                </form>
            </div>
        </Authenticator>
    );
}