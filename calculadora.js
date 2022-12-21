class CalculadoraIRPF {
  constructor() {
    this.listaDeducoes = [];
    this.previdencia = [];
    this.dependentes = [];
    this.deducoes = {
      geral: 0,
      previdencia: 0,
      pensao: 0,
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

    this.deducoes.previdencia += valor;
  }

  cadastrarPensao(valor) {
    this.deducoes.pensao += valor;
  }

  cadastrarDependente(nome, dataNascimento) {
    this.dependentes.push({
      nome,
      dataNascimento
    })
  }

  obterTotalDeducoes() {
    return this.deducoes.geral + this.deducoes.previdencia + this.deducoes.pensao + (189.59 * this.dependentes.length);
  }

  obterListaDeducoesGerais() {
    return this.listaDeducoes;
  }

  obterListaDeducoesPrevidenciarias() {
    return this.previdencia;
  }

  obterListaDeDependentes() {
    return this.dependentes;
  }
}

module.exports = CalculadoraIRPF;