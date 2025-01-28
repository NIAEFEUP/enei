import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.convertEmptyStringsToNull = true

const fields = {
  email: 'E-mail',
  password: 'Palavra-passe',
  password_confirmation: 'Confirmar palavra-passe',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    confirmed: 'Os campos "{{ field }}" e "{{ field }}" não coincidem',
    minLength: 'O campo "{{ field }}" deve ter no mínimo {{ min }} caracteres',
    email: 'O campo "{{ field }}" deve ser preenchido com um e-mail válido',
    'database.unique': 'O campo "{{ field }}" já está em uso',
  },
  fields
)
