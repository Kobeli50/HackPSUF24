import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';  // Import Axios and AxiosError

const AIchat: React.FC = () => {
    const [input, setInput] = useState<string>('');    // State for storing user input
    const [response, setResponse] = useState<string>(''); // State for storing AI response
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [errorMessage, setErrorMessage] = useState<string>('');  // State for storing errors

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');  // Reset error message on new request

        try {
            const openAIKey = process.env.REACT_APP_OPENAI_API_KEY; // make file called .env and add API_KEY when used

            // Check if the API key exists before making the request
            if (!openAIKey) {
                setErrorMessage('API key is missing. Please check your .env file.');
                return;
            }

            // Log the API key for debugging (remove this in production)
            console.log('Using OpenAI API Key:', openAIKey);

            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',  // Correct endpoint for chat-based completions
                {
                    model: 'gpt-3.5-turbo',  // Use 'gpt-4' if you have access
                    messages: [{ role: 'user', content: input }],  // Chat-based structure
                    max_tokens: 100,
                },
                {
                    headers: {
                        Authorization: `Bearer ${openAIKey}`,  // Pass the API key
                        'Content-Type': 'application/json',
                    },
                }
            );

            setResponse(result.data.choices[0].message.content);  // Set the response from the API
        } catch (error: AxiosError | any) {
            console.error('Error fetching AI response:', error.response?.data || error.message);
            
            // Handle specific error types
            if (error.response?.status === 401) {
                setErrorMessage('Unauthorized: Invalid API key.');
            } else if (error.response?.status === 429) {
                setErrorMessage('Rate limit exceeded. Please wait before making more requests.');
            } else {
                setErrorMessage('Error occurred while fetching AI response.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chat with AI</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display error messages */}
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
                    {loading ? 'Generating...' : 'Submit'}
                </button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <h3>AI Response:</h3>
                <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
            </div>
        </div>
    );
};

export default AIchat;
