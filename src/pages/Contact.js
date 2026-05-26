import React, { useEffect, useMemo, useState, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import Loader from "../components/Loader";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { Canvas } from "@react-three/fiber"; 




const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: ''});
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const [isLoading, setisLoading] = useState(false);
    const [particlesReady, setParticlesReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
            setParticlesReady(true);
        });
    }, []);

    const snowOptions = useMemo(() => ({
        fpsLimit: 60,
        background: {
            color: {
                value: "transparent"
            }
        },
        particles: {
            color: {
                value: "#ffffff"
            },
            move: {
                enable: true,
                speed: 2.0,
                direction: "bottom",
                random: true,
                straight: false,
                outModes: {
                    default: "out"
                }
            },
            number: {
                value: 210,
                density: {
                    enable: true,
                    area: 900
                }
            },
            opacity: {
                value: { min: 0.7, max: 1 }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 1
            }
        },
        detectRetina: true
    }), []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const [alert, setAlert] = useState({
        show: false,
        text: '',
        type: ''
    });
    
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

            // Success message
            setAlert({
                show: true,
                text: 'Message sent successfully!',
                type: 'success'
            });

            // Clear form
            setForm({
                name: '',
                email: '',
                message: ''
            });

            // Hide alert after 3 seconds
            setTimeout(() => {
                setAlert({
                    show: false,
                    text: '',
                    type: ''
                });
            }, 3000);

        }).catch((error) => {
            setisLoading(false);
            console.log(error);

            // Error message
            setAlert({
                show: true,
                text: 'Something went wrong. Please try again.',
                type: 'danger'
            });

            // Hide alert after 3 seconds
            setTimeout(() => {
                setAlert({
                    show: false,
                    text: '',
                    type: ''
                });
            }, 3000);
        });

    };
    
    const handleFocus = () => {};
    const handleBlur = () => {};
    

return (
<motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
>
<div className="spacer wave-svg-layer-redbluebottom relative overflow-hidden">
    {particlesReady && (
        <div className="pointer-events-none absolute inset-0 z-0">
            <Particles id="contact-snow" options={snowOptions} />
        </div>
    )}
    <section className="relative z-10 flex w-full flex-col px-4 sm:px-6 lg:flex-row lg:w-[600px] lg:px-0 max-container">
            
         <div className="flex-1 min-w-0 flex flex-col">
            <h1 className="silkscreen-regular text-3xl sm:text-4xl text-blue-100 stretchtext-vert">Reach Out</h1>

            {alert.show && (
                <div
                    className={`p-4 rounded-md mb-4 text-white silkscreen-regular ${
                        alert.type === 'danger'
                            ? 'bg-red-500'
                            : 'bg-green-500'
                    }`}
                >
                    {alert.text}
                </div>
            )}
            
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7 my-10 sm:my-14"
                >

            <div className="flex flex-col gap-4 w-full sm:flex-row">
                <label className="text-blue-100 silkscreen-regular w-full text-l">
                    Name
                    <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="first and last name"
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
                    placeholder="example@email.com"
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
                    placeholder="What can I do for you?"
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
                        className="silkscreen-regular image-button spacer-button button-svg-layer text-white text-4xl rounded-[1.5rem]"
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
</motion.div>      
                
    )
}

export default Contact;