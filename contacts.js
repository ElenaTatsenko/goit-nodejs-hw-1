const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4} = require('uuid');

 // Раскомментируй и запиши значение
const contactsPath = path.resolve("db/contacts.json");


// TODO: задокументировать каждую функцию
async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        //console.log(data)
        const contacts = JSON.parse(data)
        
                        
        return contacts
    }
    catch (error) {
        error => console.log(error.message)
    } 
}
//listContacts({contactsPath, action: "read"})

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
        currentIndex = contacts.findIndex(contact => contact.id === contactId.toString())
        
        if (currentIndex === -1) {
            return null;
        }

        const [removedContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log([removedContact])
        
        return removedContact;
       
    }
    catch (error) {
        error => console.log(error.message)
    }
  
}
//removeContact({ contactsPath, action: "read" })

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: uuidv4(), name, email, phone };
        contacts.push(newContact);
        const contactsList = await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return contactsList
    }
catch (error) {
        error => console.log(error.message)
    }
}
//addContact({ contactsPath, action: "read" })

const contactsOperations = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

module.exports = contactsOperations;