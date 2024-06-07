import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AI.css'
import { assets } from '../../assets/assets';

const AI = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const apiKey = import.meta.env.VITE_OCTOAI_API_KEY;

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        setLoading(true);

        const response = await fetch(
            "https://image.octoai.run/generate/sdxl",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "User-Agent": "Chrome"
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                }),
            }
        );
        const data = await response.json();
        setLoading(false);

        if (data && data.images && data.images.length > 0) {
            setImageUrl(`data:image/jpeg;base64,${data.images[0].image_b64}`);
        }
    }

    return (
        <div className='main'>
            <div className='back'>
                <img onClick={handleBackClick} src={assets.youtube_icon} alt="Back" />
            </div>
            <div className="center">
                <h1>AI Image Generator</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <img src={imageUrl || assets.gallery_icon} alt="Generated Image" />
                )}
                <div className="search">
                    <input type="text" ref={inputRef} className='search-input' placeholder='Describe the image you want to see' />
                    <div className="btn" onClick={imageGenerator}>Generate</div>
                </div>
            </div>
        </div>
    );
};

export default AI;
