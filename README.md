# 8 Puzzle

### Instalação de Dependências
```
npm install
```

### Testes
```
npm test
```

## Algoritmos de busca informada

Algoritmos de pesquisa informada '*Best-first Search*' contém uma variedade de elementos por exemplo com a que distância estamos do objeto, o custo que irá levar o caminho, como chegar, como chegar ao nó do objeto entre outros elementos, o Algoritmo de pesquisa informada é muito útil para uma grande pesquisa pois utiliza a ideia de heurística.

O que seria Função heurística: é uma função utilizada pelo '*Best-first Search*' e encontra o caminho mais rápida, ele toma o estado atual do agente como entrada e produz a estimativa está próximo o agente está do objeto, às vezes o método heurístico nem sempre pode dar a melhor solução, mas garantiu encontrar uma boa solução em tempo razoável.

 ### Greedy Search
 ---

O algoritmo de *Greedy Search* ele irá dar a primeira escolha sempre seleciona o caminho que aparece melhor naquele exato momento, ele é a combinação dos algoritmos de pesquisa em profundidade. O algoritmo *Greedy Search* utiliza a função heurística e pesquisa, a busca pela primeira vez nos permite aproveitar as vantagens de ambos algoritmos, com a ajuda da primeira pesquisa, em cada etapa, podemos escolher um nó mais profundo, com o melhor algoritmo de primeira pesquisa, expandimos o nó mais próximo ao nó da meta e o custo mais próximo será estimado pela função heurística.

Melhor algoritmo de primeira pesquisa:

 1. Etapa: Coloque o nó inicial na lista OPEN.
 2. Etapa: Se a lista OPEN estiver vazia, irá parar e retornará a falha.
 3. Etapa: Remova o nó n da lista OPEN que possui o valor mais baixo de h (n) e coloque-o na lista FECHADO.
 4. Etapa: expanda o nó n e gere os sucessores do nó n.
 5. Etapa: verifique cada sucessor do nó n e descubra se algum nó é um nó de objetivo ou não. Se algum nó sucessor for o objetivo, retorne o sucesso e encerre a pesquisa; caso contrário, continue na Etapa 6.
 6. Etapa: para cada nó sucessor, o algoritmo verifica a função de avaliação f (n) e, em seguida, verifique se o nó está na lista OPEN ou CLOSED. Se o nó não estiver na lista de ambos, adicione-o à lista OPEN.
 7. Etapa: Volte para a Etapa 2.

**Vantagens**

 - A primeira pesquisa pode alternar, nisso irá obtendo as vantagens de
   ambos os algoritmos. 
 - O Algoritmo é mais eficiente que os algoritmos.

### A* Search
---

O Algoritmo A* (*A Star*) é um algoritmo para busca de caminho, ele realiza a busca o caminho em um grafo com um vértice inicial até o vértice final, ou seja o Algoritmo recebe:

-   O grafo em si
-   O nó inicial
-   O nó final
-   Uma função heurística
    
Iniciando explicar o caminho que o Algoritmo A* ele irá iniciar pelo nó inicial, ele irá pegar todos os vizinhos do nó atual e irá aplicar a função de heurística, essa função deverá retornar um número que irá indicar qual é o caminho percorrido “distância” pro o nó final, quando o vizinho que tiver o menor valor é o mais perto do nó final, então esse vizinho irá se torna o nó atual, esse caminho será repetido até que seja o nó final.

O Custo entre as arestas ligadas nos vértices do grafo é feita pela função de heurística, ou seja, essa função é muito importante, pois ela irá direcionar a busca pelo caminho correto.

O Algoritmo A* podemos dizer que é um algoritmo de busca de caminho e de gráfico. Um grafo poderá ser representado por diversas maneiras, as mais comuns poderá ser utilizada por *hashmaps* alinhados com uma matriz, o Algoritmo A * em si é utilizado com sets e *hashmaps*

### Graph Search
---

Muito conhecida como busca em grafo ou diagrama, a função irá permitir que encontre o que está procurando, por exemplo o facebook utiliza muito isso por exemplo o facebook permite achar o'que está procurando através seus amigos, dentro do próprio facebook, a busca mostrar como todo o que foi curtido, compartilhado pelos usuários, sendo musica, jogos, vídeos, fotos e interesses entre os amigos em comuns e outras informações em si.

Explicando melhor sobre *Graph Search* é um mecanismo de pesquisa integrado, esse mecanismo de pesquisa processa consulta para retornar informações podendo ser em redes sociais, sistemas entre outros, continuando a explicação as aplicações pode incluir pesquisa por gráfico incluem pesquisas de empregos, recrutamento, marketing, lojas, bancos, site de namoro entre outros. Uma pesquisa de gráfico “*Graph Search*” conta com uma enorme quantidade de dados por exemplo o facebook utiliza onde ele vinculada com indivíduos e organizações, dentro de um gráfico social, indivíduos e organização são nós, no facebook em si todos os indivíduos e organizações estão conectados através de amizades, curtas, compartilhamento e outra possibilidades.
