const chaveDaApi = "0c206930e417442ea5805040241005";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").value;
  const dados = await buscarDadosDaCidade(cidade);

  if (!cidade) return;

  if (dados) preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);
  if (resposta.status !== 200) return;
  const dados = resposta.json();
  return dados;
}

function preencherDadosNaTela(dados, cidade) {
  const temperatura = dados.current.temp_c;
  const condicao = dados.current.condition.text;
  const humidade = dados.current.humidity;
  const velocidadeDoVento = dados.current.wind_kph;
  const iconeCondicao = dados.current.condition.icon;

  document.getElementById("cidade").textContent = cidade;
  document.getElementById("temperatura").textContent = `${temperatura}ºC`;
  document.getElementById("condicao").textContent = condicao;
  document.getElementById("humidade").textContent = `${humidade}%`;
  document.getElementById(
    "velocidade-do-vento"
  ).textContent = `${velocidadeDoVento}Km/h`;
  document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}
