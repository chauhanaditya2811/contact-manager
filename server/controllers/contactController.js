const Contact = require("../models/Contact");

const fields = ["name", "email", "phone", "company", "notes"];
const pick = (body) => Object.fromEntries(fields.filter((f) => f in body).map((f) => [f, body[f]]));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/contacts?q=search
exports.getContacts = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    const filter = q
      ? { $or: ["name", "email", "phone", "company"].map((f) => ({ [f]: new RegExp(escapeRegex(q), "i") })) }
      : {};
    res.json(await Contact.find(filter).sort({ name: 1 }));
  } catch (err) { next(err); }
};

// GET /api/contacts/:id
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) { next(err); }
};

// POST /api/contacts
exports.createContact = async (req, res, next) => {
  try {
    res.status(201).json(await Contact.create(pick(req.body)));
  } catch (err) { next(err); }
};

// PUT /api/contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) { next(err); }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted", id: contact._id });
  } catch (err) { next(err); }
};
