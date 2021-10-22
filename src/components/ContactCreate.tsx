import React, { useState, useContext } from 'react';

import api from '../services/api';
import ContactContext from '../contexts/ContactContext';

interface contact {
    id: number;
}

async function handleCreateContact(name: string, phone: string) {
    const dataRequest: object = {
        name: name,
        phone: phone
    }

    try {
        await api.post('/contact/insert', dataRequest);   
    } catch (error) {
        if(error.response.status === 401) {
            alert('Telefone já cadastrado');
        }
    }

}

export default function (props: contact): React.ReactElement {
    const [name, setName]: React.ComponentState = useState<string>('');
    const [phone, setPhone]: React.ComponentState = useState<string>('');

    const { states: { contacts, setContacts } } = useContext(ContactContext);

    const handleSubmit = async () => {
        await handleCreateContact(name, phone);

        const data: object = {
            id: props.id,
            name: name,
            phone: phone
        };

        const newContacts = contacts.filter((contact: any) => contact.id !== props.id);

        newContacts.push(data);

        setContacts(newContacts);
    }

    return (
        <div className="contact-info">
            <header>
                <h3>Criar contato</h3>
            </header>
            <section>
            <label htmlFor="input-name">Nome:</label>
            <input type="text" id="input-name" onChange={({ currentTarget }) => setName(currentTarget.value)} className="input-name" />

            <label htmlFor="input-phone">Telefone:</label>
            <input type="name" id="input-phone" onChange={({ currentTarget }) => setPhone(currentTarget.value)} className="input-phone" />

            <button onClick={() => handleSubmit()} className="submit">Salvar</button>
            </section>
        </div>
    );
}