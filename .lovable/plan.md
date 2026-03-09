

## Diagnóstico do erro de login

Os logs mostram que seu login funcionou com sucesso em 20:23:17 e 20:24:03, mas depois passou a dar "Invalid login credentials". Isso indica que a senha pode ter sido digitada com erro (espaço extra, caps lock, etc.). A conta existe e está confirmada. Vou resetar a senha para garantir que funcione, e implementar as funcionalidades pedidas.

## Plano de implementação

### 1. Resetar a senha da conta admin
- Executar um reset de senha via SQL para garantir que a senha `Abacaxi20` funcione corretamente.

### 2. Adicionar login por telefone
- Adicionar uma aba no formulário de login para alternar entre "Email" e "Telefone"
- Login por telefone usa OTP (código enviado por SMS) via `supabase.auth.signInWithOtp({ phone })`
- Após envio do código, mostrar campo para digitar o OTP e verificar com `supabase.auth.verifyOtp()`
- **Nota importante**: O envio de SMS requer configuração de um provedor (Twilio). Vou implementar a UI e o fluxo, mas será necessário configurar o provedor de SMS para funcionar em produção.

### 3. Adicionar "Esqueci minha senha"
- Adicionar link "Esqueci minha senha" abaixo do formulário
- Criar página `/admin/forgot-password` com campo de email que chama `supabase.auth.resetPasswordForEmail()`
- Criar página `/reset-password` para o usuário definir a nova senha após clicar no link do email
- Registrar a rota `/reset-password` no `App.tsx`

### Arquivos a criar/editar
- **`src/pages/AdminLogin.tsx`** - Redesenhar com abas Email/Telefone + link "Esqueci minha senha"
- **`src/pages/ForgotPassword.tsx`** - Nova página para solicitar reset de senha
- **`src/pages/ResetPassword.tsx`** - Nova página para definir nova senha
- **`src/contexts/AuthContext.tsx`** - Adicionar métodos `signInWithPhone`, `verifyOtp`, `resetPassword`
- **`src/App.tsx`** - Adicionar rotas `/admin/forgot-password` e `/reset-password`

