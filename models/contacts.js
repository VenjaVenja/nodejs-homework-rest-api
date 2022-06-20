const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "contacts.json");

const refetchContacts = async (contacts) =>{
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId.toString());
    if(!contact){
        return null;
    }
    return contact;
}
const addContact = async (body) => {
  const contacts = await listContacts();
  const {name, email, phone} = body;
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone
  };
  contacts.push(newContact);
  refetchContacts(contacts);
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId.toString());
    if(idx === -1){
        return null;
    }
    const [removedContact] = contacts.splice(idx, 1);
    refetchContacts(contacts);
    return removedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = contactId;
  const {name, email, phone} = body;
  const idx = contacts.findIndex((item)=> item.id === id.toString());
  if(idx === -1){
    return null;
  }
  contacts[idx] = {id, name, email, phone};
  refetchContacts(contacts);
  return contacts[idx]

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
