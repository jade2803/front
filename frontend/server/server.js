const stripe = require('stripe')('sk_test_51OYyaeHFGCnONXmCACsktTy0lcuRenPcl9ihSFxssjBIJDyDq4FZXZwaKlP7fHZiSGoNf8qvyNm5j9f0mL7T5uLL002EBOAaMs'); // Tu clave secreta de Stripe
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:4200', // Permitir el frontend de Angular
}));
app.use(bodyParser.json());

const YOUR_DOMAIN = 'http://localhost:4200';  // El dominio del frontend

// Endpoint para crear la sesión de Stripe Checkout
// server.js

app.post('/create-checkout-session', async (req, res) => {
  const { vehicleId, total } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Vehicle Reservation ID: ${vehicleId}`,
            },
            unit_amount: total * 100, // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/payment-cancel`,
    });

    // Aquí devolvemos el sessionId, que es lo que necesitas en el frontend
    res.json({ sessionId: session.id });  // Cambié aquí para que envíe el sessionId
  } catch (error) {
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});


// Endpoint para verificar el estado de la sesión
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (session.payment_status === 'paid') {
      res.send({
        status: 'complete',
        customer_email: session.customer_details.email,
        metadata: session.metadata,
        amount_total: session.amount_total,
      });
    } else {
      res.send({ status: 'incomplete' });
    }
  } catch (error) {
    res.status(500).send(`Error retrieving session status: ${error.message}`);
  }
});

app.listen(4242, () => console.log('Stripe server running on port 4242'));
