import React, { useContext } from 'react';
import ContactContext from './../contexts/ContactContext';
import api from '../services/api';

interface contact {
    id: number;
    name: string;
    phone: string;
}

export default function (props: contact): React.ReactElement {
    const { states: { 
      setEditingMode,
      contacts,
      setContacts,
      setCreatingMode
    } } = useContext(ContactContext);

    const handleDelete: React.EventHandler<any> = async () => {
      await api.get(`/contact/delete/${props.id}`);

      const newContacts = contacts.filter((contact: any) => contact.id != props.id);

      setContacts(newContacts);
    }

    return (
        <div className="contact-info">
            <header>
                <h3>{props.name}</h3>
            </header>
            <section>
                <p className='phone'>Telefone: {props.phone}</p>
                <a className='edit' href="#" onClick={() => setEditingMode(true)}>Editar</a>
                <a className='delete' href="#" onClick={handleDelete}>Excluir</a>
            </section>
            <button onClick={() => setCreatingMode(true)} className='create-contact'><i className="fas fa-plus"></i></button>
        </div>
    );
}