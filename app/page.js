import Image from 'next/image'

export default function Home() {
  return (
    <div className="mapaCanoas flex flex-col justify-center	items-center">
      <br></br>
      <br></br>
      <h2 className="text-center text-4xl font-extrabold dark:text-white">Selecione o bairro da ocorrência</h2>
      <p className="text-center	my-4 text-lg text-gray-500">Encontre hidrantes com facilidade: clique no mapa do bairro da ocorrência.</p>

      <Image
        src="/mapa-canoas.png"
        useMap="#image-map"
        alt="Mapa da cidade de Canoas"
        width={550}
        height={427}
      />
      <map name="#image-map">
        <area target="" alt="Brigadeira" title="Brigadeira" href="contatos?bairro=Brigadeira" coords="339,90,341,74,219,67,223,51,217,29,229,29,264,0,278,10,294,16,305,16,315,20,327,20,341,18,356,16,368,20,380,20,388,31,399,25,427,90" shape="poly" />
        <area target="" alt="Centro" title="Centro" href="contatos?bairro=Centro" coords="234,136,219,179,186,177,182,233,220,247,231,261" shape="poly" />
        <area target="" alt="Estância Velha" title="Estância Velha" href="contatos?bairro=Estância Velha" coords="350,239,323,252,308,254,299,250,307,169,323,169,373,178,363,198,371,215,370,224,371,234,364,252" shape="poly" />
        <area target="" alt="Fátima" title="Fátima" href="contatos?bairro=Fátima" coords="220,246,202,251,179,285,150,292,153,357,235,333,229,264" shape="poly" />
        <area target="" alt="Guajuviras" title="Guajuviras" href="contatos?bairro=Guajuviras" coords="341,91,335,96,344,96,344,114,334,126,323,168,373,176,420,207,432,207,432,195,435,184,441,179,446,184,454,178,451,166,455,161,426,93,341,91" shape="poly" />
        <area target="" alt="Harmonia" title="Harmonia" href="contatos?bairro=Harmonia" coords="29,161,30,175,179,233,186,177" shape="poly" />
        <area target="" alt="Igara" title="Igara" href="contatos?bairro=Igara" coords="230,122,233,132,233,165,321,169,334,127,297,120" shape="poly" />
        <area target="" alt="Ilha das Garças" title="Ilha das Garças" href="contatos?bairro=Ilha das Garças" coords="66,302,75,352,79,370,98,394,120,386,132,384,151,357" shape="poly" />
        <area target="" alt="Industrial" title="Industrial" href="contatos?bairro=Industrial" coords="41,83,27,66,48,50,48,21,55,11,154,13,179,14,217,30,223,51,217,63,219,90" shape="poly" />
        <area target="" alt="Marechal Rondon" title="Marechal Rondon" href="contatos?bairro=Marechal Rondon" coords="235,166,306,170,299,251,283,254,270,242,245,237,231,245" shape="poly" />
        <area target="" alt="Mathias Velho" title="Mathias Velho" href="contatos?bairro=Mathias Velho" coords="231,144,37,130,29,163,219,180" shape="poly" />
        <area target="" alt="Mato Grande" title="Mato Grande" href="contatos?bairro=Mato Grande" coords="16,195,29,206,29,213,16,228,21,238,32,244,46,275,62,289,68,302,151,357,148,292,181,285,200,253,219,248,30,176,2,176" shape="poly" />
        <area target="" alt="Niterói" title="Niterói" href="contatos?bairro=Niterói" coords="233,283,269,282,274,318,304,318,328,367,317,377,317,386,304,396,301,387,291,387,284,396,272,390,266,396,236,396" shape="poly" />
        <area target="" alt="Nossa Senhora das Graças" title="Nossa Senhora das Graças" href="contatos?bairro=Nossa Senhora das Graças" coords="397,283,397,295,390,303,395,311,392,327,393,348,383,360,367,373,348,358,340,371,328,367,302,318,274,318,271,282,230,285,230,246,243,236,271,243,281,253,298,252,312,254,347,239,382,264,393,272" shape="poly" />
        <area target="" alt="Olaria" title="Olaria" href="contatos?bairro=Olaria" coords="373,177,363,199,371,216,369,225,370,233,364,251,382,264,392,271,403,258,410,242,418,235,425,226,430,210,418,209" shape="poly" />
        <area target="" alt="Rio Branco" title="Rio Branco" href="contatos?bairro=Rio Branco" coords="151,359,233,333,235,395,223,400,204,398,177,401,161,408,150,405,143,392,132,385" shape="poly" />
        <area target="" alt="São José" title="São José" href="contatos?bairro=São José" coords="219,92,230,123,297,121,334,127,344,115,344,97,338,95,341,75,219,68" shape="poly" />
        <area target="" alt="São Luiz" title="São Luiz" href="contatos?bairro=São Luiz" coords="26,65,8,79,0,93,0,110,5,128,2,145,7,161,3,175,29,175,29,161,38,130,228,143,233,131,217,90,41,81" shape="poly" />
      </map>
    </div>
  )
}

