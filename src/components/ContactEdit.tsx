import React, { useState, useContext } from 'react';

import api from '../services/api';
import ContactContext from '../contexts/ContactContext';

interface contact {
    id: number;
    name: string;
    phone: string;
}

async function handleContactsChanges(idContact: number, name: string, phone: string) {
    const id: number = idContact;
    const dataRequest: object = {
        name: name,
        phone: phone
    };

    await api.post(`/contact/update/${id}`, dataRequest);
}

export default function (props: contact): React.ReactElement {
    const [name, setName]: React.ComponentState = useState<string>(props.name);
    const [phone, setPhone]: React.ComponentState = useState<string>(props.phone);

    const { states: { contacts, setContacts } } = useContext(ContactContext);


    const handleSubmit = async () => {
      await handleContactsChanges(props.id, name, phone);
      
      const data: object = {
        id: props.id,
        name: props.name,
        phone: props.phone
      };

      const newContacts = contacts.filter((contact: any) => contact.id !== props.id);
      
      newContacts.push(data);
      
      setContacts(newContacts);
    };

    return (
        <div className="contact-info">
            <header>
                <h3>Editar contato</h3>
            </header>
            <section>
                <label htmlFor="input-name">Nome:</label>
                <input type="text" value={name} id="input-name" onChange={({ currentTarget }) => setName(currentTarget.value)} className="input-name" />

                <label htmlFor="input-phone">Telefone:</label>
                <input type="name" id="input-phone" value={phone} onChange={({ currentTarget }) => setPhone(currentTarget.value)} className="input-phone" />

                <button onClick={handleSubmit} className="submit">Salvar</button>
            </section>
        </div>
    );
}