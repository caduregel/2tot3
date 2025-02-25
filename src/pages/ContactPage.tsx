import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useReCAPTCHA from '../hooks/useReCAPTCHA';

export interface IContactMessage {
    name: string;
    email: string;
    messageContent: string;
}

const ContactPage: React.FC = () => {
    const [message, setMessage] = React.useState<IContactMessage>({
        name: '',
        email: '',
        messageContent: ''
    });

    const { capchaToken, recaptchaRef, handleRecaptcha } = useReCAPTCHA();

    const [status, setStatus] = React.useState<string | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newMessage = { ...message };
        newMessage.name = e.target.value;
        setMessage(newMessage);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newMessage = { ...message };
        newMessage.email = e.target.value;
        setMessage(newMessage);
    }

    const handleMessageContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newMessage = { ...message };
        newMessage.messageContent = e.target.value;
        setMessage(newMessage);
    }

    const handleSendMessage = async () => {
        if (!message.name || !message.email || !message.messageContent) {
            return setStatus("Vul alle velden in om het bericht te verzenden.");
        }
        setStatus("Verzenden...");

        if (!capchaToken) {
            return setStatus("Verifieer eerst dat u geen robot bent.");
        }

        const url: string = import.meta.env.VITE_DEV_ENV === 'true' ? 'http://localhost:3000/send' : 'https://contact-receiver.vercel.app/send';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    data: message,
                    token: capchaToken
                })
        }).then(response => {
            if (response.ok) {
                setStatus("Bericht succesvol verzonden!");
                setMessage({ name: '', email: '', messageContent: '' });
            } else {
                console.log(response)
                setStatus("Er is een fout opgetreden bij het verzenden van het bericht.");
            }
        }).catch(() => {
            setStatus("Er is een fout opgetreden bij het verzenden van het bericht.");
        });
    }

    return (
        <div className="mt-5 ml-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Contact ons!</h1>
            <p className="mb-4 text-center">
                Vul het onderstaande formulier in om contact met ons op te nemen. We zullen zo snel mogelijk reageren.
            </p>
            <div className="w-full max-w-md">
                <label className="block mb-2 text-sm font-medium text-gray-700">Naam</label>
                <input
                    className="bg-gray-200 p-2 rounded-sm w-full mb-4"
                    placeholder="Naam"
                    type="text"
                    value={message.name}
                    onChange={handleNameChange} />
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                    className="bg-gray-200 p-2 rounded-sm w-full mb-4"
                    placeholder="Email"
                    type="email"
                    value={message.email}
                    onChange={handleEmailChange} />
                <label className="block mb-2 text-sm font-medium text-gray-700">Bericht</label>
                <textarea
                    className="bg-gray-200 p-2 rounded-sm w-full mb-4"
                    placeholder="Bericht inhoud..."
                    value={message.messageContent}
                    onChange={handleMessageContentChange} />
                <button
                    className="bg-blue-500 text-white p-2 rounded-sm w-full hover:bg-blue-600 hover:cursor-pointer"
                    onClick={handleSendMessage}>
                    Verstuur
                </button>
                {status && <p className="mt-4 text-center">{status}</p>}
                <div className='flex justify-center mt-5 mb-5'>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                        onChange={handleRecaptcha}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;