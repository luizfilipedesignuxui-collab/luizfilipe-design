

# Plano: Criar conta de administrador

## Passos

1. **Criar edge function temporária** `create-admin` que:
   - Usa o Supabase Admin API (service role key) para criar o usuário com email `luizfilipe.designuxui@gmail.com` e senha `Abacaxi20`
   - Insere o registro na tabela `user_roles` com role `admin`
   - Confirma o email automaticamente

2. **Executar a função** via curl para criar a conta

3. **Deletar a edge function** após uso (não deve ficar exposta)

## Resultado
- Conta admin criada e pronta para login em `/admin/login`

