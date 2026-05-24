import React, { useState, Suspense, useRef } from "react";
import emailjs from '@emailjs/browser';
import Loader from "../components/Loader";

import { Canvas } from "@react-three/fiber"; 




const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: ''});
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const [isLoading, setisLoading] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setisLoading(true);

        console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID)
        emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            
            {
                from_name: form.name,
                to_name: "Devon",
                from_email: form.email,
                to_email: 'dabeden@gmail.com',
                message:form.message
            },
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            
        ).then(() => {
            setisLoading(false);
            // TODO: Show success message
            // TODO: Hide an alert
        }).catch((error) => {
            setisLoading(false);
            console.log(error);
            // TODO: Show error message
        });
    };
    
    const handleFocus = () => {};
    const handleBlur = () => {};
    

return (
<div className="spacer wave-svg-layer-redbluebottom">
    <section className="relative flex lg:flex-row flex-col max-container w-[600px]">
            
         <div className="flex-1 min-w-[50%] flex flex-col">
            <h1 className="silkscreen-regular text-4xl text-blue-100 stretchtext-vert">Reach Out</h1>


            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7 my-14"
                >

            <div className="flex flex-row gap-4 w-full">
                <label className="text-blue-100 silkscreen-regular w-full text-l">
                    Name
                    <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="John"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />
                </label>
                <label className="text-blue-100 silkscreen-regular w-full text-l">
                    E-Mail
                    <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="johndoe@gmail.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />
                </label>
                </div>
                <label className="text-blue-100 silkscreen-regular text-l">
                    Your Message
                    <textarea
                    name="message"
                    rows={4}
                    className="textarea"
                    placeholder="How can I help you?"
                    required
                    value={form.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />
                </label>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="silkscreen-regular  image-button spacer-button button-svg-layer text-white text-4xl "
                        disabled={isLoading}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}


                    </button>
                </div>
            </form>
        </div>
            
            

    </section>
                
</div>          
                
    )
}

export default Contact;