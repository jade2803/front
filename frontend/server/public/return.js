initialize();

async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');

  // Llamar al backend para verificar el estado del pago
  const response = await fetch(`/session-status?session_id=${sessionId}`);
  const session = await response.json();

  if (session.status === 'complete') {
    // El pago fue exitoso, ahora guarda la reservación en la base de datos
    await saveReservation(session);
    document.getElementById('success').classList.remove('hidden');
    document.getElementById('customer-email').textContent = session.customer_email;
  } else {
    // El pago no fue completado
    console.error('El pago no fue completado');
  }
}

async function saveReservation(session) {
  const reservationData = {
    sessionId: session.session_id,
    customerEmail: session.customer_email,
    vehicleId: session.metadata.vehicle_id,
    total: session.amount_total / 100, // Convertir de centavos a dólares
  };

  // Llamar a tu backend para guardar la reservación
  await fetch('http://localhost:3000/reservations/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });
}
