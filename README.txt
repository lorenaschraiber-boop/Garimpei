# Garimpei — site de achadinhos

## O que vem neste pacote
- `index.html`: site público responsivo.
- `styles.css`: identidade visual.
- `app.js`: pesquisa, categorias e cartões de produto.
- `products.json`: catálogo inicial vazio (não há links fictícios).
- `admin.html`: ferramenta visual para adicionar/editar/remover produtos e exportar o catálogo.
- `README.txt`: este guia.

## Como cadastrar produtos
1. Publique o site primeiro (instruções abaixo) ou abra os arquivos por um servidor local.
2. Entre em `admin.html`.
3. Preencha nome, categoria e link de afiliada real. Preço, preço anterior, foto, etiqueta e descrição são opcionais.
4. Clique em **Adicionar produto**. Para alterar ou remover, use os botões na lista.
5. Clique em **Exportar products.json**. O navegador baixa o arquivo.
6. Substitua o `products.json` antigo pelo novo no repositório do site e publique as alterações. O site público só será atualizado depois desse passo.

Fotos: o catálogo pode usar URLs públicas de imagens ou arquivos de imagem incluídos no site (por exemplo, `images/chaleira-pitia.png`). As imagens incluídas neste pacote ficam na pasta `images`. Para produtos futuros, mantenha todos os produtos já cadastrados no `products.json` e acrescente os novos registros sem apagar os antigos.

## Publicar gratuitamente com GitHub Pages
1. Crie/entre numa conta no GitHub.
2. Crie um repositório público chamado `garimpei`.
3. Envie todos os arquivos desta pasta para a raiz do repositório (`index.html`, `styles.css`, `app.js`, `products.json`, `admin.html`).
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)`, e salve.
6. Aguarde a publicação. O GitHub mostrará um endereço público semelhante a `https://SEU-USUARIO.github.io/garimpei/`.
7. Abra esse endereço para testar e coloque-o na bio do Instagram/TikTok.
8. Para atualizar: exporte `products.json` pelo gerenciador, envie/substitua o arquivo no GitHub e confirme a alteração.

## Personalizar Instagram
No arquivo `app.js`, procure `const INSTAGRAM_URL = "https://www.instagram.com/";` e substitua pelo endereço real do perfil Garimpei antes de publicar.

## Limitações importantes
- O catálogo público começa vazio porque nenhum link de afiliada real foi fornecido. Assim, não são publicados links de exemplo ou produtos fictícios.
- `admin.html` é um editor estático, não uma área protegida por senha. Sem um backend, o navegador não consegue gravar diretamente no site público. O fluxo gratuito é exportar `products.json` e enviar o arquivo atualizado para o GitHub Pages.
- O editor não é um sistema de autenticação; qualquer pessoa com o endereço pode abrir a página. Não inclua segredos.
- O site valida que os links usem `http://` ou `https://`, mas não consegue verificar se um link é realmente um link de afiliada válido. Teste os links antes de publicar.
- Preços e disponibilidade mudam; revise-os antes de divulgar.
- Os botões de oferta abrem em nova aba e incluem `rel="sponsored nofollow"` para sinalizar links comerciais.

## Testes realizados
- Conferência de sintaxe e estrutura dos arquivos gerados.
- Pesquisa filtra por nome, categoria, descrição e etiqueta.
- Chips e seletor de categoria usam a mesma categoria ativa.
- Estado vazio aparece quando o catálogo está vazio; estado “nenhum resultado” aparece quando a busca não encontra produtos.
- Cartões só são renderizados para registros com nome, categoria e URL HTTP(S) válida.
- Formulário do gerenciador valida o link obrigatório, permite adicionar/editar/remover e exportar/importar JSON.
- Teste manual em navegador real ainda deve ser feito depois de publicar, pois não há links reais de afiliada cadastrados.
