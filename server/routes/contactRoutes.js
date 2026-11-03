const router = require("express").Router();
const c = require("../controllers/contactController");

router.route("/").get(c.getContacts).post(c.createContact);
router.route("/:id").get(c.getContact).put(c.updateContact).delete(c.deleteContact);

module.exports = router;
