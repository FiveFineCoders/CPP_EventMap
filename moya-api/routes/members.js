const express = require("express");
const router = express.Router();
const memberData = [{
    "name": "Brandon Moya",
    "education": "Cal Poly Pomona",
    "description": "This member is me! Hello!"
   },
   {
    "name": "Brandon Tiet",
    "education": "Cal Poly Pomona",
    "description": "This member is a cool person!"
   },
   {
    "name": "Vu Nguyen",
    "education": "Cal Poly Pomona",
    "description": "This member is also a cool person!"
   },
   {
    "name": "John Salinas",
    "education": "Cal Poly Pomona",
    "description": "Again, this member is also cool!"
   },
   {
    "name": "Aamir Sajjad",
    "education": "Cal Poly Pomona",
    "description": "Last but not least, this member is also cool!"
   }
];
router.get("/", (req,res) => {
    res.json(memberData);
});
module.exports = router;