import React, { useState, useRef } from 'react';

const OTPInput = ({ length, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, '');
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1) {
                inputRefs.current[index + 1].focus();
            }

            if (newOtp.every(digit => digit !== "")) {
                onComplete(newOtp.join(''));
            }
        }
    };

    const handleBackspace = (element, index) => {
        if (element.value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => e.key === 'Backspace' && handleBackspace(e.target, index)}
                    ref={el => (inputRefs.current[index] = el)}
                    style={{
                        width: '40px',
                        height: '40px',
                        textAlign: 'center',
                        fontSize: '20px',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}
                />
            ))}
        </div>
    );
};

export default OTPInput;
