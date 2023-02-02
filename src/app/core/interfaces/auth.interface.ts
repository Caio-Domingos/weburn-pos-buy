export const errorCodes: { [code: string]: { code: string; message: string } } =
  {
    'auth/email-already-in-use': {
      code: 'auth/email-already-in-use',
      message: 'O endereço de e-mail já está sendo usado por outra conta.',
    },
    'auth/invalid-email': {
      code: 'auth/invalid-email',
      message: 'O endereço de e-mail não é válido.',
    },
    'auth/operation-not-allowed': {
      code: 'auth/operation-not-allowed',
      message:
        'Esta operação não é permitida. Verifique as configurações do provedor de autenticação.',
    },
    'auth/weak-password': {
      code: 'auth/weak-password',
      message: 'A senha precisa ter pelo menos 6 caracteres.',
    },
    'auth/user-disabled': {
      code: 'auth/user-disabled',
      message: 'A conta do usuário está desativada.',
    },
    'auth/user-not-found': {
      code: 'auth/user-not-found',
      message:
        'Não foi encontrado nenhum usuário com o endereço de e-mail fornecido.',
    },
    'auth/wrong-password': {
      code: 'auth/wrong-password',
      message: 'A senha está incorreta.',
    },
  };
