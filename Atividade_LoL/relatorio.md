# Relatório de análise do HTML/CSS do site da Riot Games

## 1. Introdução

O site da Riot Games é um site que apresenta informações sobre os jogos da empresa, como League of Legends, Valorant, Legends of Runeterra, entre outros. O site contém informações sobre os jogos, como notícias, atualizações, guias, entre outros. O site também contém informações sobre a empresa, como vagas de emprego, história da empresa, entre outros.

## 2. Identificando os Breakpoints

- 1024px - 1088px - 1996px - Desktop 
- 550px - 760px - 960px - Tablet
- 420px - Mobile

## 3. Grandes seções do site

O site da Riot Games possui 3 grandes seções, sendo elas:

- Menu Superior
- Banner Principal
- Seção de Novidades e Atualizações
- Seção de Jogos
- Seção de Esports
- Seção de Entretenimento
- Seção de Vagas
- Menu Inferior

### 3.1 Menu Superior

O menu superior do site da Riot Games é composto por 6 elementos, sendo eles:

- Botão de Menu
- Logo
- Menu
- Botão de Alteração de Idioma
- seção de Busca
- Botão de Login
- Banner de Destaque

#### Explicando o CSS (ou tentando)

O menu superior utiliza flexbox, com `flex-direction: row` e `justify-content: space-between` para alinhar os elementos horizontalmente e `align-items: center` para alinhar os elementos verticalmente. O menu superior também utiliza `position: fixed` para que ele fique fixo no topo da página, mesmo quando o usuário rolar a página.



### 3.2 Banner Principal

O banner principal do site da Riot Games é composto por 5 elementos, sendo eles:

- Banner de Destaque
- Botão de Ação
- Logo Principal
- Titulo de Descrição
- Texto de Descrição

#### Explicando o CSS (ou tentando)

O banner principal utiliza flexbox, com `flex-direction: column` e `justify-content: center` para alinhar os elementos verticalmente e `align-items: center` para alinhar os elementos horizontalmente, com um gap entre os elementos. O banner principal também utiliza `position: relative` para que o botão de ação fique posicionado sobre o banner de destaque, e ele adiciona uma margem para que o botão, a logo e a descrição fiquem posicionados corretamente.



### 3.3 Seção de Novidades e Atualizações

A seção de novidades e atualizações do site da Riot Games é composta por 3 elementos, sendo eles:

- Título
- Lista de Novidades
- Botão de Ver Mais

#### Explicando o CSS (ou tentando)

A seção de novidades e atualizações utiliza flexbox, com `flex-direction: column` e `justify-content: center` para alinhar os elementos verticalmente e `align-items: center` para alinhar os elementos horizontalmente, com um gap entre os elementos. A seção de novidades e atualizações também utiliza `position: relative` para que o botão de ver mais fique posicionado sobre a lista de novidades, e ele adiciona uma margem para que o botão fique posicionado corretamente.


### 3.4 Seção de Jogos

A seção de jogos do site da Riot Games é composta por 3 elementos, sendo eles:

- Título
- Lista de Jogos

#### Explicando o CSS (ou tentando)

A seção de jogos utiliza flexbox, com `flex-direction: column` e `justify-content: center` para alinhar os elementos verticalmente e `align-items: center` para alinhar os elementos horizontalmente, com um gap entre os elementos.

### 3.5 Seção de Esports

A seção de esports do site da Riot Games é composta por 2 elementos, sendo eles:

- Título
- Lista de Esports

#### Explicando o CSS (ou tentando)

A seção de esports utiliza flexbox, com `flex-direction: row` e `justify-content: center` para alinhar os elementos horizontalmente e `align-items: center` para alinhar os elementos verticalmente, com um gap entre os elementos.
### 3.6 Seção de Entretenimento

A seção de entretenimento do site da Riot Games é composta por 2 elementos, sendo eles:

- Título
- Lista de Entretenimento

#### Explicando o CSS (ou tentando)

A seção de entretenimento utiliza flexbox, com `flex-direction: row` e `justify-content: center` para alinhar os elementos horizontalmente e `align-items: center` para alinhar os elementos verticalmente, com um gap entre os elementos.

### 3.7 Seção de Vagas

A seção de vagas do site da Riot Games é composta por 4 elementos, sendo eles:

- Título
- Descrição
- Botão de explorar carreiras
- Imagem

#### Explicando o CSS (ou tentando)

A seção de vagas utiliza flexbox, com `flex-direction: column` e `justify-content: center` para alinhar os elementos verticalmente e `align-items: center` para alinhar os elementos horizontalmente, com um gap entre os elementos. Também utiliza um `position: absolute` para que a imagem fique posicionada sob a seção de vagas.


O footer do site da Riot Games é composto por 4 elementos, sendo eles:

- Logo
- Menu de Links
- Links de Redes Sociais
- Créditos e Cookies
- Botão de retorno ao topo

#### Explicando o CSS (ou tentando)

O footer utiliza flexbox, com `flex-direction: column` e `justify-content: center` para alinhar os elementos verticalmente e `align-items: center` para alinhar os elementos horizontalmente, com um gap entre os elementos.


## 4.Explicando cada breakpoint

### 4.1 Desktop

O site da Riot Games possui 3 breakpoints para desktop, sendo eles:

- 1024px
- 1088px
- 1996px

#### 4.1.1 1024px

Nele o menu superior é oculto, a descrição do banner principal é exibida e os elementos do banner principal são posicionados no lado esquerdo da tela. Na Seção de Novidades e Atualizações o botão de ver todos é exibido e os elementos (com exeção do elemento de destaque) são ordenados em duas colunas. Na seção de Jogos, na de Esports e de Entretenimento os elementos são ordenados em duas colunas. Na seção de Vagas a imagem é posicionada no lado direito da tela (sob a seção de vagas).

#### 4.1.2 1088px

Nele a opção de Trabalhe conosco no menu superior é ocultada.

#### 4.1.3 1996px

Nele a opção de Noticias no menu superior é ocultada.

### 4.2 Tablet

O site da Riot Games possui 3 breakpoints para tablet, sendo eles:

- 550px
- 760px
- 960px

#### 4.2.1 550px

Nele o Botão de ação no banner principal e os titulos dos elementos da seção de Notícias alteram seu tamanho. Os elementos do menu inferior são ordenados em uma coluna.

#### 4.2.2 760px

Nele a imagem do banner principal é ampliada.

#### 4.2.3 960px

Nele a imagem do banner principal aparece por completo, o botão de ação, a logo e o titulo no banner principal são centralizados.


### 4.3 Mobile

O site da Riot Games possui 1 breakpoint para mobile, sendo ele:

- 420px

#### 4.3.1 420px

Nele o espaçamento entre os elementos do menu superior almenta um pouco.