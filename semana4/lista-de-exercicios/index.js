/*

LISTA DE EXERCÍCIOS 

EXERCÍCIOS DE INTERPRETAÇÃO DE CÓDIGO

EXERCÍCIO 1

A função conversorDeMoeda irá converter o valor recebido em reais (R$) para dólar

No escopo da função a variável cotação irá receber o valor digitado pelo usuário no prompt que sera a cotação do Dólar, o valor é convertido de string para número (todo valor recebido através do prompt entra nó código como string).
a linha seguinte é o return da função que retornará a string "R$" seguida do valor recebido pela função multiplicado pelo valor da variável cotação (que foi digitada no prompt)

fora da função a variável meuDinheiro chama a função conversorDeMoedas com o valor que se deseja converter

o que é impresso no console: no console será impresso o valor da constante meuDinheiro

--------------------------------------------------------------------------------------------

EXERCÍCIO 2

A função investeDinheiro recebe as variaveis tipoDeInvestimento (uma string representando qual o tipo do investimento em que o dinheiro será aplicado) e valor (um número inteiro representando a quantida de dinheiro que se quer investir) em seu escopo é criada a variável valorAposInvestimento que inicialmente não recebe nenhum valor
a variavel recebida tipoDeInvestimento irá ser comparada dentro de uma condiciona switch case e de acordo com o seu valor irá atribuir a variável valorAposInvestimento 
o resultado da multiplicação entre a variável recebida valor e um número que corresponde a taxa de juros do investimendo passado na variável tipoDeInvestimento
caso a variável tipoDeInvestimento não seja uma string dos seguintes valores, Poupança, Renda Fixa, CDB ou Ações a função exibirá um alert

fora da função a variável novoMontante receberá a função investeDinheiro com a string "Ações" e o número 150, o valor da váriavel portanto será 150 multiplicado por 1.1 (taxa atribuida dentro da condicional switch case para "Ações")
e a variável segundoMontante receberá a função investeDinheiro com a string "Tesouro Direto"  o número 200, como "tesouro Direto" não está dentro da condicional como um case o navegador irá exibir um alert com a mensagem "TIPO DE INVESTIMENTO INFORMADO INCORRETO!"

depois disso temos dois console.log, o primeiro imprime o valor da variável novoMontante que é 165 e o segundo imprime o valor da variável segundoMontante porém essa variável não tem valor o que ela recebeu na verdade foi o alert que já foi exibido na tela, então será impresso undefined.

---------------------------------------------------------------------------------------------

EXERCÍCIO 3

No escopo global são declaradas três variáveis a numeros que recebe um array com vários números, array1 e array2 que recebem arrays vazios
um laço do tipo for of irá percorrer cada número do array numeros, dentro do bloco do for of a condicional if irá fazer a operação de resto da divisão entre o número atual do array por 2 e caso o resultado dessa divisão seja 0 esse número será adicionado ao array1
caso contrário a condicional vai para o else que adicionará o número no array2, o for of portanto, percorre o array numeros e adiciona os números pares no array1 e os impares no array2

os console.log após o for-of irão respectivamente imprimir, o tamanho do array número (Quantidade total de números 14), tamanho do array1 (6) e tamanho do array2 (8)

---------------------------------------------------------------------------------------------





























*/