class CalculadoraIRPF {
  constructor() {
    this.listaDeducoes = [];
    this.previdencia = [];
    this.deducoes = {
      geral: 0,
      previdencia: 0,
    }
  }

  cadastrarDeducao(descricao, valor) {
    if (!descricao) throw new Error('DescricaoEmBrancoException');
    if (!valor || valor < 0) throw new Error('ValorDeducaoInvalidoException');

    this.listaDeducoes.push({
      valor,
      descricao
    })

    this.deducoes.geral += valor;
  };

  cadastrarPrevidencia(descricao, valor) {
    this.previdencia.push({
      descricao,
      valor
    });

    this.deducoes.previdencia = valor;
  }

  obterTotalDeducoes() {
    if (this.previdencia.length === 2) {
      return this.deducoes.geral + (this.previdencia[0].valor + this.previdencia[1].valor);
    }
    return this.deducoes.geral + this.deducoes.previdencia;
  }

  obterListaDeducoesGerais() {
    return this.listaDeducoes;
  }

  obterListaDeducoesPrevidenciarias() {
    return this.previdencia;
  }
}

module.exports = CalculadoraIRPF;