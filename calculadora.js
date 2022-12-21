class CalculadoraIRPF {
  constructor() {
    this.listaDeducoes = [];
    this.totalDeducao = 0;
  }

  cadastrarDeducao(descricao, valor) {
    if (!descricao) throw new Error('DescricaoEmBrancoException');
    if (!valor || valor < 0) throw new Error('ValorDeducaoInvalidoException');

    this.listaDeducoes.push({
      valor,
      descricao
    })

    this.totalDeducao = valor;
  };

  obterTotalDeducoes() {
    if (this.listaDeducoes.length === 2) {
      return this.listaDeducoes[0].valor + this.listaDeducoes[1].valor; 
    }
    if (this.listaDeducoes.length === 3) {
      return this.listaDeducoes[0].valor + this.listaDeducoes[1].valor + this.listaDeducoes[2].valor; 
    }
    return this.totalDeducao;
  }

  obterListaDeducoesGerais() {
    return this.listaDeducoes;
  }
}

module.exports = CalculadoraIRPF;