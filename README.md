# Cadastro de carros

**Requisitios funcionais**

- Dever ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**Regra de negócio**

- Não deve ser possível ter carros com placas iguais.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- Por padrão o carro deve ser cadastrado como disponível.
- Somente administradores podem cadastrar carros.

# Listagem de carros

**Requisitios funcionais**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**

- Usuário não precisa estar autenticado para ver a listagem.

# Cadastro de especificações no carro

**Requisitios funcionais**

- Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio**

- Não deve ser possível criar especificação para um carro inexistente.
- Não deve ser possível cadastrar especificação repetidas entre os carros.
- Somente administradores podem cadastrar especificações.

# Cadastro de imagens do carro

**Requisitios funcionais**

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requisitios não funcionais**

- Utilizar o multer para upload dos arquivos.

**Regra de negócio**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Somente administradores podem cadastrar imagens para os carros.

# Locação de carro

**Requisitios funcionais**

- Deve ser possível solicitar um aluguel.

**Requisitios não funcionais**

**Regra de negócio**

- A locação deve ter duração mínima de 24 horas.
- Não deve ser possível ter mais de uma locação em aberto para o mesmo usuário.
- Não deve ser possível ter mais de uma locação em aberto para o mesmo carro.
