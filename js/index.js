async function buscaEndereco(cep) {
  const msgErro = document.getElementById("erro");
  msgErro.innerHTML = "";
  try {
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const consultaCepConvertidoJSON = await consultaCEP.json();
    const cidade = document.getElementById("cidade");
    const logradouro = document.getElementById("endereco");
    const estado = document.getElementById("estado");
    const bairro = document.getElementById("bairro");

    if (consultaCepConvertidoJSON.erro) {
      throw Error("CEP Nao existente!");
    }

    cidade.value = consultaCepConvertidoJSON.localidade;
    logradouro.value = consultaCepConvertidoJSON.logradouro;
    estado.value = consultaCepConvertidoJSON.uf;
    bairro.value = consultaCepConvertidoJSON.bairro;

    return consultaCepConvertidoJSON;
  } catch (error) {
    msgErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
    console.log(error);
  }
}

let cep = document.getElementById("cep"); // pega elemento pelo ID
cep.addEventListener("input", () => buscaEndereco(cep.value)); //focusout é um evento quando vc clica no campo selecionado vai tirar o foco
