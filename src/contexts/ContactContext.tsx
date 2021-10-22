import { createContext } from 'react';

interface IContactContext {
  states?: any;
}

const ContactContext = createContext<IContactContext>({});

export default ContactContext;