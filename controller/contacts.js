const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId; 

// get all contacts
const getAllContacts = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

// get a single contact
const getContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

// add a contact to the database
const addContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = mongodb.getDatabase().db().collection('contacts'); 
    result.insertOne(newContact).then((result) => {
        if (result.acknowledged) {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(newContact);
        }
    })
    .catch((error) => {console.log(error.message)});
}

// update a contact by id
const updateContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('contacts'); 
    result.findOneAndUpdate(
        {_id: contactId}, 
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            }
        }, 
        {
            upsert: true,
        }
    )
    .then((result) => {
        res.status(204).send();
        console.log(result);
    })
    .catch((error) => {console.log(error.message)});
}


// delete a contact
const deleteContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('contacts'); 
    result.deleteOne({_id: contactId})
    .then((result) => {
        res.status(204).json({message:"Contact Deleted" });
    })
    .catch((error) => {console.error(error)});
}


module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact }