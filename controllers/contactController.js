const errorHandeler = require("../middleware/errorHandeler");
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels");



const getContacts = asyncHandler(async (request, response) => {
    const contacts = await Contact.find({user_id: request.user.id});
    response.status(200).json(contacts)
});



const getContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error("Contact  Not found");
    }
    response.status(200).json(contact)
});



const createContacts = asyncHandler(async (request, response) => {
    console.log("The request body is ", request.body)
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        response.status(400);
        throw new Error("All fields are Mandetory !")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: request.user.id
    });
    response.status(201).json(contact)
});



const updateContacts = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error("Contact  Not found");
    }
    if(contact.user_id.toString() !== request.user.id){
        response.status(403);
        throw new Error("User don't have permission to update other user contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    );
    response.status(200).json(updatedContact)
});



const deleteContacts = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id); 
    if(!contact){
        response.status(404);
        throw new Error('Contact Not Found')
    }
    if(contact.user_id.toString() !== request.user.id){
        response.status(403);
        throw new Error("User don't have permission to delete other user contact")
    }      
    await Contact.findOne({_id: request.params.id})
    response.status(200).json(contact)
});

module.exports = {
    getContacts,
    getContact,
    createContacts,
    updateContacts,
    deleteContacts
};