const logic = require("../../logic");
module.exports = (req, res) => {
  const {} = req;
  try {
    logic
      .getMatchesWithData()
      .then(response => {
        
        res.json(response);
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
