 document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("poltronas");
  const selectedSeat = document.getElementById("selected-seat");
  const confirmarBtn = document.getElementById("confirmar");

  // Configuração: quantidade de poltronas por fileira
  const fileiras = [
    { letra: 'M', qtd: 17 }, // Última poltrona será maior (17)
    { letra: 'L', qtd: 17 },
    { letra: 'K', qtd: 16 },
    { letra: 'J', qtd: 15 },
    { letra: 'I', qtd: 15 },
    { letra: 'H', qtd: 14 },
    { letra: 'G', qtd: 13 },
    { letra: 'F', qtd: 13 },
    { letra: 'E', qtd: 12 },
    { letra: 'D', qtd: 11 },
    { letra: 'C', qtd: 10 },
    { letra: 'B', qtd: 10 },
    { letra: 'A', qtd: 9 }
  ];

  let poltronasSelecionadas = [];

  // Criar poltronas
  fileiras.forEach((fileira, i) => {
    const { letra, qtd } = fileira;

    // Linha completa
    const row = document.createElement("div");
    row.className = "seat-row";

    // Label esquerda
    const labelLeft = document.createElement("div");
    labelLeft.className = "label-left";
    labelLeft.textContent = letra;
    row.appendChild(labelLeft);

    // Container centralizado de poltronas
    const seats = document.createElement("div");
    seats.className = "seats-container";

    // Gerar números decrescentes
    for (let j = qtd; j >= 1; j--) {
      const id = `${letra}${j}`;
      const div = document.createElement("div");
      div.className = "poltrona";
      div.textContent = j.toString().padStart(2, '0');
      div.id = id;

      // Tamanho maior para a última poltrona da fileira M (17)
      if (letra === 'M' && j === 17) {
        div.classList.add("maior");
      }

      div.addEventListener("click", function () {
        // Não pode clicar em ocupada ou bloqueada
        if (this.classList.contains("ocupada") || this.classList.contains("bloqueada")) {
          return;
        }

        if (this.classList.contains("selecionada")) {
          this.classList.remove("selecionada");
          poltronasSelecionadas = poltronasSelecionadas.filter(p => p !== id);
        } else {
          this.classList.add("selecionada");
          poltronasSelecionadas.push(id);
        }

        atualizarLista();
      });

      seats.appendChild(div);
    }

    row.appendChild(seats);

    container.appendChild(row);
  });

  // Função para atualizar a lista de seleções
  function atualizarLista() {
    if (poltronasSelecionadas.length === 0) {
      selectedSeat.innerHTML = "Nenhuma poltrona selecionada";
      confirmarBtn.classList.add("d-none");
    } else {
      const lista = poltronasSelecionadas.join(", ");
      selectedSeat.innerHTML = `<strong>${lista}</strong>`;
      confirmarBtn.classList.remove("d-none");
    }
  }

  window.confirmar = function () {
    alert(`Ingressos confirmados para as poltronas: ${poltronasSelecionadas.join(", ")}`);
    // Aqui você pode redirecionar para pagamento
  };
});