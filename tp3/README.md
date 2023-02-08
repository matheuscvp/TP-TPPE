# Trabalho prático 3 - Qualidade do projeto de código

## 1. Simplicidade

### 1.1 Descrição

A simplicidade de um código traz inúmeros benefícios, especialmente quando falamos da parte humana. Um código simples, mais conciso, permite um melhor entendimento do código por um terceiro, ou até mesmo pelos próprios desenvolvedores ao realizar futuros ajustes no código. Um código simples também facilita futuras evoluções no código.

### 1.2 Relação com Maus Cheiros

1. **Método longo:** um método muito longo dificulta o entendimento do que é feito por esse método. Uma pessoa sem um conhecimento profundo do código tende a ter grandes dificuldades no entendimento do código ao se deparar com um método longo.

2. **Classe grande/inchada:** uma classe inchada é responsável pela realização de diversas operações, **reduzindo a sua coesão e aumentando seu acoplamento,** indesejado quando buscamos a simplicidade do código. É comum que em classes muito grandes tenhamos código duplicado.

3. **Lista de parâmetros longa demais:** uma lista de parâmetros muito grande dificulta o entendimento do que está sendo feito, além de indicar, muitas vezes, que existe um alto acoplamento. Além disso, uma longa lista de parâmetros dificulta a utilização posterior da funcionalidade.

### 1.3 Operação de Refatoração

1. **Extrair método:** ao realizar a extração de um método podemos separar as operações realizadas originalmente por método. Com isso diminuímos as atribuições de um método. Isso permite:
      
        a. melhor entendimento do que é feito por um método
        b. facilita futuras alterações nos métodos

      Um dos pontos a se considerar é a eventual dificuldade que possa surgir de entendimento de um projeto quando temos muitos métodos. Para evitar esse problema, é importante considerar a utilização de nomes significativos para representar o que um método realiza.

2. **Renomear variáveis:** variáveis com nomes significativos facilitam o entendimento da função de cada variável na aplicação. Essa propriedade é fundamental para quem não tem um contato com o código para que esse código possa ser considerado de simples entendimento.

3. **Utilização de objetos ao invés de parâmetros:** em certos cenários é interessante a utilização de objetos para se obter dados necessários para a realização de uma operação em um método. Podemos tanto passar um objeto que possua um conjunto de dados necessários ou realizar a obtenção do dado necessário dentro do próprio método.

4. **Comentários:** Os comentários permitem que os desenvolvedores coloquem a sua visão e seus objetivos no desenvolvimento de uma parte do código, podendo assim explicar o que é feito. Assim, bons comentários simplificam o entendimento do código de forma geral.

## 2 Modularidade

### 2.1 Descrição
A modularidade de um produto de software está relacionada à flexibilidade  e compreensibilidade de um código ao permitir a redução do seu tempo de desenvolvimento.

Ao seguirmos o princípio de modularização em um código cada atividade formará um módulo de programa separado e distinto, com suas entradas e saídas bem definidas. Este deve ser feito de tal forma a não gerar confusão com outros módulos do código. O resultado será um código mantido de forma modular onde os erros e deficiências do software podem ser rastreados para módulos específicos do mesmo, limitando assim o escopo da busca detalhada de erros.
      
      Alguns dos benefícios da modularização de código são:
        - Menor tempo de desenvolvimento;
        - Mudanças drásticas são menos trabalhosas;
        - Uma melhor compreensibilidade do código;

### 2.2 Relação com Maus Cheiros
Para falarmos da relação entre modularidade de código e maus cheiros é preciso primeiro falar sobre coesão e acoplamento de código que são os indicadores utilizados para medir a modularidade de um código. Um código coeso traz consigo o princípio da responsabilidade única, ou seja, uma classe deve ter uma única responsabilidade e realizá - la de forma satisfatória. Em complemento, o acoplamento é a medida de interdependência entre os componentes de um sistema.

Um código com baixa coesão dificulta sua manutenção e reuso, pois teremos classes com muitas responsabilidades, tornando - as grandes, o que dificulta sua compreensão. Há também grandes chances de haver código duplicado nessas classes.

Classes  com baixa coesão tendem a ter muito acoplamento, pois são dependentes ou são despendidas por  muitas outras classes, já que essas tendem a ter mais de uma responsabilidade e/ou não a realizam de maneira satisfatória. Isso aumenta a probabilidade de  alterações numa classe afetar outras, dificultando modificações e a manutenabilidade do código como já mencionado. 

Mudanças divergentes, cirurgia com rifle, inveja de recursos, obsessão primitiva e classes grandes são alguns dos maus cheiros de código resultantes de classes com baixa coesão e alto acoplamento.

### 2.3 Operação de Refatoração
1. **Extrair classe:** para agrupar um número de variáveis que juntas fazem algum sentido para o projeto.

2. **Extrair subclasse:** para agrupar um número de variáveis que fazem sentido como uma subclasse da classe em que estão.

3. **Extrair interface:** ao avaliar como os clientes utilizam a classe, extraia interfaces para cada um dos tipos de uso.

4. **Mover método ou mover campo:** para colocar todas as variações em uma única classe.

5. **Incorporar classe:** para agrupar um conjunto de comportamentos em uma única estrutura

6. **Extrair método/mover método:** para casos em que a inveja ocorre apenas em um trecho do código da outra classe.

7. **Trocar tipo código por classe:** quando os dados representam um código.

8. **Trocar tipo código por subclasses ou Trocar tipo código com State/Strategy:** quando os dados são utilizados em comandos condicionais. 

9. **Introduzir parâmetro objeto:** quando um conjunto de dados aparece em uma assinatura de um método.

## 3 Boa Documentação

### 3.1 Descrição
Uma boa documentação deve ser orgânica, específica, concisa e relevante, pois, ela deve acompanhar a evolução do software, fornecendo todas as informações importantes para as pessoas usando o programa, seja ela para programadores e testadores, para documentos técnicos de usuários internos ou para manuais de software e arquivos de ajuda para usuários finais. Documentar um software é transcrever informações que não são implícitas ao produto de software, a documentação pode ser realizada em todos os níveis do processo de software, tanto para o código-fonte do software quanto para documentar os requisitos e a arquitetura utilizada definida para cada projeto.

### 3.2 Relação com Maus Cheiros
Mudanças divergentes: Quando as regras de negócio mudam, o comportamento de certas funcionalidades e classes muda, e se essas regras de negócio não forem seguidas na documentação de cada funcionalidade, isso pode prejudicar futuras refatorações de software, pois não há alinhamento entre a documentação e a implementação do produto.

**Comentários:** Um bom código deve ser simples e fácil de entender, e documentá-lo com comentários ajuda, mas, idealmente, o código deve ser bem organizado e os programadores não precisam ler comentários para entender como ele funciona.

### 3.3 Operação de Refatoração
À medida que os projetos de código evoluem, é necessário atualizar toda a documentação implementada para refletir o comportamento do software. Diagramas, esquemas e desenhos não devem ser estáticos, devem abstrair as mudanças nas regras de negócios e refletir a documentação criada.

## 4 Ausência de duplicidades

### 4.1 Descrição
A eliminação de código duplicado é uma prática fundamental na programação de software e é um indicador de boas práticas de desenvolvimento. Quando um código é repetido em vários lugares, isso aumenta a complexidade do projeto e dificulta manter e atualizar o código ao longo do tempo. Além disso, qualquer correção ou melhoria feita em uma das duplicatas precisa ser refeita em todas as outras, o que é trabalhoso e propenso a erros. 

Ao invés disso, é melhor escrever uma única função ou trecho de código que possa ser reutilizado em várias partes do projeto, tornando o código mais limpo, organizado e fácil de manter. 

Em resumo, evitar código duplicado é uma prática importante para garantir a qualidade e a sustentabilidade do código ao longo do tempo. 

### 4.2 Relação com Maus Cheiros
Código duplicado é considerado um “Mau Cheiro” no mundo da programação. O termo “mau cheiro” refere-se a uma característica ou padrão no código que indica que ele pode ser melhorado ou refatorado. O código duplicado é considerado um mau cheiro, pois aumenta  a complexidade do projeto, dificulta a manutenção e torna o código mais propenso a erros. Ao identificar e remover o código ao longo do tempo.

Em geral, a identificação e correção de maus cheiros no código é uma parte importante do processo de refatoração de software.

### 4.3 Operação de Refatoração
A remoção de duplicidade é apenas uma das operações de refatoração. Mesmo na ausência de duplicidade, existem muitas outras técnicas de refatoração que podem ser aplicadas para melhorar a qualidade e a sustentabilidade do código. 

Algumas das operações de refatoração que podem ser realizadas independentemente da presença de duplicidade incluem:

1. Reestruturação de classes e métodos: consiste em reorganizar classes e métodos para torná-lo mais claros e legíveis.
2. Melhoria da legibilidade do código: consiste em utilizar convenções de codificação e nomenclatura claras para tornar o código mais fácil de ler e compreender.
3. Melhoria da modularidade: consiste em separar o código em módulos distintos para torná-los mais fácil de manter e testar.
4. Otimização  de desempenho: consiste em realizar ajustes no código para torná-lo mais rápido e eficiente.
5. Adição de documentação: essa parte consiste em adicionar comentários ao código para torná-lo mais claro e fácil de entender.
6. Extrair método: Trechos de códigos muito similares ou duplicados podem ser extraídos para uma função com os parâmetros adequados.

Estas são algumas das operações de refatoração que podem ser realizadas independentemente da presença de duplicação no código. A refatoração é uma parte importante do processo de desenvolvimento de software, pois ajuda a garantir que o código seja de alta qualidade e sustentável ao longo do tempo.

## 5 Extensibilidade

### 5.1 Descrição
Um design de código bem implementado permite que funcionalidades extras possam a ser adicionadas em locais apropriados sempre que necessário, sempre levando em consideração futuros problemas de evolução de código. Um exemplo é funções de callbacks.

### 5.2 Relação com Mau Cheiros

Normalmente quando os métodos são longos podemos relacionar com o mau cheiro, pois influencia na estrutura lógica do código dificultando a extensibilidade. Outra relação está relacionada ao mau cheiro de cadeia de mensagem, pois ao estender esse método perdemos a estrutura lógica do código e não saberemos onde estará afetando ao certo

### 5.3 Operação de Refatoração

Nos métodos de refatoração para resolvermos o mau cheiro de métodos longos a possibilidade de extrair o método de forma a diminuir o tamanho. Outra forma é o método de refatoração é substituir herança por delegação, pois a herança negada é uma forma de mau cheiro presente na extensibilidade.
