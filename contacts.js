const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4} = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');


async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        
                        
        return contacts
    }
    catch (error) {
        error => console.log(error.message)
    } 
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        currentContact = contacts.find(contact => contact.id === contactId.toString());
        
        return currentContact
    }
    catch (error) {
        error => console.log(error.message)
    }
}


async function removeContact(contactId) { 
    try {
        const contacts = await listContacts();
        currentContact = contacts.find(contact => contact.id === contactId);
        
        if (currentContact) {
            const newContactList = contacts.filter(contact => contact.id !== contactId);
            await fs.writeFile(contactsPath, JSON.stringify(newContactList));
   
        
            return currentContact;
        }
    }
    catch (error) {
        error => console.log(error.message)
    }
  
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: uuidv4(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return newContact
    }
catch (error) {
        error => console.log(error.message)
    }
}
const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
module.exports = contactsOperations