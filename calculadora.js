class CalculadoraIRPF {
  constructor() {
    this.totalRendimento = 0;
    this.listaRendimentos = [];
    this.impostoRendimento = 0;
    this.aliquota = 0;
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

  calculoImposto() {
    let baseImposto = this.obterBaseCalculo()
    baseImposto = baseImposto - 1903.98 
    if (baseImposto < 0){
      return this.impostoRendimento = 0;
    } else if (baseImposto <= 922.67) {
      return this.impostoRendimento = baseImposto * 0.075;

    } else if (baseImposto > 922.67 && baseImposto <= 1847.07) {
      baseImposto = baseImposto - 922,67;
      return this.impostoRendimento = (baseImposto * 0.15) + 69.20;

    } else if (baseImposto > 1847.07 && baseImposto <= 2760.7) {
      baseImposto = baseImposto - 1847.07;
      return this.impostoRendimento = (baseImposto * 0.225) + 138.66 + 69.20;

    } else if (baseImposto > 2760.7) {
      baseImposto = baseImposto - 2760.7;
      return this.impostoRendimento = (baseImposto * 0.275) + 205.56 + 138.66 + 69.20;
    }
  } 

  obterAliquota(){
    this.calculoImposto();  
    let impost = this.impostoRendimento;  

    return this.aliquota = impost*100/this.totalRendimento;
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


  obterTotalRendimentos() {
    return this.totalRendimento;
  }

  obterBaseCalculo() {
    return this.totalRendimento - this.obterTotalDeducoes();
  }
}

module.exports = CalculadoraIRPF;