Precisamos criar um sistema web para controle de feedbacks, hoje temos a necessidade de guardar informações sobre o 1:1 que os Lideres fazem com o seu Time.  Requisitos do sistema:

[ ] Precisamos de um login para acesso ao sistema onde cada líder poderá acessar com suas credenciais. (Primeiro momento não será necessário o cadastro do Líder, podemos fazer isso manualmente nesse primeiro momento).
[ ] Precisamos de um cadastro(CRUD) de colaborador onde precisa ser informado, Nome, Cargo e Data de contratação.
[ ] Precisamos de um formulário(CRUD) para informações sobre o feedback, onde serão necessários os seguintes campos: Colaborador, Título do feedback, Pauta, Pontos positivos do líder, Pontos negativos do Líder, Pontos positivos do Colaborador, Pontos negativos do Colaborador, Data que foi feito o feedback, Data de cadastro do feedback(FIXO), Deve conter um cadastro de nível genérico onde posso informar o título e o nível que o colaborador si vê e o nível que o líder dá a ele e por fim um campo de Observação.
[ ] Deve ser possível alterar um feedback
[ ] Deve ser possível visualizar todos os feedbacks em forma de listagem com botões de ação para que seja possível editar/visualizar cada um deles
[ ] Deve conter na listagem de feedbacks o título, nome do colaborador e data de criação.
[ ] Deve conter um filtro por colaborador na listagem.

feedback{
colaborador{
id,
name
}
title = string
pauta = string
Pontos positivos do líder = string
Pontos negativos do líder = string
Pontos positivos do Colaborador = string
Pontos negativos do Colaborador =string
Data que foi feito o feedback = number
Data de cadastro do feedback(FIXO) = number

cadastro de nível genérico [{
title
nivel que o colaborador si vê
nivel lider dá a ele
observação
}]
}
