import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';  // Import Axios and AxiosError

// Define the Tutor type
interface Tutor {
    name: string;
    subject: string;
    rating: number;
    bio: string;
}

const AIchat: React.FC = () => {
    const [input, setInput] = useState<string>('');    // State for storing user input
    const [response, setResponse] = useState<string>(''); // State for storing AI response
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [errorMessage, setErrorMessage] = useState<string>('');  // State for storing errors

    // Fetch tutors from your MongoDB database using your backend API
    const fetchTutors = async (query: string) => {
        try {
            const tutorsResponse = await axios.get('http://localhost:5001/api/tutors', {
                params: {
                    subject: encodeURIComponent(query)  // Encode the user input properly
                }
            });
            return tutorsResponse.data;  // Return the fetched tutors
        } catch (error: any) {
            if (error.response) {
                console.error("Server response:", error.response.data);
                console.error("Status code:", error.response.status);
            } else {
                console.error("Error message:", error.message);
            }
            setErrorMessage('Error fetching tutors from the database.');
            return [];
        }
    };
    
    
    
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');  // Reset error message on new request

        try {
            const openAIKey = process.env.REACT_APP_OPENAI_API_KEY;

            // Check if the API key exists before making the request
            if (!openAIKey) {
                setErrorMessage('API key is missing. Please check your .env file.');
                return;
            }

            // Fetch tutors from MongoDB based on user input (e.g., subjects, preferences)
            const tutors: Tutor[] = await fetchTutors(input);

            // Prepare the prompt to GPT, including the list of tutors
            const prompt = `You are an intelligent assistant helping users find the best tutor. Based on the following input "${input}", suggest the best tutors from the list below based on the budget, specialty, and their personality from their bio to best fit the tutor for the client: \n\n${tutors.map((tutor: Tutor) => `${tutor.name} specializes in ${tutor.subject} with a rating of ${tutor.rating}/5 and their personality based on${tutor.bio}`).join('\n')}.`;

            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',  // Correct endpoint for chat-based completions
                {
                    model: 'gpt-3.5-turbo',  // Use 'gpt-4' if you have access
                    messages: [{ role: 'system', content: 'You are a helpful tutor recommender.' }, { role: 'user', content: prompt }],
                    max_tokens: 300,
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
            <h1>Chat with AI Tutor Recommender</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display error messages */}
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here, e.g., 'I need a math tutor...'"
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
