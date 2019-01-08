/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 */
function assert(assertion, message) {
  if (!assertion) {
    console.error(message);
  }
}

export function generateId() {
    // Alphanumeric characters
    const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';

    for (let i = 0; i < 28; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
    return autoId;
}
