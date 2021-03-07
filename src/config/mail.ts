interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'gmail';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal' || 'gmail',

  defaults: {
    from: {
      email: 'seu@email.com',
      name: 'Seu Nome',
    },
  },
} as IMailConfig;
