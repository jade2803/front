const stripe = Stripe("pk_test_51OYyaeHFGCnONXmCpkLKX5gQFcSaIub80eOS8Q2GWwxpVyrTf9HyVdOsoNDo8SS3kFi6ceARnVz4THFlZRpzKoOW00xw5088Ww");

initialize();

async function initialize() {
  // Obtener el clientSecret de tu backend
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        vehicleId: "12345", // ID del vehículo (ejemplo)
        total: 200, // Total del pago en USD
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { sessionId } = await response.json();
    return sessionId;
  };

  const checkout = await stripe.redirectToCheckout({
    sessionId: await fetchClientSecret(),
  });

  // Montar el formulario de pago de Stripe
  checkout.mount('#checkout');
}
