const stripe = require('@stripe/stripe-react-native')

const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  
  const card = await stripe.cards.create({
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2023,
    cvc: 123,
  });
  
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    payment_intent: paymentIntent.id,
    source: card.id,
  });