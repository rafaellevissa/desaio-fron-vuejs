import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import api from '../../services/api';
import ContactCreate from '../../components/ContactCreate';
import ContactDetail from '../../components/ContactDetail';
import ContactEdit from '../../components/ContactEdit';
import ContactContext from '../../contexts/ContactContext';

import './styles.css';

interface contactType {
    id: number;
    name: string;
    phone: string;
}

export default function (): React.ReactElement {
    const [contacts, setContacts]: React.ComponentState = useState<contactType[]>([]);
    const [id, setId]: React.ComponentState = useState<number>(0);
    const [name, setName]: React.ComponentState = useState<string>('');
    const [phone, setPhone]: React.ComponentState = useState<string>('');
    const [selected, setSelected]: React.ComponentState = useState<contactType>(contacts[0]);
    const [editingMode, setEditingMode]: React.ComponentState = useState<boolean>(false);
    const [creatingMode, setCreatingMode]: React.ComponentState = useState<boolean>(false);

    const states = {
      contacts,
      setContacts,
      setEditingMode,
      setCreatingMode
    };

    useEffect(() => {
        (async () => {
            const response: AxiosResponse = await api.get('/contacts');

            const firstContact = response.data?.contacts[0];

            setContacts(response.data?.contacts);
            setSelected(firstContact);

            setId(firstContact.id);
            setName(firstContact.name);
            setPhone(firstContact.phone);
        })();
    }, []);

    return (
        <div className="app">
            <div className="left">
                <h2>Contatos</h2>
                <div className="contacts-container">
                    {contacts.map((contact: contactType, index: number) => {
                        const contactStyle: React.CSSProperties = {
                            backgroundColor: contact == selected ? '#46733E' : ''
                        };

                        return (
                            <div className="contact" style={contactStyle} onClick={() => {
                                setId(contact.id);
                                setName(contact.name);
                                setPhone(contact.phone);
                                setSelected(contacts[index]);
                                setEditingMode(false);
                                setCreatingMode(false);
                            }}>
                                <span className="name">{contact.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="right">
              <ContactContext.Provider value={{ states }}>
                {
                  editingMode 
                    ? <ContactEdit id={id} name={name} phone={phone} />
                    : creatingMode 
                    ? <ContactCreate id={id} /> 
                    : <ContactDetail id={id} name={name} phone={phone} />
                }
              </ContactContext.Provider>
            </div>
        </div>
    );
};