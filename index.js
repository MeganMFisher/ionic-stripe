var express = require('express');
var bodyParser = require('body-parser');

const config =  require('./config');

const stripe = require('stripe')(config.STRIPE_KEYS.secretKey);

const app =  module.exports = express();

app.use(bodyParser.json());
// app.use(express.static(__dirname + './../public'))

// payment
app.post('/api/payment', function(req, res, next){
  console.log(req.body);

  // convert amount to pennies
  const chargeAmt = req.body.amount.price;
   const amountArray = chargeAmt.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if(amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
    	break;
    } else {
    	pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));
  console.log("Pennies: ");
  console.log(convertedAmt);


  const charge = stripe.charges.create({
  amount: convertedAmt, // amount in cents, again
  currency: 'usd',
  source: req.body.payment.token,
  description: 'Test charge from blank ionic app'
}, function(err, charge) {
     res.sendStatus(200);
  // if (err && err.type === 'StripeCardError') {
  //   // The card has been declined
  // }
});
});



app.listen(config.PORT, () => {
  console.log('Listening to port: ', config.PORT);
})
