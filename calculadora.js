class CalculadoraIRPF {
  constructor() {
this.totalRendimento = 0;
    this.listaRendimentos = [];

    this.listaDeducoes = [];
    this.previdencia = [];
    this.dependentes = [];
    this.deducoes = {
      geral: 0,
      previdencia: 0,
      pensao: 0,
    }
  }

  cadastrarRendimento(descricao, valor) {
    if (!descricao) throw 'DescricaoEmBrancoException';
    if (!valor || valor < 0) throw 'ValorRendimentoInvalidoException'

    this.listaRendimentos.push({
      valor,
      descricao
    });
    this.totalRendimento += valor;
  }

  obterTotalRendimentos() {
    return this.totalRendimento;
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

  obterBaseCalculo() {
    return this.totalRendimento - this.obterTotalDeducoes();
  }
}

module.exports = CalculadoraIRPF;