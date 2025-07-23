# Enxame-de-particulas

Esse sistema mostra de maneira visual como funciona o algoritmo de otimização **Enxame de Partículas** (PSO - Particle Swarm Optimization). Nesse exemplo, o algoritmo tenta encontrar a melhor posição possível para uma antena, onde o sinal irá chegar em todas as casas com a menor distância total.

![PSO Animation](https://img.shields.io/badge/Status-Funcionando-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)

## 🎯 Como Funciona

### O Problema
- Você tem várias **casas** (pontos azuis) espalhadas pelo mapa
- Precisa colocar uma **antena** (losango vermelho) em algum lugar
- O objetivo é **minimizar a soma de todas as distâncias** da antena até cada casa

### O Algoritmo PSO
1. **100 partículas** (pontinhos roxos) começam em posições aleatórias
2. Cada partícula "testa" uma posição para a antena e calcula o quão boa ela é
3. As partículas se movem influenciadas por:
   - Sua **melhor posição** que já encontraram
   - A **melhor posição** que o grupo todo já encontrou
   - Um pouco de **movimento aleatório** para explorar
4. Com o tempo, todas convergem para a **melhor solução**

### Visualização
- **Pontos azuis**: Casas que precisam receber sinal
- **Pontinhos roxos**: Partículas explorando possibilidades
- **Losango vermelho**: Melhor posição encontrada (só aparece quando para)

## 🚀 Como Usar

### Executar o Projeto
```bash
# Baixar o código
git clone https://github.com/Filipi0/Enxame-de-particulas.git
cd Enxame-de-particulas

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```
Depois abra: http://localhost:3000

### Controles
- **▶️ Iniciar**: Começa a simulação
- **⏸️ Pausar**: Para a simulação
- **🔄 Resetar**: Recomeça com novas posições aleatórias

### Configurações (Clique em "Configurações")
Você pode alterar os parâmetros e ver como afeta o comportamento:

| Parâmetro | O que faz | Valores |
|-----------|-----------|---------|
| **Nº Partículas** | Quantas partículas exploram | 10 a 500 |
| **Nº Clientes** | Quantas casas existem | 5 a 100 |
| **Inércia (w)** | O quanto mantém a velocidade atual | 0 a 2 |
| **Cognitivo (c1)** | O quanto vai para sua melhor posição | 0 a 4 |
| **Social (c2)** | O quanto segue a melhor posição do grupo | 0 a 4 |

## 🧪 Experimente

- **Muitas partículas** = mais exploração, mas mais lento
- **Poucas partículas** = mais rápido, mas pode perder a solução ótima
- **Inércia alta** = partículas se movem mais longe
- **Cognitivo alto** = cada partícula confia mais em si mesma
- **Social alto** = partículas seguem mais o grupo

## �️ Tecnologias

- **Next.js**: Framework web moderno
- **TypeScript**: JavaScript com tipos
- **Tailwind CSS**: Estilização rápida
- **Framer Motion**: Animações suaves

## 📚 Entenda Melhor

### Por que PSO funciona?
- Combina **exploração** (busca em áreas novas) com **explotação** (melhora soluções conhecidas)
- O comportamento social faz as partículas **cooperarem** ao invés de competirem
- É inspirado em **bandos de pássaros** e **cardumes de peixes**

### Aplicações Reais
- Otimização de rotas de entrega
- Configuração de redes neurais
- Posicionamento de antenas e torres
- Otimização financeira
- Design de produtos

## 🎮 Desafio

Tente encontrar configurações que fazem o algoritmo:
1. **Convergir rapidamente** (poucas iterações)
2. **Encontrar soluções muito boas** (fitness baixo)
3. **Funcionar com muitas casas** (100+ clientes)

## 🤝 Contribua

Quer melhorar o projeto? Algumas ideias:
- Adicionar outros algoritmos (Genetic Algorithm, Simulated Annealing)
- Criar obstáculos no mapa
- Adicionar modo 3D
- Exportar resultados
- Comparar algoritmos lado a lado

---

**Desenvolvido para demonstrar como algoritmos de otimização funcionam na prática! 🚀**