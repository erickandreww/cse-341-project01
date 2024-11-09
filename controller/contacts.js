const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId; 

const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

const getContact = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

const addContact = async (req, res, next) => {
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

const updateContact = async (req, res, next) => {
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
    .then((result) => {console.log(result)})
    .catch((error) => {console.log(error.message)});
}

const deleteContact = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('contacts'); 
    result.deleteOne({_id: contactId})
    .then((result) => {
        res.json(`Contact Deleted`);
    })
    .catch((error) => {console.error(error)});
}


module.exports = { getAllContacts, getContact, addContact, updateContact, deleteContact }