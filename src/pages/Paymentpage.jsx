import React, { useState } from 'react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    swiftCode: '',
  });

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      console.log('Card Details:', cardDetails);
    } else {
      console.log('Bank Details:', bankDetails);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Select Payment Method:</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange} className="p-2 border">
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        {paymentMethod === 'card' ? (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailChange}
                className="p-2 border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Expiry Date:</label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailChange}
                className="p-2 border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">CVV:</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailChange}
                className="p-2 border w-full"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Bank Name:</label>
              <input
                type="text"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleBankDetailChange}
                className="p-2 border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailChange}
                className="p-2 border w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">SWIFT Code:</label>
              <input
                type="text"
                name="swiftCode"
                value={bankDetails.swiftCode}
                onChange={handleBankDetailChange}
                className="p-2 border w-full"
              />
            </div>
          </div>
        )}
        <button type="submit" className="bg-primary text-white p-2 mt-4">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
