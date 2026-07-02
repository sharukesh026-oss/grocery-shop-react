function WhatsAppButton() {
  const phoneNumber = "917538824959";
  const message = encodeURIComponent("Hello Green Basket, I want to order groceries.");

  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}

export default WhatsAppButton;
