import React from 'react';

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


    const handleSendMessage = () => {
        const url: string = import.meta.env.VITE_DEV_ENV === 'true' ? 'http://localhost:3000/send' : 'https://contact-receiver.vercel.app/send';
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).then(response => {
            console.log(response)
        })
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
            </div>
        </div>
    );
};

export default ContactPage;