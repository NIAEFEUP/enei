import vine, { SimpleMessagesProvider } from "@vinejs/vine"

vine.convertEmptyStringsToNull = true

const fields = {
    "password": "Palavra-passe",
    "password_confirmation": "Confirmar palavra-passe",
}

vine.messagesProvider = new SimpleMessagesProvider({
    confirmed: 'Os campos "{{ field }}" e "{{ field }}" não coincidem',
    minLength: 'O campo "{{ field }}" deve ter no mínimo {{ min }} caractéres',
}, fields)
