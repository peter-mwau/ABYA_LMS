import { useState, useEffect } from "react";
import './style.css';
// import landingImage from './web3.jpg';
import Swiper from 'swiper';


const Homepage = () => {
    const landingImage = './web3.jpg';
    const [isHidden, setIsHidden] = useState(true);

    const toggleNav = () => {
        document.addEventListener("DOMContentLoaded", function () {
            const openSidenavButton = document.getElementById("openSidenav");


            openSidenavButton.addEventListener("click", function () {
                if (isHidden) {
                    setIsHidden(!isHidden)
                } else {
                    setIsHidden(isHidden);
                }
            });
        });
    };

    const sectionStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${landingImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
    };

    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            effect: 'slide',
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    return (
        <body class="framer-body-mlbahZRIo">

            <div id="main"
                data-framer-hydrate-v2="{&quot;routeId&quot;:&quot;mlbahZRIo&quot;,&quot;localeId&quot;:&quot;default&quot;,&quot;breakpoints&quot;:[{&quot;hash&quot;:&quot;1nflcnj&quot;}]}"
                data-framer-ssr-released-at="2024-06-24T10:38:20.863Z" data-framer-page-optimized-at="2024-06-27T12:50:38.909Z">

                <div className="framer-HWZMM framer-EmBjF framer-1nflcnj" style={{ minHeight: '100vh', width: 'auto' }}>

                    <div class="framer-hfykwd-container">
                        <div id="smoothy">

                        </div>
                    </div>

                    {/* <!-- Nav-bar --> */}
                    <div className="navbar">
                        <div className="framer-KexIg framer-kz113m framer-v-kz113m" data-framer-name="Default" 
                            style={{
                                borderWidth: '1px', 
                                borderColor: 'rgba(255, 209, 2, 0.308)', 
                                borderStyle: 'solid', 
                                backgroundColor: 'rgba(44, 44, 44, 0.8)', 
                                borderRadius: '100px', 
                                height: '100%', 
                                width: '100%'
                            }}>
                            <div className="framer-1fznlb6" style={{backdropFilter: 'none', WebkitBackdropFilter: 'none'}}>
                                <div className="framer-1rupuci">
                                    <div className="framer-gqqp0t-container">
                                        <a href="/" title target="_self" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: 0}}>
                                            <img style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '10px'}} src="https://framerusercontent.com/images/RbmmjGxvoNP2V9QG394I89bBPA.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="framer-nyc44" style={{backgroundColor: 'rgba(255, 209, 2, 0.3)'}}></div>
                                    <div className="framer-5r79xr-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="/" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">Home</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="framer-vtx9ps-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="/login" rel="noopener" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">Login</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="framer-3aau6-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="/register" rel="noopener" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">Register</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="framer-siof0k-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="#about" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">About</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="framer-sil6za-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="#contact" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">Contact</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="framer-zejy4a-container">
                                        <a className="framer-T8N9W framer-1sa9dg6 framer-v-1sa9dg6 framer-svebul" data-framer-name="Default" style={{height: '100%'}} href="./" tabIndex="0">
                                            <div className="framer-1c0a07n" 
                                                style={{
                                                    outline: 'none', 
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start', 
                                                    flexShrink: 0, 
                                                    '--extracted-r6o4lv': 'rgb(255, 255, 255)', 
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                                    '--framer-link-text-decoration': 'underline', 
                                                    opacity: 0.56, 
                                                    transform: 'none'
                                                }} 
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', 
                                                    '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                                    '--framer-font-size': '14px', 
                                                    '--framer-font-weight': '500', 
                                                    '--framer-line-height': '24.9px', 
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, rgb(255, 255, 255))'
                                                }} 
                                                className="framer-text">Faq</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <a className="framer-1061vmo framer-a3gttv" data-framer-name="Button Container" 
                                    style={{
                                        backgroundColor: 'rgb(197, 142, 15)', 
                                        borderBottomLeftRadius: '100px', 
                                        borderBottomRightRadius: '100px', 
                                        borderTopLeftRadius: '100px', 
                                        borderTopRightRadius: '100px'
                                    }} href="./">
                                    <div className="framer-zxelv8" 
                                        style={{
                                            outline: 'none', 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            justifyContent: 'flex-start', 
                                            flexShrink: 0, 
                                            '--framer-link-text-color': 'rgb(0, 153, 255)', 
                                            '--framer-link-text-decoration': 'underline', 
                                            transform: 'none'
                                        }} 
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw', 
                                            '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', 
                                            '--framer-font-size': '14px', 
                                            '--framer-font-weight': '600'
                                        }} 
                                        className="framer-text">Waitlist</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div aria-label="background" className="framer-skwl0m" data-framer-name="Background" name="Background">
                        <div 
                            style={{ 
                                position: 'absolute', 
                                borderRadius: 'inherit', 
                                top: 0, 
                                right: 0, 
                                bottom: 0, 
                                left: 0 
                            }} 
                            data-framer-background-image-wrapper="true"
                        >
                            <img 
                                decoding="async" 
                                sizes="100vw" 
                                srcSet="
                                    https://framerusercontent.com/images/lLvCZgX4vEqSqbGovr29aUJl5c.png?scale-down-to=512 512w, 
                                    https://framerusercontent.com/images/lLvCZgX4vEqSqbGovr29aUJl5c.png?scale-down-to=1024 1024w, 
                                    https://framerusercontent.com/images/lLvCZgX4vEqSqbGovr29aUJl5c.png?scale-down-to=2048 2048w, 
                                    https://framerusercontent.com/images/lLvCZgX4vEqSqbGovr29aUJl5c.png 3254w
                                " 
                                src="https://framerusercontent.com/images/lLvCZgX4vEqSqbGovr29aUJl5c.png" 
                                alt 
                                style={{ 
                                    display: 'block', 
                                    width: '100%', 
                                    height: '100%', 
                                    borderRadius: 'inherit', 
                                    objectPosition: 'left center', 
                                    objectFit: 'contain', 
                                    imageRendering: 'auto' 
                                }} 
                            />
                        </div>
                        <figure className="framer-60lmij" data-framer-name="Image" name="Image">
                            <div 
                                style={{ 
                                    position: 'absolute', 
                                    borderRadius: 'inherit', 
                                    top: 0, 
                                    right: 0, 
                                    bottom: 0, 
                                    left: 0 
                                }} 
                                data-framer-background-image-wrapper="true"
                            >
                                <img 
                                    decoding="async" 
                                    sizes="100vw" 
                                    srcSet="
                                        https://framerusercontent.com/images/K5oL1yM6aNHac5e8Ha17KDpr0.png?scale-down-to=512 512w, 
                                        https://framerusercontent.com/images/K5oL1yM6aNHac5e8Ha17KDpr0.png?scale-down-to=1024 1024w, 
                                        https://framerusercontent.com/images/K5oL1yM6aNHac5e8Ha17KDpr0.png 2000w
                                    " 
                                    src="https://framerusercontent.com/images/K5oL1yM6aNHac5e8Ha17KDpr0.png?scale-down-to=1024" 
                                    alt 
                                    style={{ 
                                        display: 'block', 
                                        width: '100%', 
                                        height: '100%', 
                                        borderRadius: 'inherit', 
                                        objectPosition: 'center', 
                                        objectFit: 'cover', 
                                        imageRendering: 'auto' 
                                    }} 
                                />
                            </div>
                        </figure>
                        <div aria-label="shadow" className="framer-cfzfdi" data-framer-name="Shadow" name="Shadow"></div>
                    </div>

                    {/* <!-- Hero section --> */}
                    <section className="framer-zkjwr1" data-framer-name="Hero" id="hero" name="Hero">
                        <section className="framer-19xs1qh" data-framer-name="Left" name="Left">
                            <div className="framer-166eo9p" data-framer-name="Container" name="Container">
                                <div className="framer-1c2m4v0" data-framer-name="About ABYA University:" style={{
                                    outline: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    flexShrink: 0,
                                    transform: 'none'
                                }} data-framer-component-type="RichTextContainer">
                                    <h3 style={{
                                        fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        fontWeight: 600,
                                        letterSpacing: '0.33em',
                                        lineHeight: '27.9px',
                                        color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                    }} className="framer-text">ABYA University</h3>
                                </div>
                                <div className="framer-48pvrc" data-framer-name="Building a Learner-Driven Future" style={{
                                    outline: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    flexShrink: 0,
                                    transform: 'none'
                                }} data-framer-component-type="RichTextContainer">
                                    <h1 style={{
                                        fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        fontSize: '86px',
                                        fontWeight: 600,
                                        letterSpacing: '-0.04em',
                                        lineHeight: '92px',
                                        color: 'rgb(255, 255, 255)'
                                    }} className="framer-text">Learning Made Accessible & Easy</h1>
                                </div>
                                <div className="framer-5fkyaf" data-framer-name="Spacer" name="Spacer"></div>
                                <div className="framer-4ojh2g" style={{
                                    outline: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    flexShrink: 0,
                                    transform: 'none'
                                }} 
                                data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        letterSpacing: '0.02em',
                                        lineHeight: '27.9px',
                                        color: 'rgb(179, 179, 179)'
                                    }} className="framer-text">Discover the world of blockchain technology through comprehensive courses, expert-led training, and hands-on experience.</p>
                                </div>
                                <div className="framer-1iiqcub" data-framer-name="Spacer" name="Spacer"></div>
                                <div className="framer-1rgc4ax-container">
                                    <div style={{
                                        width: '100%',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '--framer-custom-placeholder-color': 'rgba(255, 255, 255, 0.3)'
                                    }}>
                                        <form style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'flex',
                                            position: 'relative',
                                            flexDirection: 'row',
                                            color: 'rgb(11, 14, 15)',
                                            gap: 0
                                        }} 

                                        method="POST">
                                            <input 
                                                type="email" 
                                                name="email" 
                                                placeholder="name@email.com" 
                                                className="v1 framer-custom-input"
                                                autoComplete="off" 
                                                autoCapitalize="off" 
                                                autoCorrect="off" 
                                                spellCheck="false"
                                                style={{
                                                    WebkitAppearance: 'none',
                                                    appearance: 'none',
                                                    width: '100%',
                                                    height: 'auto',
                                                    outline: 'none',
                                                    border: 'none',
                                                    padding: '20px 163px 20px 25px',
                                                    borderRadius: '100px',
                                                    fontSize: '16px',
                                                    fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    letterSpacing: '0em',
                                                    lineHeight: '1em',
                                                    background: 'rgba(235, 235, 235, 0)',
                                                    color: 'rgb(255, 255, 255)',
                                                    boxShadow: 'inset 0 0 0 0px rgb(255, 255, 255), inset 0 0 0 1px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                }}
                                                data-1p-ignore="true" />

                                                <div style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    bottom: '5px'
                                                }}>
                                                <input type="submit" style={{
                                                    WebkitAppearance: 'none',
                                                    appearance: 'none',
                                                    width: '138px',
                                                    height: '100%',
                                                    outline: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0px 15px 0px 15px',
                                                    borderRadius: '95px',
                                                    fontSize: '20px',
                                                    fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    letterSpacing: '0em',
                                                    lineHeight: '1em',
                                                    background: 'rgb(197, 142, 15)',
                                                    color: 'rgb(11, 14, 15)',
                                                    zIndex: 1,
                                                    boxShadow: 'none'
                                                }} value="Join" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="framer-2ku4ck" data-framer-name="Right" name="Right">
                            <figure className="framer-zqehl2" data-framer-name="Image" name="Image">
                                <div style={{
                                    position: 'absolute',
                                    borderRadius: 'inherit',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }} data-framer-background-image-wrapper="true">
                                    <img decoding="async" sizes="461px"
                                        srcSet="https://framerusercontent.com/images/sADlpb44uKuhmaGELGlzRIG5sw.png?scale-down-to=512 512w,https://framerusercontent.com/images/sADlpb44uKuhmaGELGlzRIG5sw.png 960w"
                                        src="https://framerusercontent.com/images/sADlpb44uKuhmaGELGlzRIG5sw.png"
                                        alt="An abstract image that represents scalability"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 'inherit',
                                            objectPosition: 'center top',
                                            objectFit: 'contain',
                                            imageRendering: 'auto'
                                        }} />
                                </div>
                            </figure>
                        </section>
                    </section>

                    <div class="framer-169atd0" data-framer-name="Spacer" name="Spacer"></div>

                    {/* <!-- Courses --> */}
                    <div class="framer-jgn26d" id="features">
                        <div class="framer-f57iqx" data-framer-name="Spacer" name="Spacer"></div>

                        <div className="framer-9bmvb0"
                            style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <h2 style={{
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '64px',
                                '--framer-font-weight': '600',
                                '--framer-letter-spacing': '-0.04em',
                                '--framer-line-height': '97px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'transparent',
                                backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 94.1044%)',
                                backgroundClip: 'text', 
                                WebkitBackgroundClip: 'text',
                                color: 'transparent' 
                            }}
                            className="framer-text">
                                <span data-text-fill="true" className="framer-text">Courses</span>
                            </h2>
                        </div>


                        <div class="framer-18qcomx" data-framer-name="Spacer" name="Spacer"></div>

                        <div className="framer-f04faq"
                            style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none',
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '18px',
                                '--framer-letter-spacing': '0.02em',
                                '--framer-line-height': '27.9px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'rgb(179, 179, 179)'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <p style={{
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '18px',
                                '--framer-letter-spacing': '0.02em',
                                '--framer-line-height': '27.9px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'rgb(179, 179, 179)'
                            }}
                            className="framer-text">Here at ABYA , we offer various courses of which most of them are Blockchain related and they are very detailed in terms of the content. You also access a large community support during your learning journey.</p>
                        </div>

                        <div class="framer-1yy1tc1" data-framer-name="Spacer" name="Spacer"></div>

                        <div class="framer-1lj2ix9">
                            <div className="framer-ar9knc-container"
                                    style={{
                                        opacity: 1,
                                        transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                    }}>
                                    <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                        data-framer-name="Variant 1"
                                        style={{
                                            '--border-bottom-width': '0px',
                                            '--border-color': 'rgba(0, 0, 0, 0)',
                                            '--border-left-width': '0px',
                                            '--border-right-width': '0px',
                                            '--border-style': 'solid',
                                            '--border-top-width': '0px',
                                            backgroundColor: 'rgb(31, 31, 29)',
                                            borderBottomLeftRadius: '30px',
                                            borderBottomRightRadius: '30px',
                                            borderTopLeftRadius: '30px',
                                            borderTopRightRadius: '30px',
                                            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                            width: '100%'
                                        }}
                                        href="./">
                                        <div className="framer-by1oke"
                                            style={{
                                                background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                                borderBottomLeftRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderTopLeftRadius: '18px',
                                                borderTopRightRadius: '18px'
                                            }}>

                                            <div className="framer-7crl6t"
                                                style={{
                                                    borderBottomLeftRadius: '20px',
                                                    borderBottomRightRadius: '20px',
                                                    borderTopLeftRadius: '20px',
                                                    borderTopRightRadius: '20px'
                                                }}>
                                                <div className="framer-1j9ov3d-container">
                                                    <div style={{ display: 'contents' }}></div>
                                                </div>
                                            </div>
                                            <div className="framer-1jdprhl"
                                                style={{

                                                    outline: 'none',
                                                    display: 'flex',
                                                    height: 'fit-content',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    
                                                    '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <img
                                                    src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                    alt="Blockchain"
                                                    style={{
                                                        width: '100%',                                                        
                                                        display: 'block',
                                                        height: '50%',
                                                        borderBottomLeftRadius: '18px',
                                                        borderBottomRightRadius: '18px',
                                                        borderTopLeftRadius: '18px',
                                                        borderTopRightRadius: '18px'
                                                    }}
                                                />
                                                <h3 style={{
                                                    paddingTop: '20px',
                                                    '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                    '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                    '--framer-font-size': '20px',
                                                    '--framer-letter-spacing': '0px',
                                                    '--framer-line-height': '1.3em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }} className="framer-text">Introduction to Blockchain Technology</h3>

                                                <div className="framer-66bj2j"
                                                    style={{
                                                        paddingTop: '10px',
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        opacity: 0.6,
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                        '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                        '--framer-line-height': '1.5em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                    }} className="framer-text">Explore the fundamentals of blockchain and its applications across various industries.
                                                    </p>
                                                </div>

                                                <div className="framer-13qejrz">
                                                    <div className="framer-13dint0"
                                                        style={{
                                                            outline: 'none',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'flex-start',
                                                            flexShrink: 0,
                                                            '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                            '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                            '--framer-link-text-decoration': 'underline',
                                                            transform: 'none'
                                                        }}
                                                        data-framer-component-type="RichTextContainer">
                                                        <p style={{
                                                            '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                            '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                            '--framer-font-size': '12px',
                                                            '--framer-letter-spacing': '-0.1px',
                                                            '--framer-line-height': '2em',
                                                            '--framer-text-alignment': 'left',
                                                            '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                            '--framer-text-transform': 'uppercase'
                                                        }} className="framer-text">Learn More</p>
                                                    </div>
                                                    <div className="framer-14dqekp" data-border="true"
                                                        style={{
                                                            '--border-bottom-width': '2px',
                                                            '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                            '--border-left-width': '2px',
                                                            '--border-right-width': '2px',
                                                            '--border-style': 'solid',
                                                            '--border-top-width': '2px',
                                                            backgroundColor: 'rgba(0, 0, 0, 0)',
                                                            borderBottomLeftRadius: '70px',
                                                            borderBottomRightRadius: '70px',
                                                            borderTopLeftRadius: '70px',
                                                            borderTopRightRadius: '70px'
                                                        }}>
                                                        <div className="framer-zctru0-container">
                                                            <div style={{ display: 'contents' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                            </div>

                            <div className="framer-ar9knc-container"
                                style={{
                                    opacity: 1,
                                    transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                }}>
                                <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                    data-framer-name="Variant 1"
                                    style={{
                                        '--border-bottom-width': '0px',
                                        '--border-color': 'rgba(0, 0, 0, 0)',
                                        '--border-left-width': '0px',
                                        '--border-right-width': '0px',
                                        '--border-style': 'solid',
                                        '--border-top-width': '0px',
                                        backgroundColor: 'rgb(31, 31, 29)',
                                        borderBottomLeftRadius: '30px',
                                        borderBottomRightRadius: '30px',
                                        borderTopLeftRadius: '30px',
                                        borderTopRightRadius: '30px',
                                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                        width: '100%'
                                    }}
                                    href="./">
                                    <div className="framer-by1oke"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                            borderBottomLeftRadius: '0px',
                                            borderBottomRightRadius: '0px',
                                            borderTopLeftRadius: '18px',
                                            borderTopRightRadius: '18px'
                                        }}>
                                        <div className="framer-7crl6t"
                                            style={{
                                                borderBottomLeftRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }}>
                                            <div className="framer-1j9ov3d-container">
                                                <div style={{ display: 'contents' }}></div>
                                            </div>
                                        </div>
                                        <div className="framer-1jdprhl"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                '--framer-link-text-decoration': 'underline',
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <img
                                                src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                alt="Blockchain"
                                                style={{
                                                    width: '100%',                                                        
                                                    display: 'block',
                                                    height: '50%',
                                                    borderBottomLeftRadius: '18px',
                                                    borderBottomRightRadius: '18px',
                                                    borderTopLeftRadius: '18px',
                                                    borderTopRightRadius: '18px'
                                                }}
                                            />
                                            <h3 style={{
                                                paddingTop: '20px',
                                                '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                '--framer-font-size': '20px',
                                                '--framer-letter-spacing': '-0.1px',
                                                '--framer-line-height': '1.3em',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                            }} className="framer-text">Smart Contracts Development</h3>

                                            <div className="framer-66bj2j"
                                                style={{
                                                    paddingTop: '10px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    opacity: 0.6,
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                    '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                    '--framer-line-height': '1.5em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }} className="framer-text">Learn how to design and deploy smart contracts on popular blockchain platforms.
                                                </p>
                                            </div>

                                            <div className="framer-13qejrz">
                                                <div className="framer-13dint0"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                        '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                        '--framer-font-size': '12px',
                                                        '--framer-letter-spacing': '-0.1px',
                                                        '--framer-line-height': '2em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                        '--framer-text-transform': 'uppercase'
                                                    }} className="framer-text">Learn More</p>
                                                </div>
                                                <div className="framer-14dqekp" data-border="true"
                                                    style={{
                                                        '--border-bottom-width': '2px',
                                                        '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--border-left-width': '2px',
                                                        '--border-right-width': '2px',
                                                        '--border-style': 'solid',
                                                        '--border-top-width': '2px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                                        borderBottomLeftRadius: '70px',
                                                        borderBottomRightRadius: '70px',
                                                        borderTopLeftRadius: '70px',
                                                        borderTopRightRadius: '70px'
                                                    }}>
                                                    <div className="framer-zctru0-container">
                                                        <div style={{ display: 'contents' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="framer-n59l5e-container"
                                style={{
                                    opacity: 1,
                                    transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                }}>
                                <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                    data-framer-name="Variant 1"
                                    style={{
                                        '--border-bottom-width': '0px',
                                        '--border-color': 'rgba(0, 0, 0, 0)',
                                        '--border-left-width': '0px',
                                        '--border-right-width': '0px',
                                        '--border-style': 'solid',
                                        '--border-top-width': '0px',
                                        backgroundColor: 'rgb(31, 31, 29)',
                                        borderBottomLeftRadius: '30px',
                                        borderBottomRightRadius: '30px',
                                        borderTopLeftRadius: '30px',
                                        borderTopRightRadius: '30px',
                                        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                        width: '100%'
                                    }}
                                    href="./">
                                    <div className="framer-by1oke"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                            borderBottomLeftRadius: '0px',
                                            borderBottomRightRadius: '0px',
                                            borderTopLeftRadius: '18px',
                                            borderTopRightRadius: '18px'
                                        }}>
                                        <div className="framer-7crl6t"
                                            style={{
                                                borderBottomLeftRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }}>
                                            <div className="framer-1j9ov3d-container">
                                                <div style={{ display: 'contents' }}></div>
                                            </div>
                                        </div>
                                        <div className="framer-1jdprhl"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                '--framer-link-text-decoration': 'underline',
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <img
                                                src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                alt="Blockchain"
                                                style={{
                                                    width: '100%',                                                        
                                                    display: 'block',
                                                    height: '50%',
                                                    borderBottomLeftRadius: '18px',
                                                    borderBottomRightRadius: '18px',
                                                    borderTopLeftRadius: '18px',
                                                    borderTopRightRadius: '18px'
                                                }}
                                            />
                                            <h3 style={{
                                                paddingTop: '20px',
                                                '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                '--framer-font-size': '20px',
                                                '--framer-letter-spacing': '-0.1px',
                                                '--framer-line-height': '1.3em',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                            }}
                                            className="framer-text">Blockchain for Business</h3>

                                            <div className="framer-66bj2j"
                                                style={{
                                                    paddingTop: '10px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    opacity: '0.6',
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                    '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                    '--framer-line-height': '1.5em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }}
                                                className="framer-text">Understand how blockchain can revolutionize business operations and strategies.
                                                </p>
                                            </div>
                                            <div className="framer-13qejrz">
                                                <div className="framer-13dint0"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                        '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                        '--framer-font-size': '12px',
                                                        '--framer-letter-spacing': '-0.1px',
                                                        '--framer-line-height': '2em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                        '--framer-text-transform': 'uppercase'
                                                    }}
                                                    className="framer-text">Learn More</p>
                                                </div>
                                                <div className="framer-14dqekp" data-border="true"
                                                    style={{
                                                        '--border-bottom-width': '2px',
                                                        '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--border-left-width': '2px',
                                                        '--border-right-width': '2px',
                                                        '--border-style': 'solid',
                                                        '--border-top-width': '2px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                                        borderBottomLeftRadius: '70px',
                                                        borderBottomRightRadius: '70px',
                                                        borderTopLeftRadius: '70px',
                                                        borderTopRightRadius: '70px',
                                                        transform: 'none'
                                                    }}>
                                                    <div className="framer-zctru0-container">
                                                        <div style={{ display: 'contents' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="framer-1xbjsqh-container"
                                style={{
                                    opacity: 1,
                                    transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                }}>
                                <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                    data-framer-name="Variant 1"
                                    style={{
                                        '--border-bottom-width': '0px',
                                        '--border-color': 'rgba(0, 0, 0, 0)',
                                        '--border-left-width': '0px',
                                        '--border-right-width': '0px',
                                        '--border-style': 'solid',
                                        '--border-top-width': '0px',
                                        backgroundColor: 'rgb(31, 31, 29)',
                                        borderBottomLeftRadius: '30px',
                                        borderBottomRightRadius: '30px',
                                        borderTopLeftRadius: '30px',
                                        borderTopRightRadius: '30px',
                                        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                        width: '100%'
                                    }}
                                    href="./">
                                    <div className="framer-by1oke"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                            borderBottomLeftRadius: '0px',
                                            borderBottomRightRadius: '0px',
                                            borderTopLeftRadius: '18px',
                                            borderTopRightRadius: '18px'
                                        }}>
                                        <div className="framer-7crl6t"
                                            style={{
                                                borderBottomLeftRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }}>
                                            <div className="framer-1j9ov3d-container">
                                                <div style={{ display: 'contents' }}></div>
                                            </div>
                                        </div>
                                        <div className="framer-1jdprhl"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                '--framer-link-text-decoration': 'underline',
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <img
                                                src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                alt="Blockchain"
                                                style={{
                                                    width: '100%',                                                        
                                                    display: 'block',
                                                    height: '50%',
                                                    borderBottomLeftRadius: '18px',
                                                    borderBottomRightRadius: '18px',
                                                    borderTopLeftRadius: '18px',
                                                    borderTopRightRadius: '18px'
                                                }}
                                            />
                                            <h3 style={{
                                                paddingTop: '20px',
                                                '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                '--framer-font-size': '20px',
                                                '--framer-letter-spacing': '-0.1px',
                                                '--framer-line-height': '1.3em',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                            }} className="framer-text">Cryptocurrency and Digital Assets</h3>

                                            <div className="framer-66bj2j"
                                                style={{
                                                    paddingTop: '10px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    opacity: '0.6',
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                    '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                    '--framer-line-height': '1.5em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }} className="framer-text">Dive into the world of cryptocurrencies, including Bitcoin, Ethereum, and emerging digital assets.
                                                </p>
                                            </div>
                                            <div className="framer-13qejrz">
                                                <div className="framer-13dint0"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                        '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                        '--framer-font-size': '12px',
                                                        '--framer-letter-spacing': '-0.1px',
                                                        '--framer-line-height': '2em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                        '--framer-text-transform': 'uppercase'
                                                    }} className="framer-text">Learn More</p>
                                                </div>
                                                <div className="framer-14dqekp" data-border="true"
                                                    style={{
                                                        '--border-bottom-width': '2px',
                                                        '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--border-left-width': '2px',
                                                        '--border-right-width': '2px',
                                                        '--border-style': 'solid',
                                                        '--border-top-width': '2px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                                        borderBottomLeftRadius: '70px',
                                                        borderBottomRightRadius: '70px',
                                                        borderTopLeftRadius: '70px',
                                                        borderTopRightRadius: '70px',
                                                        transform: 'none'
                                                    }}>
                                                    <div className="framer-zctru0-container">
                                                        <div style={{ display: 'contents' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </a>
                            </div>

                            <div className="framer-1my40c2-container"
                                style={{
                                    opacity: 1,
                                    transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                }}>
                                <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                    data-framer-name="Variant 1"
                                    style={{
                                        '--border-bottom-width': '0px',
                                        '--border-color': 'rgba(0, 0, 0, 0)',
                                        '--border-left-width': '0px',
                                        '--border-right-width': '0px',
                                        '--border-style': 'solid',
                                        '--border-top-width': '0px',
                                        backgroundColor: 'rgb(31, 31, 29)',
                                        borderBottomLeftRadius: '30px',
                                        borderBottomRightRadius: '30px',
                                        borderTopLeftRadius: '30px',
                                        borderTopRightRadius: '30px',
                                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                        width: '100%'
                                    }}
                                    href="./">
                                    <div className="framer-by1oke"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                            borderBottomLeftRadius: '0px',
                                            borderBottomRightRadius: '0px',
                                            borderTopLeftRadius: '18px',
                                            borderTopRightRadius: '18px'
                                        }}>
                                        <div className="framer-7crl6t"
                                            style={{
                                                borderBottomLeftRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }}>
                                            <div className="framer-1j9ov3d-container">
                                                <div style={{ display: 'contents' }}></div>
                                            </div>
                                        </div>
                                        <div className="framer-1jdprhl"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                '--framer-link-text-decoration': 'underline',
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <img
                                                src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                alt="Blockchain"
                                                style={{
                                                    width: '100%',                                                        
                                                    display: 'block',
                                                    height: '50%',
                                                    borderBottomLeftRadius: '18px',
                                                    borderBottomRightRadius: '18px',
                                                    borderTopLeftRadius: '18px',
                                                    borderTopRightRadius: '18px'
                                                }}
                                            />
                                            <h3 style={{
                                                paddingTop: '20px',
                                                '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                '--framer-font-size': '20px',
                                                '--framer-letter-spacing': '-0.1px',
                                                '--framer-line-height': '1.3em',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                            }}
                                            className="framer-text">Blockchain Security</h3>
                                            <div className="framer-66bj2j"
                                                style={{
                                                    paddingTop: '10px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    opacity: 0.6,
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                    '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                    '--framer-line-height': '1.5em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }}
                                                    className="framer-text">Master the techniques to secure blockchain networks and protect against vulnerabilities.
                                                </p>
                                            </div>
                                            <div className="framer-13qejrz">
                                                <div className="framer-13dint0"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                        '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                        '--framer-font-size': '12px',
                                                        '--framer-letter-spacing': '-0.1px',
                                                        '--framer-line-height': '2em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                        '--framer-text-transform': 'uppercase'
                                                    }}
                                                        className="framer-text">Learn More
                                                    </p>
                                                </div>
                                                <div className="framer-14dqekp" data-border="true"
                                                    style={{
                                                        '--border-bottom-width': '2px',
                                                        '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--border-left-width': '2px',
                                                        '--border-right-width': '2px',
                                                        '--border-style': 'solid',
                                                        '--border-top-width': '2px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                                        borderBottomLeftRadius: '70px',
                                                        borderBottomRightRadius: '70px',
                                                        borderTopLeftRadius: '70px',
                                                        borderTopRightRadius: '70px'
                                                    }}>
                                                    <div className="framer-zctru0-container">
                                                        <div style={{ display: 'contents' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="framer-79ne5w-container"
                                style={{
                                    opacity: 1,
                                    transform: 'perspective(1200px) translateX(0px) translateY(32px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)'
                                }}>
                                <a className="framer-ZHuJl framer-111mmjy framer-v-111mmjy framer-16x4q9s"
                                    data-framer-name="Variant 1"
                                    style={{
                                        '--border-bottom-width': '0px',
                                        '--border-color': 'rgba(0, 0, 0, 0)',
                                        '--border-left-width': '0px',
                                        '--border-right-width': '0px',
                                        '--border-style': 'solid',
                                        '--border-top-width': '0px',
                                        backgroundColor: 'rgb(31, 31, 29)',
                                        borderBottomLeftRadius: '30px',
                                        borderBottomRightRadius: '30px',
                                        borderTopLeftRadius: '30px',
                                        borderTopRightRadius: '30px',
                                        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 5px 0px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                        width: '100%'
                                    }}
                                    href="./">
                                    <div className="framer-by1oke"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(66, 66, 20) 0%, rgb(51, 51, 20) 2.2552369263795087%, rgb(33, 33, 24) 100%)',
                                            borderBottomLeftRadius: '0px',
                                            borderBottomRightRadius: '0px',
                                            borderTopLeftRadius: '18px',
                                            borderTopRightRadius: '18px'
                                        }}>
                                        <div className="framer-7crl6t"
                                            style={{
                                                borderBottomLeftRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }}>
                                            <div className="framer-1j9ov3d-container">
                                                <div style={{ display: 'contents' }}></div>
                                            </div>
                                        </div>
                                        <div className="framer-1jdprhl"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                '--extracted-a0htzi': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                '--framer-link-text-decoration': 'underline',
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <img
                                                src="https://i.postimg.cc/y6n2C13G/2151480177.jpg"
                                                alt="Blockchain"
                                                style={{
                                                    width: '100%',                                                        
                                                    display: 'block',
                                                    height: '50%',
                                                    borderBottomLeftRadius: '18px',
                                                    borderBottomRightRadius: '18px',
                                                    borderTopLeftRadius: '18px',
                                                    borderTopRightRadius: '18px'
                                                }}
                                            />
                                            <h3 style={{
                                                paddingTop: '20px',
                                                '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                '--framer-font-size': '20px',
                                                '--framer-letter-spacing': '-0.1px',
                                                '--framer-line-height': '1.3em',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--extracted-a0htzi, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                            }}
                                            className="framer-text">Decentralized Applications (DApps)</h3>
                                            <div className="framer-66bj2j"
                                                style={{
                                                    paddingTop: '10px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    flexShrink: 0,
                                                    '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                                    '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                    '--framer-link-text-decoration': 'underline',
                                                    opacity: 0.6,
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                                    '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                                    '--framer-line-height': '1.5em',
                                                    '--framer-text-alignment': 'left',
                                                    '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                                }}
                                                className="framer-text">Gain hands-on experience in building and deploying decentralized applications.
                                                </p>
                                            </div>
                                            <div className="framer-13qejrz">
                                                <div className="framer-13dint0"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7VW5ib3VuZGVkLXJlZ3VsYXI=',
                                                        '--framer-font-family': '"Unbounded", "Unbounded Placeholder", sans-serif',
                                                        '--framer-font-size': '12px',
                                                        '--framer-letter-spacing': '-0.1px',
                                                        '--framer-line-height': '2em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76)))',
                                                        '--framer-text-transform': 'uppercase'
                                                    }}
                                                    className="framer-text">Learn More</p>
                                                </div>
                                                <div className="framer-14dqekp" data-border="true"
                                                    style={{
                                                        '--border-bottom-width': '2px',
                                                        '--border-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(254, 232, 76))',
                                                        '--border-left-width': '2px',
                                                        '--border-right-width': '2px',
                                                        '--border-style': 'solid',
                                                        '--border-top-width': '2px',
                                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                                        borderBottomLeftRadius: '70px',
                                                        borderBottomRightRadius: '70px',
                                                        borderTopLeftRadius: '70px',
                                                        borderTopRightRadius: '70px',
                                                        transform: 'none'
                                                    }}>
                                                    <div className="framer-zctru0-container">
                                                        <div style={{ display: 'contents' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="framer-542be0" id="features-1">
                        <div class="framer-gie60o" data-framer-name="Spacer" name="Spacer"></div>
                        <div className="framer-9bmvb0"
                            style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <h2 style={{
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '64px',
                                '--framer-font-weight': '600',
                                '--framer-letter-spacing': '-0.04em',
                                '--framer-line-height': '97px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'transparent',
                                backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 94.1044%)',
                                backgroundClip: 'text', 
                                WebkitBackgroundClip: 'text',
                                color: 'transparent' 
                            }}
                            className="framer-text">
                                <span data-text-fill="true" className="framer-text">Features</span>
                            </h2>
                        </div>
                        
                        <div className="framer-12tambw"
                            style={{
                                outline: "none",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                flexShrink: 0,
                                transform: "none",
                                fontFamily: `"Inter", "Inter Placeholder", sans-serif`,
                                fontSize: "28px",
                                fontWeight: 500,
                                lineHeight: "1.4em",
                                color: "rgb(153, 153, 153)",
                                '--font-selector': 'SW50ZXItTWVkaXVt',
                                '--framer-font-size': '28px',
                                '--framer-font-weight': '500',
                                '--framer-line-height': '1.4em',
                                '--framer-text-color': 'rgb(153, 153, 153)'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <h2 className="framer-text">WHY WE ARE THE BEST!</h2>
                            <div
                                style={{
                                    fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif`,
                                    fontSize: "18px",
                                    lineHeight: "2em",
                                    color: "rgb(140, 140, 140)",
                                    '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                    '--framer-font-size': '18px',
                                    '--framer-line-height': '2em',
                                    '--framer-text-color': 'rgb(140, 140, 140)'
                                }}
                                className="framer-text">
                                <br className="framer-text trailing-break" />
                            </div>
                        </div>
                        <div className="framer-1mml1c6"
                            style={{
                                outline: "none",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                flexShrink: 0,
                                transform: "none",
                                fontFamily: `"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif`,
                                fontSize: "18px",
                                letterSpacing: "0.02em",
                                lineHeight: "27.9px",
                                textAlign: "center",
                                color: "rgb(179, 179, 179)",
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                '--framer-font-size': '18px',
                                '--framer-text-alignment': 'center',
                                '--framer-letter-spacing': '0.02em',
                                '--framer-line-height': '27.9px',
                                '--framer-text-color': 'rgb(179, 179, 179)'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <p className="framer-text">
                                Abya is your gateway to a world of knowledge and learning. We are dedicated to empowering the next generation of change leaders through innovative education and creative collaboration.
                            </p>
                        </div>

                        <div class="framer-1jpmxc" data-framer-name="Spacer" name="Spacer"></div>
                        <div class="framer-1dot7m2" data-framer-name="Spacer" name="Spacer"></div>

                        <div class="framer-ssn0mv" data-framer-name="Features" name="Features">
                            <div aria-label="feature" class="framer-1i3ya54" data-border="true" data-framer-name="Feature"
                                name="Feature">
                                <div className="framer-7i7jb7" data-border="true" data-framer-name="Top" name="Top">
                                    <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}
                                        data-framer-background-image-wrapper="true">
                                        <img decoding="async" loading="lazy" sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w, https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png"
                                            alt=""
                                            style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                    </div>
                                    <div className="framer-1e98x0u">
                                        <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}
                                            data-framer-background-image-wrapper="true">
                                            <img decoding="async" loading="lazy" sizes="381px"
                                                srcSet="https://framerusercontent.com/images/IB4pBCXqXDrRPrzyAYVAOxIYwmk.png?scale-down-to=512 512w, https://framerusercontent.com/images/IB4pBCXqXDrRPrzyAYVAOxIYwmk.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/IB4pBCXqXDrRPrzyAYVAOxIYwmk.png 2000w"
                                                src="https://framerusercontent.com/images/IB4pBCXqXDrRPrzyAYVAOxIYwmk.png"
                                                alt=""
                                                style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                        </div>
                                    </div>
                                    <div className="framer-kpjewp">
                                        <div className="framer-1pvwus9" data-border="true">
                                            <div className="framer-ae08a-container">
                                                <div>
                                                    <iconify-icon
                                                        inline="true"
                                                        icon="mdi-light:eye-thin"
                                                        mode="svg"
                                                        style={{
                                                            fontSize: 49,
                                                            verticalAlign: "undefinedem",
                                                            color: "var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(197, 142, 15))"
                                                        }}
                                                        rotate="0deg"
                                                        flip="none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="1em"
                                                            height="1em"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M21.564 12.027a1.436 1.436 0 1 0 0-2.87c-.031 0-.06.006-.092.008l-.482-1.9a1.43 1.43 0 1 0-1.918-2.104l-4.89-2.273a1.4 1.4 0 0 0 .08-.452a1.436 1.436 0 1 0-2.871 0a1 1 0 0 0 .015.146l-3.114.955a1.43 1.43 0 0 0-2.44 1.432l-2.93 2.616a1.4 1.4 0 0 0-.734-.209a1.431 1.431 0 0 0-.43 2.798l-.194 1.866a1.432 1.432 0 1 0 1.097 2.532l.966.425l-.003.03a1.434 1.434 0 0 0 2.845.25h1.104a1.43 1.43 0 0 0 2.785-.128l3.107.102a1.4 1.4 0 0 0 1.664.125a11.7 11.7 0 0 1 4.297 4.039a1.4 1.4 0 0 0-.107.537a1.436 1.436 0 1 0 2.292-1.145a6.7 6.7 0 0 1-1.038-2.422a1.422 1.422 0 0 0 .45-2.472zm.565-1.435a.564.564 0 1 1-.565-.565a.565.565 0 0 1 .565.565M20.985 9.28a1.43 1.43 0 0 0-.844 1.19H19.02a1.43 1.43 0 0 0-.541-1.003l1.407-1.933a1.26 1.26 0 0 0 .647-.04Zm-2.274 5.567l-2.898-.742a1.42 1.42 0 0 0-.345-.878l1.17-1.575a1.38 1.38 0 0 0 1.368.307l1.252 1.934a1.43 1.43 0 0 0-.547.954M8.251 5.385l4.081 2.136a1.3 1.3 0 0 0-.017.785l-2.62 1.347a1.43 1.43 0 0 0-1.077-.497q-.018.001-.035.004L7.64 5.79a1.43 1.43 0 0 0 .611-.405M19.4 7.354L18.033 9.23a1.37 1.37 0 0 0-1.361.272l-1.591-1.2a1.1 1.1 0 0 0 .035-.53l3.707-1.06a1.44 1.44 0 0 0 .577.64m-1.804 3.802a.564.564 0 1 1-.564.565a.565.565 0 0 1 .564-.565m-3.899-2.65a.564.564 0 1 1 .565-.565a.565.565 0 0 1-.565.564m-5.08 1.521a.564.564 0 1 1-.564.565a.565.565 0 0 1 .565-.565m1.436.565a1.4 1.4 0 0 0-.098-.511l2.568-1.32a1.43 1.43 0 0 0 1.175.615l.024-.002l-.434 3.66l-3.906.494a1.4 1.4 0 0 0-.24-.054l-.297-1.47a1.435 1.435 0 0 0 1.208-1.412M8.95 14.325a.564.564 0 1 1-.565.565a.565.565 0 0 1 .565-.565m1.076-.375l3.053-.385a1.4 1.4 0 0 0-.005 1.173l-2.713-.088a1.4 1.4 0 0 0-.335-.7m4.213-4.682a1.44 1.44 0 0 0 .629-.5l1.486 1.12a1.38 1.38 0 0 0-.03 1.351l-1.243 1.67a1.4 1.4 0 0 0-1.265-.07Zm5.89-3.708a.564.564 0 1 1-.564.564a.565.565 0 0 1 .565-.564m-1.328.026a1.4 1.4 0 0 0-.107.538c0 .035.008.068.01.103l-3.732 1.066a1.43 1.43 0 0 0-1.274-.788c-.043 0-.085.01-.127.013l-.521-2.67a1.43 1.43 0 0 0 .893-.52ZM12.826 1.87a.564.564 0 1 1-.564.565a.565.565 0 0 1 .564-.565m-1.284 1.192a1.44 1.44 0 0 0 .996.779l.548 2.805a1.44 1.44 0 0 0-.526.429L8.515 4.959a1.36 1.36 0 0 0 .023-.975Zm-4.36.808a.564.564 0 1 1-.564.565a.565.565 0 0 1 .564-.565m-.04 1.996l.95 3.392a1.44 1.44 0 0 0-.672.545l-3.799-.969l.003-.023a1.42 1.42 0 0 0-.324-.896l2.824-2.519a1.43 1.43 0 0 0 1.017.47m-4.806 7.587a.564.564 0 1 1-.564-.564a.565.565 0 0 1 .564.564m-.27-1.405l.189-1.808a1.43 1.43 0 0 0 1.269-.914l3.698.943a1.3 1.3 0 0 0-.014.576l-4.343 1.69a1.43 1.43 0 0 0-.8-.486m.122-3.802a.564.564 0 1 1-.564.565a.565.565 0 0 1 .564-.565m.817 5.93a1.37 1.37 0 0 0 .114-1.202l4.266-1.66a1.43 1.43 0 0 0 .891.667l-1.865 2.583a1.429 1.429 0 0 0-2.683-.07Zm2.054 1.415a.564.564 0 1 1 .565-.565a.565.565 0 0 1-.565.565m3.407-3.306l.179 1.202a1.43 1.43 0 0 0-1.12 1.29h-.7Zm5.916 2.435a.564.564 0 1 1 .565-.565a.565.565 0 0 1-.565.565m6.373 5.795a.564.564 0 1 1 .564-.564a.565.565 0 0 1-.564.564m0-2a1.43 1.43 0 0 0-1.023.431a12 12 0 0 0-4.21-3.927a1.4 1.4 0 0 0 .199-.358l3.023.723a1.43 1.43 0 0 0 1.344 1.074a5.8 5.8 0 0 0 .775 2.068c-.037-.003-.071-.01-.108-.01m-.626-2.924a.564.564 0 1 1 .564-.565a.565.565 0 0 1-.564.565m.444-1.923a1.3 1.3 0 0 0-.87-.006l-1.249-1.928a1.43 1.43 0 0 0 .52-.763h1.213a1.44 1.44 0 0 0 .883.962Z"
                                                            />
                                                        </svg>
                                                    </iconify-icon>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="framer-ahi9cs"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <h3 style={{
                                                '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==',
                                                '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                                '--framer-font-size': '22px',
                                                '--framer-font-weight': '500',
                                                '--framer-letter-spacing': '-0.45px',
                                                '--framer-line-height': '28px',
                                                '--framer-text-alignment': 'center',
                                                '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                            }}
                                            className="framer-text">Learn Together</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="framer-17i3n8x" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-1wc6xmg" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-1mnfmso"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: 0,
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{ '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==', '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif', '--framer-font-weight': 300, '--framer-line-height': '24px', '--framer-text-alignment': 'center', '--framer-text-color': 'rgb(161, 161, 170)' }}
                                            className="framer-text">Learning together with like-minded participants has proven to be more effective than learning alone.</p>
                                    </div>
                                </div>
                            </div>

                            <div aria-label="feature" className="framer-1ftcs5w" data-border="true" data-framer-name="Feature" name="Feature">
                                <div className="framer-1ngxfol" data-border="true" data-framer-name="Top" name="Top">
                                    <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}
                                        data-framer-background-image-wrapper="true">
                                        <img decoding="async" loading="lazy" sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w, https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png" alt=""
                                            style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                    </div>
                                    <div className="framer-uky70z">
                                        <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}
                                            data-framer-background-image-wrapper="true">
                                            <img decoding="async" loading="lazy" sizes="381px"
                                                srcSet="https://framerusercontent.com/images/tdYnGTJeJF929QIECyV7QuQQP8.png?scale-down-to=512 512w, https://framerusercontent.com/images/tdYnGTJeJF929QIECyV7QuQQP8.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/tdYnGTJeJF929QIECyV7QuQQP8.png 2000w"
                                                src="https://framerusercontent.com/images/tdYnGTJeJF929QIECyV7QuQQP8.png" alt=""
                                                style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                        </div>
                                    </div>
                                    <div className="framer-1maphpf">
                                        <div className="framer-1gk3j90" data-border="true">
                                            <div className="framer-1ovkxds-container">
                                                <div>
                                                    <iconify-icon inline="true" icon="mdi-light:memory" mode="svg"
                                                        style={{ fontSize: '49px', verticalAlign: 'undefinedem', color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(197, 142, 15))', rotate: '0deg', flip: 'none' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="m8.46 15.06l-1.41 1.41l-1.37-1.37A7.94 7.94 0 0 0 4.06 19H6v2H2v-1c0-4.84 3.44-8.87 8-9.8v-2L2 5V3h20v2l-8 3.2v2c4.56.93 8 4.96 8 9.8v1h-4v-2h1.94a7.94 7.94 0 0 0-1.62-3.9l-1.37 1.37l-1.41-1.41l1.37-1.38A8 8 0 0 0 13 12.06V14h-2v-1.94c-1.46.18-2.8.76-3.91 1.62zM12 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2c-.32 0-.62-.07-.88-.21L7.27 20l3.85-1.79c.26-.14.56-.21.88-.21" />
                                                        </svg>
                                                    </iconify-icon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="framer-lh70u6"
                                            style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none' }}
                                            data-framer-component-type="RichTextContainer">
                                            <h3 style={{ '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==', '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif', '--framer-font-size': '22px', '--framer-font-weight': 500, '--framer-letter-spacing': '-0.45px', '--framer-line-height': '28px', '--framer-text-alignment': 'center', '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))' }}
                                                className="framer-text">Scalability</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="framer-wztssl" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-uu982r" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-pn7p22"
                                        style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none' }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{ '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==', '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif', '--framer-font-weight': 300, '--framer-line-height': '24px', '--framer-text-alignment': 'center', '--framer-text-color': 'rgb(161, 161, 170)' }}
                                            className="framer-text">Seamlessly adapt to your evolving API needs, ensuring efficiency at any scale.</p>
                                    </div>
                                </div>
                            </div>

                            <div aria-label="feature" className="framer-j2fvnj" data-border="true" data-framer-name="Feature" name="Feature">
                                <div className="framer-sjp8vs" data-border="true" data-framer-name="Top" name="Top">
                                    <div style={{
                                        position: 'absolute',
                                        borderRadius: 'inherit',
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }} data-framer-background-image-wrapper="true">
                                        <img
                                            decoding="async"
                                            loading="lazy"
                                            sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w,https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png"
                                            alt=""
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 'inherit',
                                                objectPosition: 'center',
                                                objectFit: 'cover',
                                                imageRendering: 'auto'
                                            }}
                                        />
                                    </div>
                                    <div className="framer-1ykvh6">
                                        <div style={{
                                            position: 'absolute',
                                            borderRadius: 'inherit',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0
                                        }} data-framer-background-image-wrapper="true">
                                            <img
                                                decoding="async"
                                                loading="lazy"
                                                sizes="381px"
                                                srcSet="https://framerusercontent.com/images/YYZufOsaTDP8kRzuBHzBWf84nA.png?scale-down-to=512 512w,https://framerusercontent.com/images/YYZufOsaTDP8kRzuBHzBWf84nA.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/YYZufOsaTDP8kRzuBHzBWf84nA.png 2000w"
                                                src="https://framerusercontent.com/images/YYZufOsaTDP8kRzuBHzBWf84nA.png"
                                                alt=""
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 'inherit',
                                                    objectPosition: 'center',
                                                    objectFit: 'cover',
                                                    imageRendering: 'auto'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="framer-ugylku">
                                        <div className="framer-lanh82" data-border="true">
                                            <div className="framer-160h6j0-container">
                                                <div>
                                                    <iconify-icon
                                                        inline="true"
                                                        icon="mdi-light:arrange-send-to-back"
                                                        mode="svg"
                                                        style={{
                                                            fontSize: '49px',
                                                            verticalAlign: 'undefinedem',
                                                            color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}
                                                        rotate="0deg"
                                                        flip="none"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="2" r="1" fill="currentColor" />
                                                            <circle cx="21" cy="6" r="1" fill="currentColor" />
                                                            <circle cx="21" cy="17" r="1" fill="currentColor" />
                                                            <circle cx="12" cy="22" r="1" fill="currentColor" />
                                                            <path
                                                                fill="currentColor"
                                                                d="M21 8a2.006 2.006 0 0 1-2-2a1.94 1.94 0 0 1 .26-.96L14 2a2 2 0 0 1-1.01 1.73a1.95 1.95 0 0 1-1.98 0A2 2 0 0 1 10 2L4.74 5.04A1.94 1.94 0 0 1 5 6a2.006 2.006 0 0 1-2 2a2 2 0 0 1-.5-.07v7.14A2 2 0 0 1 3 15a2 2 0 0 1 1.5.69a2.2 2.2 0 0 1 .39.68A1.9 1.9 0 0 1 5 17a2 2 0 0 1-.58 1.41l3.84 2.21l1.78 1.03a1.3 1.3 0 0 1 .07-.28a.3.3 0 0 0 .02-.07a2 2 0 0 1 .12-.24c.01-.03.03-.06.04-.09c.05-.07.09-.14.14-.2c.03-.03.05-.06.08-.09a1.2 1.2 0 0 1 .16-.16a.5.5 0 0 1 .11-.1a2 2 0 0 1 .17-.11a1 1 0 0 1 .15-.09c.06-.03.11-.05.17-.08l.21-.06a1 1 0 0 1 .14-.04a1.8 1.8 0 0 1 .76 0a1 1 0 0 1 .14.04l.21.06c.06.03.11.05.17.08a1 1 0 0 1 .15.09a2 2 0 0 1 .17.11a.5.5 0 0 1 .11.1a1.2 1.2 0 0 1 .16.16c.03.03.05.06.08.09c.05.06.09.13.14.2c.01.03.03.06.04.09a2 2 0 0 1 .12.24a.3.3 0 0 0 .02.07a1.3 1.3 0 0 1 .07.28l1.78-1.03l3.84-2.21A2 2 0 0 1 19 17a1.9 1.9 0 0 1 .11-.63a2.2 2.2 0 0 1 .39-.68A2 2 0 0 1 21 15a2 2 0 0 1 .5.07V7.93A2 2 0 0 1 21 8m-9 5a1 1 0 1 1 1-1a1.003 1.003 0 0 1-1 1m7.5.3A4 4 0 0 0 17 17a3.6 3.6 0 0 0 .06.56l-2.47 1.42a4 4 0 0 0-1.59-.84v-3.32a3 3 0 1 0-2 0v3.32a4 4 0 0 0-1.59.84l-2.47-1.42A3.6 3.6 0 0 0 7 17a4 4 0 0 0-2.5-3.7V9.7A4 4 0 0 0 7 6.04L9.15 4.8a3.984 3.984 0 0 0 5.7 0L17 6.04a4 4 0 0 0 2.5 3.66Z"
                                                            />
                                                            <circle cx="3" cy="17" r="1" fill="currentColor" />
                                                            <circle cx="3" cy="6" r="1" fill="currentColor" />
                                                        </svg>
                                                    </iconify-icon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="framer-1anfzwa"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer"
                                        >
                                            <h3 style={{
                                                '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==',
                                                '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                                '--framer-font-size': '22px',
                                                '--framer-font-weight': '500',
                                                '--framer-letter-spacing': '-0.45px',
                                                '--framer-line-height': '28px',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                            }}
                                            className="framer-text"
                                            >
                                                Availability
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="framer-iai1hh" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-130ortm" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-1c2xwng"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: 0,
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer"
                                    >
                                        <p style={{
                                            '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                            '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                            '--framer-font-weight': '300',
                                            '--framer-line-height': '24px',
                                            '--framer-text-alignment': 'center',
                                            '--framer-text-color': 'rgb(161, 161, 170)'
                                        }}
                                        className="framer-text"
                                        >
                                            No matter where you are or in which part of the country you reside in, you can learn from anywhere.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div aria-label="feature" className="framer-q42dia" data-border="true" data-framer-name="Feature" name="Feature">
                                <div className="framer-1olhfm4" data-border="true" data-framer-name="Top" name="Top">
                                    <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                                        <img decoding="async" loading="lazy" sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w, https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png" alt=""
                                            style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                    </div>
                                    <div className="framer-e3qcey">
                                        <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                                            <img decoding="async" loading="lazy" sizes="381px"
                                                srcSet="https://framerusercontent.com/images/gs6Lao5K9GZWaQvC24QuKzVrIM.png?scale-down-to=512 512w, https://framerusercontent.com/images/gs6Lao5K9GZWaQvC24QuKzVrIM.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/gs6Lao5K9GZWaQvC24QuKzVrIM.png 2000w"
                                                src="https://framerusercontent.com/images/gs6Lao5K9GZWaQvC24QuKzVrIM.png" alt=""
                                                style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                                        </div>
                                    </div>
                                    <div className="framer-14m9xw1">
                                        <div className="framer-1v8dvik" data-border="true">
                                            <div className="framer-x3ai4l-container">
                                                <div><iconify-icon inline="true" icon="mdi-light:alarm-plus" mode="svg"
                                                    style={{ fontSize: '49px', verticalAlign: 'undefinedem', color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))', rotate: '0deg', flip: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z" /></svg></iconify-icon></div>
                                            </div>
                                        </div>
                                        <div className="framer-1b7vm2i"
                                            style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none' }}
                                            data-framer-component-type="RichTextContainer">
                                            <h3 style={{ '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==', '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif', '--framer-font-size': '22px', '--framer-font-weight': 500, '--framer-letter-spacing': '-0.45px', '--framer-line-height': '28px', '--framer-text-alignment': 'left', '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))' }}
                                                className="framer-text">Access Mentors</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="framer-1h2brbf" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-1798y50" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-ffvhvz"
                                        style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none' }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{ '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==', '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif', '--framer-font-weight': 300, '--framer-line-height': '24px', '--framer-text-alignment': 'center', '--framer-text-color': 'rgb(161, 161, 170)' }}
                                            className="framer-text">Throughout the Learning journey, you will have access to mentors who are influential leaders in the disruptive tech space.</p>
                                    </div>
                                </div>
                            </div>

                            <div aria-label="feature" className="framer-kuc0d3" data-border={true} data-framer-name="Feature" name="Feature">
                                <div className="framer-11r1zcv" data-border={true} data-framer-name="Top" name="Top">
                                    <div style={{
                                        position: 'absolute',
                                        borderRadius: 'inherit',
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }} data-framer-background-image-wrapper={true}>
                                        <img decoding="async" loading="lazy"
                                            sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w, https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png"
                                            alt=""
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 'inherit',
                                                objectPosition: 'center',
                                                objectFit: 'cover',
                                                imageRendering: 'auto'
                                            }} />
                                    </div>
                                    <div className="framer-hlibxw">
                                        <div style={{
                                            position: 'absolute',
                                            borderRadius: 'inherit',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0
                                        }} data-framer-background-image-wrapper={true}>
                                            <img decoding="async" loading="lazy"
                                                sizes="381px"
                                                srcSet="https://framerusercontent.com/images/6u3apyyGrZOA1Xqe19adppXaSl4.png?scale-down-to=512 512w, https://framerusercontent.com/images/6u3apyyGrZOA1Xqe19adppXaSl4.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/6u3apyyGrZOA1Xqe19adppXaSl4.png 2000w"
                                                src="https://framerusercontent.com/images/6u3apyyGrZOA1Xqe19adppXaSl4.png"
                                                alt=""
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 'inherit',
                                                    objectPosition: 'center',
                                                    objectFit: 'cover',
                                                    imageRendering: 'auto'
                                                }} />
                                        </div>
                                    </div>
                                    <div className="framer-1lv0ec2">
                                        <div className="framer-1ohcqwt" data-border={true}>
                                            <div className="framer-vwqnom-container">
                                                <div>
                                                    <iconify-icon inline={true} icon="mdi-light:console" mode="svg"
                                                        style={{
                                                            fontSize: '49px',
                                                            verticalAlign: 'undefinedem',
                                                            color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}
                                                        rotate="0deg"
                                                        flip="none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M4 12h16c0-3.73-2.56-6.87-6-7.75c-.14.99-1 1.75-2 1.75s-1.86-.76-2-1.75C6.56 5.13 4 8.27 4 12m8-10a10 10 0 0 1 10 10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2A10 10 0 0 1 12 2m1.5 15h-3l-.58 2l-.27 1h4.7l-.27-1zm1.5-2l1 3.5l.27.95l.08.55c0 1.1-.9 2-2 2h-4.7l-.48-.06a2.004 2.004 0 0 1-1.44-2.44l.27-1L9 15zm1-8a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M8 7a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2" />
                                                        </svg>
                                                    </iconify-icon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="framer-rj1v2t"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <h3 style={{
                                                '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==',
                                                '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                                '--framer-font-size': '22px',
                                                '--framer-font-weight': 500,
                                                '--framer-letter-spacing': '-0.45px',
                                                '--framer-line-height': '28px',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                            }}
                                            className="framer-text">
                                                Fun &amp; Easy
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="framer-qf797j" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-xyrlm9" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-1ru8t01"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: 0,
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                            '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                            '--framer-font-weight': 300,
                                            '--framer-line-height': '24px',
                                            '--framer-text-alignment': 'center',
                                            '--framer-text-color': 'rgb(161, 161, 170)'
                                        }}
                                        className="framer-text">
                                            Learn the basics and then proceed to intermediate level, from zero knowledge and skill to the deep dive of developing smart contracts.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div aria-label="feature" className="framer-19t12ib" data-border="true" data-framer-name="Feature" name="Feature">
                                <div className="framer-1g1xxae" data-border="true" data-framer-name="Top" name="Top">
                                    <div style={{
                                        position: 'absolute',
                                        borderRadius: 'inherit',
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }} data-framer-background-image-wrapper="true">
                                        <img decoding="async" loading="lazy"
                                            sizes="380px"
                                            srcSet="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png?scale-down-to=512 512w,https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png 777w"
                                            src="https://framerusercontent.com/images/m9K2orpiKTpyArFtPrdshgxB1Q.png" alt=""
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 'inherit',
                                                objectPosition: 'center',
                                                objectFit: 'cover',
                                                imageRendering: 'auto'
                                            }} />
                                    </div>
                                    <div className="framer-s12xfd">
                                        <div style={{
                                            position: 'absolute',
                                            borderRadius: 'inherit',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0
                                        }} data-framer-background-image-wrapper="true">
                                            <img decoding="async" loading="lazy"
                                                sizes="381px"
                                                srcSet="https://framerusercontent.com/images/I3gyBSI8AdYR56vr0AnaEaMdFs.png?scale-down-to=512 512w,https://framerusercontent.com/images/I3gyBSI8AdYR56vr0AnaEaMdFs.png?scale-down-to=1024 1024w,https://framerusercontent.com/images/I3gyBSI8AdYR56vr0AnaEaMdFs.png 2000w"
                                                src="https://framerusercontent.com/images/I3gyBSI8AdYR56vr0AnaEaMdFs.png" alt=""
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: 'inherit',
                                                    objectPosition: 'center',
                                                    objectFit: 'cover',
                                                    imageRendering: 'auto'
                                                }} />
                                        </div>
                                    </div>
                                    <div className="framer-dfbrow">
                                        <div className="framer-cdleur" data-border="true">
                                            <div className="framer-z741m5-container">
                                                <div>
                                                    <iconify-icon inline="true" icon="mdi-light:flask-empty" mode="svg"
                                                        style={{
                                                            fontSize: '49px',
                                                            verticalAlign: 'undefinedem',
                                                            color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}
                                                        rotate="0deg" flip="none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="2.197" fill="currentColor" />
                                                            <path fill="currentColor" d="M21.63441 6.43671c-.70909-1.22723-2.41155-1.73142-4.79628-1.42354c-.30258.03942-.61354.09379-.92927.15769C15.00856 2.619 13.6066 1 12 1C10.39089 1 8.98713 2.62441 8.087 5.1834c-2.7384-.54268-4.90657-.15669-5.72186 1.25331C1.55256 7.84376 2.2947 9.90626 4.12193 12C2.2947 14.09374 1.55256 16.15624 2.3651 17.56329c.58143 1.00732 1.85 1.49542 3.52453 1.49542a11.47535 11.47535 0 0 0 2.197-.24305C8.98673 21.37518 10.39069 23 12 23c1.60658 0 3.00854-1.619 3.90884-4.17086c.31573.0639.62669.11827.92927.15769a10.18235 10.18235 0 0 0 1.297.088c1.70461 0 2.92647-.52028 3.49932-1.51151c.81254-1.407.07053-3.46955-1.75643-5.56329C21.70494 9.90626 22.447 7.84376 21.63441 6.43671ZM16.9851 6.13956a9.0809 9.0809 0 0 1 1.15965-.08046c1.26048 0 2.14979.32826 2.507.94617c.50426.87335-.06645 2.44138-1.55187 4.16777a20.50554 20.50554 0 0 0-2.30139-1.95281a19.9752 19.9752 0 0 0-.5471-2.93612C16.49539 6.23744 16.7503 6.17013 16.9851 6.13956Zm-3.07236 9.17417c-.64647.37332-1.28408.70346-1.90695.9935c-.63936-.29755-1.2812-.62534-1.919-.9935c-.64888-.37459-1.25525-.76326-1.81959-1.15917c-.06229-.6861-.09688-1.405-.09688-2.15456s.03459-1.46846.09688-2.15456c.56434-.39591 1.17071-.78458 1.81959-1.15917c.63487-.36648 1.27383-.69333 1.91024-.98982c.62668.29132 1.26511.61409 1.91573.98982c.64908.37472 1.25572.76346 1.82019 1.15958c.06222.686.09682 1.40477.09682 2.15415s-.0346 1.46813-.09682 2.15415C15.16846 14.55027 14.56182 14.939 13.91274 15.31373Zm1.628.3351a17.87565 17.87565 0 0 1-.39136 1.82408a18.46424 18.46424 0 0 1-1.76012-.58257c.36293-.18713.72713-.38337 1.092-.594C14.8457 16.086 15.1977 15.86928 15.54078 15.64883Zm-4.92407 1.24372A18.41329 18.41329 0 0 1 8.851 17.474a17.86018 17.86018 0 0 1-.39176-1.82549c.34328.22058.69541.43734 1.06.64787C9.88355 16.50677 10.24989 16.70348 10.61671 16.89255ZM7.07428 13.25036A18.3863 18.3863 0 0 1 5.67548 12a18.38878 18.38878 0 0 1 1.3988-1.25043c-.02005.41033-.03252.82636-.03252 1.25043S7.05423 12.8401 7.07428 13.25036Zm1.385-4.89886a17.86727 17.86727 0 0 1 .391-1.82227a18.22228 18.22228 0 0 1 1.76937.57681c-.36775.18947-.735.38659-1.10031.59759C9.15468 7.91416 8.80255 8.13092 8.45927 8.3515Zm4.93057-1.242a18.48842 18.48842 0 0 1 1.75958-.58237a17.87565 17.87565 0 0 1 .39136 1.82408c-.34308-.22045-.69508-.43715-1.05948-.64754C14.11663 7.4931 13.75263 7.29652 13.38984 7.10946ZM16.92577 10.75A18.40125 18.40125 0 0 1 18.324 12a18.38809 18.38809 0 0 1-1.39826 1.25c.02-.41013.03251-.826.03251-1.25S16.94581 11.1601 16.92577 10.75ZM12 2.12854c.99773 0 2.05613 1.23433 2.80746 3.31044a20.80159 20.80159 0 0 0-2.8094 1.01141A20.51935 20.51935 0 0 0 9.19055 5.44481C9.94208 3.36508 11.00163 2.12854 12 2.12854ZM3.34774 7.00527c.35133-.60825 1.2519-.93437 2.52043-.93437a10.26212 10.26212 0 0 1 1.88362.20148A19.96778 19.96778 0 0 0 7.20147 9.2205a20.48874 20.48874 0 0 0-2.30166 1.95288C3.41412 9.44692 2.84341 7.87869 3.34774 7.00527Zm0 9.98946c-.50433-.87342.06638-2.44165 1.55207-4.16811A20.50145 20.50145 0 0 0 7.20147 14.7795a19.94422 19.94422 0 0 0 .5518 2.95356C5.50578 18.162 3.85468 17.87245 3.34774 16.99473ZM12 21.87146c-.99866 0-2.05847-1.23708-2.81007-3.31775a20.44828 20.44828 0 0 0 2.81155-1.00255a20.80209 20.80209 0 0 0 2.806 1.00979C14.05615 20.63706 12.99775 21.87146 12 21.87146Zm8.65175-4.87673c-.45914.79277-1.79257 1.10923-3.66667.86571c-.2348-.03057-.48971-.09788-.73369-.14455a19.97619 19.97619 0 0 0 .5471-2.93619A20.50419 20.50419 0 0 0 19.0999 12.827C20.58532 14.55335 21.156 16.12138 20.65177 16.99473Z" />
                                                            <circle cx="-0.5" cy="2" r="1.5" fill="currentColor">
                                                                <animateMotion dur="2s"
                                                                    path="M14.75 14.1471C12.2277 15.6034 9.69019 16.4332 7.6407 16.6145C5.54599 16.7998 4.15833 16.3018 3.62324 15.375C3.08815 14.4482 3.35067 12.9974 4.55852 11.276C5.74031 9.59178 7.72768 7.80915 10.25 6.35289C12.7723 4.89662 15.3098 4.06682 17.3593 3.88549C19.454 3.70016 20.8417 4.1982 21.3768 5.125C21.9118 6.0518 21.6493 7.50256 20.4415 9.22397C19.2597 10.9082 17.2723 12.6909 14.75 14.1471Z"
                                                                    repeatCount="indefinite" />
                                                            </circle>
                                                        </svg>
                                                    </iconify-icon>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="framer-1uj1xo4"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <h3 style={{
                                                '--font-selector': 'R0Y7R2VvbG9naWNhLTUwMA==',
                                                '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                                '--framer-font-size': '22px',
                                                '--framer-font-weight': '500',
                                                '--framer-letter-spacing': '-0.45px',
                                                '--framer-line-height': '28px',
                                                '--framer-text-alignment': 'left',
                                                '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                            }} className="framer-text">Experimentals</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="framer-1ju76qo" data-framer-name="Shadow" name="Shadow"></div>
                                <div className="framer-16nh8iv" data-framer-name="Text Container" name="Text Container">
                                    <div className="framer-1qikig5"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: 0,
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                            '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                            '--framer-font-weight': '300',
                                            '--framer-line-height': '24px',
                                            '--framer-text-alignment': 'center',
                                            '--framer-text-color': 'rgb(161, 161, 170)'
                                        }} className="framer-text">Unlock cutting-edge capabilities with our innovative experimental toolkit.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="framer-1g69kwy">
                            <div className="framer-1er76e9-container">
                                <div className="framer-7j5fb framer-1j1n4kr framer-v-1j1n4kr"
                                    data-framer-name="Variant 1"
                                    style={{
                                        backdropFilter: 'blur(5px)',
                                        backgroundColor: 'var(--token-16cecdcd-c5a5-4884-abaa-e0abd93e3514, rgba(255, 255, 255, 0.1))',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        WebkitBackdropFilter: 'blur(5px)'
                                    }}>
                                    <div className="framer-y7w853-container">
                                        <div style={{ display: 'contents' }}></div>
                                    </div>
                                    <div className="framer-4b6tpa"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: '0',
                                            '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                            '--framer-link-text-color': 'rgb(0, 153, 255)',
                                            '--framer-link-text-decoration': 'underline',
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                            '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                            '--framer-line-height': '1.5em',
                                            '--framer-text-alignment': 'left',
                                            '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                        }} className="framer-text">Continuous Innovation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="framer-78vs76-container">
                                <div className="framer-DWYze framer-wacn66 framer-v-wacn66" data-framer-name="Variant 1"
                                    style={{
                                        backdropFilter: 'blur(5px)',
                                        backgroundColor: 'var(--token-16cecdcd-c5a5-4884-abaa-e0abd93e3514, rgba(255, 255, 255, 0.1))',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        WebkitBackdropFilter: 'blur(5px)'
                                    }}>
                                    <div className="framer-zltkzo-container">
                                        <div style={{ display: 'contents' }}></div>
                                    </div>
                                    <div className="framer-1f9sdtw"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: '0',
                                            '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                            '--framer-link-text-color': 'rgb(0, 153, 255)',
                                            '--framer-link-text-decoration': 'underline',
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                            '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                            '--framer-line-height': '1.5em',
                                            '--framer-text-alignment': 'left',
                                            '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                        }} className="framer-text">
                                            Dedicated Support
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="framer-1qlxbi9-container">
                                <div className="framer-A5Ldq framer-1er97h0 framer-v-1er97h0"
                                    data-framer-name="Variant 1"
                                    style={{
                                        backdropFilter: 'blur(5px)',
                                        backgroundColor: 'var(--token-16cecdcd-c5a5-4884-abaa-e0abd93e3514, rgba(255, 255, 255, 0.1))',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        WebkitBackdropFilter: 'blur(5px)'
                                    }}>
                                    <div className="framer-cgvxqo-container">
                                        <div style={{ display: 'contents' }}></div>
                                    </div>
                                    <div className="framer-115gowv"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: '0',
                                            '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                            '--framer-link-text-color': 'rgb(0, 153, 255)',
                                            '--framer-link-text-decoration': 'underline',
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                            '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                            '--framer-line-height': '1.5em',
                                            '--framer-text-alignment': 'left',
                                            '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                        }}
                                        className="framer-text">
                                            Positive Client Experiences
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="framer-txtn5i-container">
                                <div className="framer-ApmUF framer-6gllh3 framer-v-6gllh3"
                                    data-framer-name="Variant 1"
                                    style={{
                                        backdropFilter: 'blur(5px)',
                                        backgroundColor: 'var(--token-16cecdcd-c5a5-4884-abaa-e0abd93e3514, rgba(255, 255, 255, 0.1))',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        WebkitBackdropFilter: 'blur(5px)'
                                    }}
                                    >
                                    <div className="framer-w1r94z-container">
                                        <div style={{ display: 'contents' }}></div>
                                    </div>
                                    <div className="framer-ggf9xe"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: '0',
                                            '--extracted-r6o4lv': 'var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255))',
                                            '--framer-link-text-color': 'rgb(0, 153, 255)',
                                            '--framer-link-text-decoration': 'underline',
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            '--font-selector': 'RlM7U2F0b3NoaS1yZWd1bGFy',
                                            '--framer-font-family': '"Satoshi", "Satoshi Placeholder", sans-serif',
                                            '--framer-line-height': '1.5em',
                                            '--framer-text-alignment': 'left',
                                            '--framer-text-color': 'var(--extracted-r6o4lv, var(--token-a3567fc0-2c6f-4fa8-ac8f-89ddd158e98d, rgb(255, 255, 255)))'
                                        }}
                                        className="framer-text">Commitment to Excellence</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="framer-176haw3" data-framer-name="Spacer" name="Spacer"></div>

                    <div className="framer-9bmvb0"
                            style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <h2 style={{
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '64px',
                                '--framer-font-weight': '600',
                                '--framer-letter-spacing': '-0.04em',
                                '--framer-line-height': '97px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'transparent',
                                backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 94.1044%)',
                                backgroundClip: 'text', 
                                WebkitBackgroundClip: 'text',
                                color: 'transparent' 
                            }}
                            className="framer-text">
                                <span data-text-fill="true" className="framer-text">Our Roadmap</span>
                            </h2>
                        </div>

                    <div class="framer-sjhb67" data-framer-name="Frame 1116606589" name="Frame 1116606589">
                        <div class="framer-10kbskc" data-framer-name="Div [mx-auto]" name="Div [mx-auto]">
                            <div class="framer-133kfbi" data-framer-name="Frame 1116606589" name="Frame 1116606589">
                                <div class="framer-17ffysw" data-framer-name="Div [flex-[4]]" name="Div [flex-[4]]">
                                    <div className="framer-ajvuz8" data-framer-name="Paragraph" name="Paragraph">
                                        <div className="framer-6u7phv" data-framer-name="and tell us more!"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <p style={{
                                                fontSize: '12.9px',
                                                letterSpacing: '0px',
                                                lineHeight: '19.5px',
                                                color: 'rgb(144, 144, 144)'
                                            }}
                                            className="framer-text"> and tell us more!</p>
                                        </div>
                                        <div className="framer-lwjixh" data-framer-name="Link [underline]" name="Link [underline]">
                                            <div className="framer-1l5vv6" data-framer-name="Join our Discord"
                                                style={{
                                                    outline: 'none',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    transform: 'none'
                                                }}
                                                data-framer-component-type="RichTextContainer">
                                                <p style={{
                                                    fontSize: '12.9px',
                                                    letterSpacing: '0px',
                                                    lineHeight: '19.5px',
                                                    color: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))',
                                                    textDecoration: 'underline'
                                                }}
                                                className="framer-text">Join our Discord</p>
                                            </div>
                                        </div>
                                        <div className="framer-1eutkmf" data-framer-name="Have some feature request?"
                                            style={{
                                                outline: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                transform: 'none'
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <p style={{
                                                fontSize: '12.9px',
                                                letterSpacing: '0px',
                                                lineHeight: '19.5px',
                                                color: 'rgb(144, 144, 144)'
                                            }}
                                            className="framer-text">Have some feature request? </p>
                                        </div>
                                    </div>

                                    <div className="framer-g12gt2" data-framer-name="Paragraph" name="Paragraph">
                                        <div className="framer-mq4jqm" data-framer-name="See the milestones that brought us here,"
                                            style={{
                                                outline: "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transform: "none"
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <p style={{
                                                fontSize: "17.9px",
                                                letterSpacing: "0px",
                                                lineHeight: "27px",
                                                color: "rgb(144, 144, 144)"
                                            }}
                                            className="framer-text">See the milestones that brought us here, </p>
                                        </div>
                                        <div className="framer-yb3arh"
                                            data-framer-name="and get a sneak peak of what&#x2019;s next."
                                            style={{
                                                outline: "none",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transform: "none"
                                            }}
                                            data-framer-component-type="RichTextContainer">
                                            <p style={{
                                                fontSize: "17.9px",
                                                letterSpacing: "0px",
                                                lineHeight: "27px",
                                                color: "rgb(144, 144, 144)"
                                            }}
                                            className="framer-text">and get a sneak peak of what&#x2019;s next.</p>
                                        </div>
                                    </div>
                                    <div className="framer-5gdb0k" data-framer-name="Our Roadmap"
                                        style={{
                                            outline: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            transform: "none"
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <p style={{
                                            fontFamily: `"Inter", "Inter Placeholder", sans-serif`,
                                            fontSize: "32.4px",
                                            fontWeight: 700,
                                            letterSpacing: "0px",
                                            lineHeight: "38.4px",
                                            color: "var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))"
                                        }}
                                        className="framer-text">Our Roadmap</p>
                                    </div>
                                </div>
                                <div className="framer-1fvnnjt" data-framer-name="Picture [flex-[10]]" name="Picture [flex-[10]]">
                                    <div style={{
                                        position: 'absolute',
                                        borderRadius: 'inherit',
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }} data-framer-background-image-wrapper="true">
                                        <img
                                            decoding="async"
                                            loading="lazy"
                                            sizes="883px"
                                            srcSet="https://framerusercontent.com/images/765sO4ARBOTt9JMCkZWr85UdpM.svg?scale-down-to=512 512w,https://framerusercontent.com/images/765sO4ARBOTt9JMCkZWr85UdpM.svg 883w"
                                            src="https://framerusercontent.com/images/765sO4ARBOTt9JMCkZWr85UdpM.svg"
                                            alt=""
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 'inherit',
                                                objectPosition: 'center',
                                                objectFit: 'contain',
                                                imageRendering: 'auto'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="framer-rzmfx7" data-framer-name="Spacer" name="Spacer"></div>

                    <div class="framer-1cfa4gp" data-framer-name="Logos" id="references" name="Logos">
                    <div className="framer-9bmvb0"
                            style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none'
                            }}
                            data-framer-component-type="RichTextContainer">
                            <h2 style={{
                                '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw',
                                '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                '--framer-font-size': '64px',
                                '--framer-font-weight': '600',
                                '--framer-letter-spacing': '-0.04em',
                                '--framer-line-height': '97px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'transparent',
                                backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 94.1044%)',
                                backgroundClip: 'text', 
                                WebkitBackgroundClip: 'text',
                                color: 'transparent' 
                            }}
                            className="framer-text">
                                <span data-text-fill="true" className="framer-text">Leading Brands Trust Us</span>
                            </h2>
                        </div>

                        <div class="framer-1yq94l9" data-framer-name="Spacer" name="Spacer"></div>

                        <div class="framer-1oj1k3b-container">
                            <ul class="logogrid">
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/fLHyXnMV/radiyal.png" class="logogrid__img" alt="Coca Cola" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/W3JpDDYH/acme.png" class="logogrid__img" alt="Google" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/HLnkgvwH/amara.png" class="logogrid__img" alt="AirBnB" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/hGtfGtqk/code-lab.png" class="logogrid__img" alt="Spotify" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/CM3B40j8/fox-hub.png" class="logogrid__img" alt="Guinness" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/R0g4p7y8/hex-lab.png" class="logogrid__img" alt="Audi" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/QtVs2BrM/hexa.png" class="logogrid__img" alt="Nike" />
                                </li>
                                <li class="logogrid__item">
                                    <img src="https://i.postimg.cc/LsD8KKYx/lightai.png" class="logogrid__img" alt="Netflix" />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="framer-1slapxm" data-framer-name="Spacer" name="Spacer"></div>

                    <section className="framer-1b5bmfx" data-border="true" data-framer-name="Stats" name="Stats">
                        <div style={{ position: 'absolute', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}
                            data-framer-background-image-wrapper="true">
                            <img decoding="async" loading="lazy" sizes="1200px"
                                srcSet="https://framerusercontent.com/images/77mywPgBpwfS8iBavjiNr5cSRO0.png?scale-down-to=512 512w, https://framerusercontent.com/images/77mywPgBpwfS8iBavjiNr5cSRO0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/77mywPgBpwfS8iBavjiNr5cSRO0.png 1244w"
                                src="https://framerusercontent.com/images/77mywPgBpwfS8iBavjiNr5cSRO0.png"
                                alt="A gradient background"
                                style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} />
                        </div>
                        <div className="framer-1gz4jze"
                            style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none' }}
                            data-framer-component-type="RichTextContainer">
                            <h5 style={{
                                '--font-selector': 'R0Y7R2VvbG9naWNhLXJlZ3VsYXI=',
                                '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                '--framer-font-size': '28px',
                                '--framer-letter-spacing': '0.5em',
                                '--framer-line-height': '58px',
                                '--framer-text-alignment': 'center',
                                '--framer-text-color': 'rgb(235, 235, 235)',
                                '--framer-text-transform': 'uppercase',
                                backgroundImage: 'linear-gradient(0deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0.23) 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent'
                            }} className="framer-text">
                                Our Values
                            </h5>
                        </div>

                        <div className="framer-1qi98t5" data-framer-name="Spacer" name="Spacer"></div>

                        <div className="framer-1c8tbe7" data-framer-name="Shiny Line" name="Shiny Line"></div>
                        
                        <div className="framer-aacje7" data-framer-name="Spacer" name="Spacer"></div>
                        
                        <div className="framer-1370bvb" data-framer-name="Metrics" name="Metrics">
                            <div className="framer-yk3j59" data-framer-name="Container" name="Container">
                                <div className="framer-1lfindj" data-framer-name="More cost effective"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                        '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                        '--framer-font-size': '18px',
                                        '--framer-font-weight': 300,
                                        '--framer-line-height': '27px',
                                        '--framer-text-alignment': 'center',
                                        '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                    }} className="framer-text">Innovation</p>
                                </div>
                            </div>
                            <div className="framer-1atpwj8" data-framer-name="Seperator" name="Seperator"></div>
                            <div className="framer-elterw" data-framer-name="Container" name="Container">
                                <div className="framer-fsrrie" data-framer-name="Faster ramp-up"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                        '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                        '--framer-font-size': '18px',
                                        '--framer-font-weight': 300,
                                        '--framer-line-height': '27px',
                                        '--framer-text-alignment': 'center',
                                        '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                    }} className="framer-text">Creativity</p>
                                </div>
                            </div>
                            <div className="framer-1pgmtl4" data-framer-name="Seperator" name="Seperator"></div>
                            <div className="framer-ewoapy" data-framer-name="Container" name="Container">
                                <div className="framer-1q8jijc" data-framer-name="More output"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                        '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                        '--framer-font-size': '18px',
                                        '--framer-font-weight': 300,
                                        '--framer-line-height': '27px',
                                        '--framer-text-alignment': 'center',
                                        '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                    }} className="framer-text">Teamwork</p>
                                </div>
                            </div>
                            <div className="framer-1rilcq2" data-framer-name="Seperator" name="Seperator"></div>
                            <div className="framer-tk4tnk" data-framer-name="Container" name="Container">
                                <div className="framer-1xt3hml" data-framer-name="More output"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7R2VvbG9naWNhLTMwMA==',
                                        '--framer-font-family': '"Geologica", "Geologica Placeholder", sans-serif',
                                        '--framer-font-size': '18px',
                                        '--framer-font-weight': 300,
                                        '--framer-line-height': '27px',
                                        '--framer-text-alignment': 'center',
                                        '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                    }} className="framer-text">Diversity</p>
                                </div>
                            </div>
                            <div className="framer-1vvc16f" data-framer-name="Seperator" name="Seperator"></div>
                        </div>
                    </section>

                    <div class="framer-dm3qt9" data-framer-name="Spacer" name="Spacer"></div>

                    <div className="framer-neishh" id="testimonials" style={{
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexShrink: 0,
                        transform: 'none',
                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNjAw',
                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                        '--framer-font-size': '64px',
                        '--framer-font-weight': '600',
                        '--framer-letter-spacing': '-0.04em',
                        '--framer-line-height': '97px',
                        '--framer-text-alignment': 'center',
                        '--framer-text-color': 'rgb(235, 235, 235)'
                    }} data-framer-component-type="RichTextContainer">
                        <h2 className="framer-text"><span data-text-fill="true" style={{
                            backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 91.1044%)'
                        }} className="framer-text">Voices of Success</span></h2>
                    </div>
                    <div className="framer-rva7ap" style={{
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexShrink: 0,
                        transform: 'none',
                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                        '--framer-font-size': '18px',
                        '--framer-letter-spacing': '0.02em',
                        '--framer-line-height': '27.9px',
                        '--framer-text-alignment': 'center',
                        '--framer-text-color': 'rgb(179, 179, 179)'
                    }} data-framer-component-type="RichTextContainer">
                        <p className="framer-text">Discover what our users say about the transformative impact of our platform.</p>
                    </div>

                    <div class="framer-vtk5or" data-framer-name="Spacer" name="Spacer"></div>

                    {/* TestimonialSlider */}
                    <div className="testimonial-container">
                        <section className="creative-testimonial--slider">
                            <div className="testimonial-inner" style={{ backgroundImage: `url(https://imgpanda.com/upload/ib/2Tgg58L106.png)` }}>
                                <div className="testimonial-row">
                                    <div className="testimonial-wrap">
                                        <div className="swiper-container">
                                            <div className="swiper-wrapper">
                                                {/* Slide 1 */}
                                                <div className="swiper-slide">
                                                    <div className="swiper-slide--inner">
                                                        <div className="slide-avatar">
                                                            <img src="https://imgpanda.com/upload/ib/3T9Coa4eFQ.png" alt="" />
                                                        </div>
                                                        <div className="testimonial-detail">
                                                            <p>"The courses at Abya University have been instrumental in advancing my career in blockchain technology. The practical projects and expert guidance provided me with the confidence and skills needed to excel in this field."</p>
                                                            <span>Peter Kyale, Blockchain Developer</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Slide 2 */}
                                                <div className="swiper-slide">
                                                    <div className="swiper-slide--inner">
                                                        <div className="slide-avatar">
                                                            <img src="https://imgpanda.com/upload/ib/EG2hj3Ch4z.png" alt="" />
                                                        </div>
                                                        <div className="testimonial-detail">
                                                            
                                                            <p>"Abya University's LMS offers a comprehensive and engaging learning experience. The community support and resources available have been invaluable in my learning journey."</p>
                                                            <span>Matthew taylor, Entrepreneur</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Slide 3 */}
                                                <div className="swiper-slide">
                                                    <div className="swiper-slide--inner">
                                                        <div className="slide-avatar">
                                                            <img src="https://imgpanda.com/upload/ib/CEnecSuafy.png" alt="" />
                                                        </div>
                                                        <div className="testimonial-detail">
                                                           
                                                            <p>"Abya University's LMS offers a comprehensive and engaging learning experience. The community support and resources available have been invaluable in my learning journey."</p>
                                                            <span>Leonel mooney, Software Engineer</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-button-next slide-btns"></div>
                                            <div className="swiper-button-prev slide-btns"></div>
                                        </div>
                                    </div>

                                    <div className="framer-12tambw"
                                        style={{
                                            outline: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            marginBottom: "40px",
                                            flexShrink: 0,
                                            transform: "none",
                                            fontFamily: `"Inter", "Inter Placeholder", sans-serif`,
                                            fontSize: "28px",
                                            fontWeight: 500,
                                            lineHeight: "1.4em",
                                            color: "rgb(153, 153, 153)",
                                            '--font-selector': 'SW50ZXItTWVkaXVt',
                                            '--framer-font-size': '28px',
                                            '--framer-font-weight': '500',
                                            '--framer-line-height': '1.4em',
                                            '--framer-text-alignment': 'center',
                                            '--framer-text-color': 'rgb(153, 153, 153)'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <h2 className="framer-text">Awesome Integrations!</h2>
                                    </div>

                                    {/* Company details */}
                                    <div className="company-details--row">
                                        <div className="company-box">
                                            <div className="company-box-inner">
                                                <div className="company-box-top">
                                                    <center><img src="https://imgpanda.com/upload/ib/4mChImfZu3.png" alt="Company Name" /></center>
                                                </div>
                                                <div className="company-box-bottom">
                                                    <span>Project management - <strong>75% Growth</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-box">
                                            <div className="company-box-inner">
                                                <div className="company-box-top">
                                                    <center><img src="https://imgpanda.com/upload/ib/HT16vu2U3Y.png" alt="Company Name" /></center>
                                                </div>
                                                <div className="company-box-bottom">
                                                    <span>Secure storage - <strong>95% Growth</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="company-box">
                                            <div className="company-box-inner">
                                                <div className="company-box-top">
                                                    <center><img src="https://imgpanda.com/upload/ib/HF1zj1kEys.png" alt="Company Name" /></center>
                                                </div>
                                                <div className="company-box-bottom">
                                                    <span>Team management - <strong>55% Growth</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="framer-12kovf6" data-framer-name="Spacer" name="Spacer"></div>

                    <div className="framer-mqc7l5" style={{
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        flexShrink: 0,
                        transform: 'none'
                    }} 
                    data-framer-component-type="RichTextContainer">
                        <h2 style={{
                            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                            fontSize: '64px',
                            fontWeight: 600,
                            letterSpacing: '-0.04em',
                            lineHeight: '97px',
                            textAlign: 'center',
                            color: 'rgb(235, 235, 235)'
                        }} className="framer-text">
                            <span data-text-fill="true" style={{
                                backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 91.1044%)'
                            }} className="framer-text">From Our Blog</span>
                        </h2>
                    </div>

                    <div className="framer-1fpcm4c"
                        style={{
                            outline: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            flexShrink: 0,
                            transform: "none",
                            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                            fontSize: "18px",
                            letterSpacing: "0.02em",
                            lineHeight: "27.9px",
                            textAlign: "center",
                            color: "rgb(179, 179, 179)"
                        }}
                    >
                        <p className="framer-text">Discover what our users say about the transformative impact of our tool.</p>
                    </div>

                    <div class="framer-1pbr6n0" data-framer-name="Spacer" name="Spacer"></div>

                    <section aria-label="Success story articles" className="framer-rtxwb8"
                        data-framer-name="Success Stories"
                        name="Success Stories"
                        style={{
                            opacity: 1,
                            transform: "perspective(1200px) translateX(0px) translateY(20px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0)"
                        }}>
                        <a className="framer-wk4igx framer-13nqg0n" data-framer-name="Item" name="Item" href="./">
                            
                            <div className="framer-d91a1m" data-framer-name="Image Container" name="Image Container">
                                <div className="framer-vskvfp" data-framer-name="Image [object-cover]" name="Image [object-cover]">
                                    <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                        data-framer-background-image-wrapper="true">
                                        <img
                                            decoding="async"
                                            loading="lazy"
                                            sizes="282px"
                                            srcSet="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg?scale-down-to=512 512w, https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg 563w"
                                            src="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg"
                                            alt=""
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "inherit",
                                                objectPosition: "center",
                                                objectFit: "contain",
                                                imageRendering: "auto"
                                            }}
                                        />
                                    </div>
                                    <div className="framer-1948sk5" data-framer-name="web5 1" name="web5 1">
                                        <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                            data-framer-background-image-wrapper="true">
                                            <img
                                                decoding="async"
                                                loading="lazy"
                                                sizes="563px"
                                                srcSet="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=512 512w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=2048 2048w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png 2252w"
                                                src="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png"
                                                alt=""
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "inherit",
                                                    objectPosition: "center",
                                                    objectFit: "fill",
                                                    imageRendering: "auto"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="framer-83wyc5" data-framer-name="Post" name="Post">
                                <div className="framer-16ee2at" data-framer-name="Title"
                                    style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none', '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', '--framer-font-size': '18px', '--framer-font-weight': 500, '--framer-letter-spacing': '0.02em', '--framer-line-height': '28.2px', '--framer-text-color': 'rgb(255, 255, 255)' }}
                                    data-framer-component-type="RichTextContainer">
                                    <h5 className="framer-text">Snippet: Discover how blockchain technology is revolutionizing the education sector.</h5>
                                </div>

                                <div className="framer-ew5l8a" data-framer-name="Spacer" name="Spacer"></div>
                                <div className="framer-l1e3m2" data-border="true"
                                    id="the-rise-of-ai-in-marketing-a-game-changer-copy-l1e3m2" tabIndex={0}>
                                    <div className="framer-1t5ndzw" data-framer-name="Title"
                                        style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none', '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', '--framer-font-size': '18px', '--framer-font-weight': 500, '--framer-letter-spacing': '0.02em', '--framer-line-height': '28.2px', '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))' }}
                                        data-framer-component-type="RichTextContainer">
                                        <h5 className="framer-text">Read More</h5>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a className="framer-wk4igx framer-13nqg0n" data-framer-name="Item" name="Item" href="./">
                        <div className="framer-d91a1m" data-framer-name="Image Container" name="Image Container">
                                <div className="framer-vskvfp" data-framer-name="Image [object-cover]" name="Image [object-cover]">
                                    <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                        data-framer-background-image-wrapper="true">
                                        <img
                                            decoding="async"
                                            loading="lazy"
                                            sizes="282px"
                                            srcSet="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg?scale-down-to=512 512w, https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg 563w"
                                            src="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg"
                                            alt=""
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "inherit",
                                                objectPosition: "center",
                                                objectFit: "contain",
                                                imageRendering: "auto"
                                            }}
                                        />
                                    </div>
                                    <div className="framer-1948sk5" data-framer-name="web5 1" name="web5 1">
                                        <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                            data-framer-background-image-wrapper="true">
                                            <img
                                                decoding="async"
                                                loading="lazy"
                                                sizes="563px"
                                                srcSet="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=512 512w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=2048 2048w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png 2252w"
                                                src="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png"
                                                alt=""
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "inherit",
                                                    objectPosition: "center",
                                                    objectFit: "fill",
                                                    imageRendering: "auto"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="framer-83wyc5" data-framer-name="Post" name="Post">
                                <div className="framer-16ee2at" data-framer-name="Title"
                                    style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none', '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', '--framer-font-size': '18px', '--framer-font-weight': 500, '--framer-letter-spacing': '0.02em', '--framer-line-height': '28.2px', '--framer-text-color': 'rgb(255, 255, 255)' }}
                                    data-framer-component-type="RichTextContainer">
                                    <h5 className="framer-text">Snippet: Stay updated with the latest trends and predictions in the blockchain industry.</h5>
                                </div>
                                <div className="framer-ew5l8a" data-framer-name="Spacer" name="Spacer"></div>
                                <div className="framer-l1e3m2" data-border="true"
                                    id="optimizing-business-processes-with-api-management-a-strategic-approach-l1e3m2" tabIndex="0">
                                    <div className="framer-1t5ndzw" data-framer-name="Title"
                                        style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, transform: 'none', '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw', '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif', '--framer-font-size': '18px', '--framer-font-weight': 500, '--framer-letter-spacing': '0.02em', '--framer-line-height': '28.2px', '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))' }}
                                        data-framer-component-type="RichTextContainer">
                                        <h5 className="framer-text">Read More</h5>
                                    </div>
                                </div>
                            </div>
                        </a>


                        <a className="framer-wk4igx framer-13nqg0n" data-framer-name="Item" name="Item" href="./">
                            <div className="framer-d91a1m" data-framer-name="Image Container" name="Image Container">
                            <div className="framer-d91a1m" data-framer-name="Image Container" name="Image Container">
                                <div className="framer-vskvfp" data-framer-name="Image [object-cover]" name="Image [object-cover]">
                                    <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                        data-framer-background-image-wrapper="true">
                                        <img
                                            decoding="async"
                                            loading="lazy"
                                            sizes="282px"
                                            srcSet="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg?scale-down-to=512 512w, https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg 563w"
                                            src="https://framerusercontent.com/images/wHaKWNpKNlOTUI3nVnm5PuonUG4.jpg"
                                            alt=""
                                            style={{
                                                display: "block",
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "inherit",
                                                objectPosition: "center",
                                                objectFit: "contain",
                                                imageRendering: "auto"
                                            }}
                                        />
                                    </div>
                                    <div className="framer-1948sk5" data-framer-name="web5 1" name="web5 1">
                                        <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }}
                                            data-framer-background-image-wrapper="true">
                                            <img
                                                decoding="async"
                                                loading="lazy"
                                                sizes="563px"
                                                srcSet="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=512 512w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png?scale-down-to=2048 2048w, https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png 2252w"
                                                src="https://framerusercontent.com/images/xOkqFTHPfITGonnpieI79H95Fqg.png"
                                                alt=""
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "inherit",
                                                    objectPosition: "center",
                                                    objectFit: "fill",
                                                    imageRendering: "auto"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="framer-83wyc5" data-framer-name="Post" name="Post">
                                <div className="framer-16ee2at" data-framer-name="Title"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <h5 style={{
                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        '--framer-font-size': '18px',
                                        '--framer-font-weight': '500',
                                        '--framer-letter-spacing': '0.02em',
                                        '--framer-line-height': '28.2px',
                                        '--framer-text-color': 'rgb(255, 255, 255)'
                                    }} className="framer-text">
                                        Snippet: A beginner's guide to understanding and creating smart contracts on the Ethereum blockchain.
                                    </h5>
                                </div>
                                <div className="framer-ew5l8a" data-framer-name="Spacer" name="Spacer"></div>
                                <div className="framer-l1e3m2" data-border="true"
                                    id="demystifying-api-management-a-comprehensive-guide-for-beginners-l1e3m2" tabIndex="0">
                                    <div className="framer-1t5ndzw" data-framer-name="Title"
                                        style={{
                                            outline: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            flexShrink: 0,
                                            transform: 'none'
                                        }}
                                        data-framer-component-type="RichTextContainer">
                                        <h5 style={{
                                            '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                            '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                            '--framer-font-size': '18px',
                                            '--framer-font-weight': '500',
                                            '--framer-letter-spacing': '0.02em',
                                            '--framer-line-height': '28.2px',
                                            '--framer-text-color': 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                        }} className="framer-text">
                                            Read More
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </section>

                    <div class="framer-kh333o" data-framer-name="Spacer" name="Spacer"></div>

                    <section class="framer-1gzsism" data-framer-name="Faq" id="faq" name="Faq">
                        <div style={{
                            position: 'absolute',
                            borderRadius: 'inherit',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }} data-framer-background-image-wrapper="true">
                            <img
                                decoding="async"
                                loading="lazy"
                                sizes="100vw"
                                srcset="https://framerusercontent.com/images/YcQd7Xk01zRbX4BsCthWj9LXdAk.png?scale-down-to=512 512w, https://framerusercontent.com/images/YcQd7Xk01zRbX4BsCthWj9LXdAk.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/YcQd7Xk01zRbX4BsCthWj9LXdAk.png 1665w"
                                src="https://framerusercontent.com/images/YcQd7Xk01zRbX4BsCthWj9LXdAk.png"
                                alt=""
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'inherit',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                    imageRendering: 'auto'
                                }}
                            />
                        </div>

                        <div className="framer-1eid36v" data-framer-name="Spacer" name="Spacer"></div>

                        <div className="framer-mqc7l5" style={{
                            outline: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            flexShrink: 0,
                            transform: 'none'
                        }} 
                        data-framer-component-type="RichTextContainer">
                            <h2 style={{
                                fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                fontSize: '64px',
                                fontWeight: 600,
                                letterSpacing: '-0.04em',
                                lineHeight: '97px',
                                textAlign: 'center',
                                color: 'rgb(235, 235, 235)'
                            }} className="framer-text">
                                <span data-text-fill="true" style={{
                                    backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 91.1044%)'
                                }} className="framer-text">Faq</span>
                            </h2>
                        </div>

                        <div class="framer-1b223ft" data-framer-name="Container" name="Container">
                            <div class="framer-2lalsq-container">
                                <div className="framer-zyuWB framer-cjoy7j framer-v-cjoy7j"
                                    data-border="true"
                                    data-framer-name="Variant 1"
                                    style={{
                                        borderBottomWidth: '1px',
                                        borderColor: 'rgba(199, 196, 12, 0.35)',
                                        borderLeftWidth: '1px',
                                        borderRightWidth: '1px',
                                        borderStyle: 'solid',
                                        borderTopWidth: '1px',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        width: '100%'
                                    }}
                                    tabIndex="0">

                                    <div className="framer-17buv4w-container">
                                        <div className="framer-bo6aW framer-1cp7qdu framer-v-1cp7qdu" data-framer-name="Closed"
                                            data-highlight="true" style={{ width: "100%" }} tabIndex="0">
                                            <div className="framer-1u0ri9p" data-framer-name="Question" data-highlight="true" tabIndex="0">
                                                <div className="framer-187ga6z" data-framer-name="Plus"
                                                    style={{ opacity: 0.3, transform: "none" }}>
                                                    <div className="framer-v3vgui"
                                                        style={{
                                                            backgroundColor: "rgb(255, 251, 0)",
                                                            borderBottomLeftRadius: "10px",
                                                            borderBottomRightRadius: "10px",
                                                            borderTopLeftRadius: "10px",
                                                            borderTopRightRadius: "10px"
                                                        }}>
                                                    </div>
                                                    <div className="framer-34dft8"
                                                        style={{
                                                            backgroundColor: "rgb(255, 251, 0)",
                                                            borderBottomLeftRadius: "10px",
                                                            borderBottomRightRadius: "10px",
                                                            borderTopLeftRadius: "10px",
                                                            borderTopRightRadius: "10px"
                                                        }}>
                                                    </div>
                                                </div>
                                                <div className="framer-ilw4pm"
                                                    style={{
                                                        outline: "none",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "flex-start",
                                                        flexShrink: 0,
                                                        "--extracted-r6o4lv": "rgb(178, 179, 162)",
                                                        "--framer-link-text-color": "rgb(0, 153, 255)",
                                                        "--framer-link-text-decoration": "underline",
                                                        transform: "none"
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        "--font-selector": "R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw",
                                                        "--framer-font-family": '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                        "--framer-font-weight": 500,
                                                        "--framer-letter-spacing": "0px",
                                                        "--framer-line-height": "1.5em",
                                                        "--framer-text-alignment": "left",
                                                        "--framer-text-color": "var(--extracted-r6o4lv, rgb(178, 179, 162))"
                                                    }}
                                                        className="framer-text">What is ABYA LMS?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="framer-1evj20f" data-framer-name="Shiny Line"
                                        style={{
                                            background: 'linear-gradient(270deg, rgba(69, 205, 255, 0) 8.965240971280659%, rgb(238, 255, 0) 29.002218661407593%, rgb(255, 255, 255) 49.354739307284525%, rgb(255, 251, 0) 70.81166029828668%, rgba(0, 114, 156, 0) 94.95069641316402%)',
                                            opacity: 0.5
                                        }}>
                                    </div>
                                    <div className="framer-njya7g-container">
                                        <div className="framer-bo6aW framer-1cp7qdu framer-v-1cp7qdu" data-framer-name="Closed"
                                            data-highlight="true" style={{ width: '100%' }} tabIndex="0">
                                            <div className="framer-1u0ri9p" data-framer-name="Question" data-highlight="true" tabIndex="0">
                                                <div className="framer-187ga6z" data-framer-name="Plus"
                                                    style={{ opacity: 0.3, transform: 'none' }}>
                                                    <div className="framer-v3vgui"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                    <div className="framer-34dft8"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                </div>
                                                <div className="framer-ilw4pm"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'rgb(178, 179, 162)',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                        '--framer-font-weight': '500',
                                                        '--framer-letter-spacing': '0px',
                                                        '--framer-line-height': '1.5em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, rgb(178, 179, 162))'
                                                    }}
                                                    className="framer-text">How do I reset my password?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="framer-1h7m90x" data-framer-name="Shiny Line"
                                        style={{
                                            background: 'linear-gradient(270deg, rgba(69, 205, 255, 0) 8.965240971280659%, rgb(238, 255, 0) 29.002218661407593%, rgb(255, 255, 255) 49.354739307284525%, rgb(255, 251, 0) 70.81166029828668%, rgba(0, 114, 156, 0) 94.95069641316402%)',
                                            opacity: 0.5
                                        }}>
                                    </div>
                                    <div className="framer-stqmfx-container">
                                        <div className="framer-bo6aW framer-1cp7qdu framer-v-1cp7qdu" data-framer-name="Closed"
                                            data-highlight="true" style={{ width: '100%' }} tabIndex={0}>
                                            <div className="framer-1u0ri9p" data-framer-name="Question" data-highlight="true"
                                                tabIndex={0}>
                                                <div className="framer-187ga6z" data-framer-name="Plus"
                                                    style={{ opacity: 0.3, transform: 'none' }}>
                                                    <div className="framer-v3vgui"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                    <div className="framer-34dft8"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                </div>
                                                <div className="framer-ilw4pm"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'rgb(178, 179, 162)',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                        '--framer-font-weight': 500,
                                                        '--framer-letter-spacing': '0px',
                                                        '--framer-line-height': '1.5em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, rgb(178, 179, 162))'
                                                    }}
                                                    className="framer-text">Is there a limit to the file size I can upload?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="framer-7p8o1t" data-framer-name="Shiny Line"
                                        style={{
                                            background: 'linear-gradient(270deg, rgba(69, 205, 255, 0) 8.965240971280659%, rgb(238, 255, 0) 29.002218661407593%, rgb(255, 255, 255) 49.354739307284525%, rgb(255, 251, 0) 70.81166029828668%, rgba(0, 114, 156, 0) 94.95069641316402%)',
                                            opacity: 0.5
                                        }}>
                                    </div>
                                    <div className="framer-1b9d6bs-container">
                                        <div className="framer-bo6aW framer-1cp7qdu framer-v-1cp7qdu" data-framer-name="Closed"
                                            data-highlight="true" style={{ width: '100%' }} tabIndex={0}>
                                            <div className="framer-1u0ri9p" data-framer-name="Question" data-highlight="true"
                                                tabIndex={0}>
                                                <div className="framer-187ga6z" data-framer-name="Plus"
                                                    style={{ opacity: 0.3, transform: 'none' }}>
                                                    <div className="framer-v3vgui"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                    <div className="framer-34dft8"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                </div>
                                                <div className="framer-ilw4pm"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'rgb(178, 179, 162)',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                        '--framer-font-weight': 500,
                                                        '--framer-letter-spacing': '0px',
                                                        '--framer-line-height': '1.5em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, rgb(178, 179, 162))'
                                                    }}
                                                        className="framer-text">
                                                        How can I communicate with my instructor or classmates?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="framer-18c86y5" data-framer-name="Shiny Line"
                                        style={{
                                            background: 'linear-gradient(270deg, rgba(69, 205, 255, 0) 8.965240971280659%, rgb(238, 255, 0) 29.002218661407593%, rgb(255, 255, 255) 49.354739307284525%, rgb(255, 251, 0) 70.81166029828668%, rgba(0, 114, 156, 0) 94.95069641316402%)',
                                            opacity: 0.5
                                        }}>
                                    </div>
                                    <div className="framer-5mx1nl-container">
                                        <div className="framer-bo6aW framer-1cp7qdu framer-v-1cp7qdu" data-framer-name="Closed"
                                            data-highlight="true"
                                            style={{
                                                width: '100%'
                                            }}
                                            tabIndex="0">
                                            <div className="framer-1u0ri9p" data-framer-name="Question" data-highlight="true"
                                                tabIndex="0">
                                                <div className="framer-187ga6z" data-framer-name="Plus"
                                                    style={{
                                                        opacity: 0.3,
                                                        transform: 'none'
                                                    }}>
                                                    <div className="framer-v3vgui"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                    <div className="framer-34dft8"
                                                        style={{
                                                            backgroundColor: 'rgb(255, 251, 0)',
                                                            borderBottomLeftRadius: '10px',
                                                            borderBottomRightRadius: '10px',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}>
                                                    </div>
                                                </div>
                                                <div className="framer-ilw4pm"
                                                    style={{
                                                        outline: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'flex-start',
                                                        flexShrink: 0,
                                                        '--extracted-r6o4lv': 'rgb(178, 179, 162)',
                                                        '--framer-link-text-color': 'rgb(0, 153, 255)',
                                                        '--framer-link-text-decoration': 'underline',
                                                        transform: 'none'
                                                    }}
                                                    data-framer-component-type="RichTextContainer">
                                                    <p style={{
                                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtNTAw',
                                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                        '--framer-font-weight': 500,
                                                        '--framer-letter-spacing': '0px',
                                                        '--framer-line-height': '1.5em',
                                                        '--framer-text-alignment': 'left',
                                                        '--framer-text-color': 'var(--extracted-r6o4lv, rgb(178, 179, 162))'
                                                    }}
                                                    className="framer-text">
                                                        What are the benefits of using blockchain for LMS?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="framer-szlmn7" data-framer-name="Waitlist" id="waitlist" name="Waitlist">
                        <div className="framer-182zjgq" data-framer-name="Container" name="Container">
                            <div className="framer-mqc7l5" style={{
                                outline: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                flexShrink: 0,
                                transform: 'none'
                            }} 
                            data-framer-component-type="RichTextContainer">
                                <h2 style={{
                                    fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                    fontSize: '64px',
                                    fontWeight: 600,
                                    letterSpacing: '-0.04em',
                                    lineHeight: '97px',
                                    textAlign: 'center',
                                    color: 'rgb(235, 235, 235)'
                                }} className="framer-text">
                                    <span data-text-fill="true" style={{
                                        backgroundImage: 'linear-gradient(129deg, rgba(235, 235, 235, 0.94) 0%, rgba(255, 255, 255, 0.27) 91.1044%)'
                                    }} className="framer-text">Join the Waitlist</span>
                                </h2>
                            </div>
                            <div className="framer-1uscqb4" data-framer-name="Get early access and be the first to experience the future of seamless learning. Join the waitlist by providing your email below and hit 'Join' to stay ahead of the curve."
                                style={{
                                    outline: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    flexShrink: 0,
                                    transform: 'none'
                                }} data-framer-component-type="RichTextContainer">
                                <p style={{
                                    fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                    fontSize: '18px',
                                    letterSpacing: '0.02em',
                                    lineHeight: '27.9px',
                                    textAlign: 'center',
                                    color: 'rgb(179, 179, 179)'
                                }} className="framer-text">Get early access and be the first to experience the future of seamless
                                    learning. Join the waitlist by providing your email below and hit 'Join' to stay ahead of the curve.</p>
                            </div>
                        </div>

                        <div className="framer-1smph31-container">
                            <div
                                style={{
                                    width: '100%',
                                    position: 'relative',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '--framer-custom-placeholder-color': 'rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <form
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'flex',
                                        position: 'relative',
                                        flexDirection: 'row',
                                        color: 'rgb(11, 14, 15)',
                                        gap: '0',
                                    }}
                                    method="POST"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="name@email.com"
                                        className="v1 framer-custom-input"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        style={{
                                            WebkitAppearance: 'none',
                                            appearance: 'none',
                                            width: '100%',
                                            height: 'auto',
                                            outline: 'none',
                                            border: 'none',
                                            padding: '25px 181px 25px 25px',
                                            borderRadius: '100px',
                                            fontSize: '16px',
                                            fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            letterSpacing: '0em',
                                            lineHeight: '1em',
                                            background: 'rgba(235, 235, 235, 0)',
                                            color: 'rgb(255, 255, 255)',
                                            boxShadow: 'inset 0 0 0 0px rgb(255, 255, 255), inset 0 0 0 1px var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))',
                                        }}
                                        data-1p-ignore="true"
                                        value=""
                                    />
                                    <div style={{ position: 'absolute', top: '5px', right: '5px', bottom: '5px' }}>
                                        <input
                                            type="submit"
                                            style={{
                                                WebkitAppearance: 'none',
                                                appearance: 'none',
                                                width: '156px',
                                                height: '100%',
                                                outline: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '0px 30px 0px 30px',
                                                borderRadius: '95px',
                                                fontSize: '20px',
                                                fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                                fontStyle: 'normal',
                                                fontWeight: '700',
                                                letterSpacing: '0em',
                                                lineHeight: '1em',
                                                background: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))',
                                                color: 'rgb(11, 14, 15)',
                                                zIndex: '1',
                                                boxShadow: 'none',
                                            }}
                                            value="Join"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>;
                    </section>

                    <div class="framer-a17zi7" data-framer-name="Spacer" name="Spacer"></div>

                    <div className="framer-11he8v3" data-framer-name="Background" name="Background">
                        <div style={{
                            position: 'absolute',
                            borderRadius: 'inherit',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }} data-framer-background-image-wrapper="true">
                            <img
                                decoding="async"
                                loading="lazy"
                                sizes="100vw"
                                srcSet="https://framerusercontent.com/images/kVQmY41eFefCv7mwhJRo07zW7o.png?scale-down-to=512 512w, https://framerusercontent.com/images/kVQmY41eFefCv7mwhJRo07zW7o.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/kVQmY41eFefCv7mwhJRo07zW7o.png 1665w"
                                src="https://framerusercontent.com/images/kVQmY41eFefCv7mwhJRo07zW7o.png"
                                alt=""
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'inherit',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                    imageRendering: 'auto'
                                }}
                            />
                        </div>
                    </div>

                    <footer class="framer-fvqbms" data-border="true" data-framer-name="Footer" name="Footer">
                        <div class="framer-2wgbsm" data-framer-name="Container" name="Container">
                            <div className="framer-q7qplr-container">
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '5px' }}>
                                    <img style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} src="https://framerusercontent.com/images/RbmmjGxvoNP2V9QG394I89bBPA.jpg" alt="" />
                                </div>
                            </div>

                            <div className="framer-nufu51">
                                <div className="framer-u2yru8"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        '--framer-text-color': 'rgb(130, 130, 130)'
                                    }}
                                    className="framer-text">
                                        <a className="framer-text framer-styles-preset-1u4289p"
                                        data-styles-preset="bEiodWSQ3" href="./">Overview</a>
                                    </p>
                                </div>
                                <div className="framer-15zyfk4"></div>
                                <div className="framer-f7dc46"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        '--framer-text-color': 'rgb(130, 130, 130)'
                                    }}
                                    className="framer-text">
                                        <a className="framer-text framer-styles-preset-1u4289p"
                                        data-styles-preset="bEiodWSQ3" href="./">Features</a>
                                    </p>
                                </div>
                                <div className="framer-1jb5kof"></div>
                                <div className="framer-gnm8vk"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        '--framer-text-color': 'rgb(130, 130, 130)'
                                    }}
                                    className="framer-text">
                                        <a className="framer-text framer-styles-preset-1u4289p"
                                        data-styles-preset="bEiodWSQ3" href="./">References</a>
                                    </p>
                                </div>
                                <div className="framer-1al4c86"></div>
                                <div className="framer-19k0k7a"
                                    style={{
                                        outline: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        flexShrink: 0,
                                        transform: 'none'
                                    }}
                                    data-framer-component-type="RichTextContainer">
                                    <p style={{
                                        '--font-selector': 'R0Y7UGx1cyBKYWthcnRhIFNhbnMtcmVndWxhcg==',
                                        '--framer-font-family': '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
                                        '--framer-text-color': 'rgb(130, 130, 130)'
                                    }}
                                    className="framer-text">
                                        <a className="framer-text framer-styles-preset-1u4289p"
                                        data-styles-preset="bEiodWSQ3" href="./">Faq</a>
                                    </p>
                                </div>
                            </div>

                            <div class="framer-14swa2t-container">
                                <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', gap: '12px' }}>
                                    <div>
                                        <a href="https://api.whatsapp.com/send?text=undefined"
                                            className="social-icon id9d2fbc3b9aad4" target="_blank"
                                            style={{ display: 'inline-block', width: '50px', height: '50px', position: 'relative', overflow: 'hidden', verticalAlign: 'middle' }}
                                            aria-label="whatsapp">
                                            <div className="social-container"
                                                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}>
                                                <svg role="img" aria-label="whatsapp social icon" className="social-svg" viewBox="0 0 64 64"
                                                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', borderRadius: '50%', fillRule: 'evenodd' }}>
                                                    <g className="social-svg-icon"
                                                        style={{ transition: 'fill 170ms ease-in-out', fill: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))' }}>
                                                        <path
                                                            d="M0,0H64V64H0ZM0,0v64h64V0H0z M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688" />
                                                    </g>
                                                    <g className="social-svg-mask"
                                                        style={{ transition: 'fill 170ms ease-in-out', fill: 'rgba(0, 153, 255, 0)' }}>
                                                        <path
                                                            d="M0,0v64h64V0H0z M 48 31.589844 C 48 40.195312 40.96875 47.175781 32.289062 47.175781 C 29.535156 47.175781 26.949219 46.472656 24.695312 45.234375 L 16 48 L 18.835938 39.636719 C 17.40625 37.289062 16.582031 34.53125 16.582031 31.589844 C 16.582031 22.980469 23.613281 16 32.289062 16 C 40.96875 16 48 22.980469 48 31.589844 Z M 32.289062 18.484375 C 25.007812 18.484375 19.082031 24.363281 19.082031 31.589844 C 19.082031 34.457031 20.019531 37.109375 21.597656 39.269531 L 19.949219 44.136719 L 25.023438 42.527344 C 27.109375 43.894531 29.609375 44.691406 32.292969 44.691406 C 39.574219 44.691406 45.5 38.816406 45.5 31.589844 C 45.5 24.363281 39.574219 18.484375 32.289062 18.484375 Z M 40.222656 35.179688 C 40.125 35.019531 39.871094 34.921875 39.484375 34.730469 C 39.101562 34.542969 37.207031 33.617188 36.855469 33.488281 C 36.5 33.363281 36.242188 33.296875 35.988281 33.679688 C 35.730469 34.0625 34.992188 34.921875 34.769531 35.179688 C 34.542969 35.433594 34.320312 35.464844 33.933594 35.273438 C 33.546875 35.082031 32.308594 34.679688 30.835938 33.378906 C 29.691406 32.367188 28.917969 31.117188 28.695312 30.734375 C 28.472656 30.351562 28.671875 30.144531 28.863281 29.953125 C 29.039062 29.78125 29.25 29.507812 29.441406 29.285156 C 29.636719 29.0625 29.699219 28.902344 29.828125 28.648438 C 29.957031 28.390625 29.890625 28.167969 29.792969 27.976562 C 29.699219 27.785156 28.925781 25.90625 28.605469 25.140625 C 28.285156 24.375 27.964844 24.503906 27.742188 24.503906 C 27.515625 24.503906 27.257812 24.472656 27.003906 24.472656 C 26.746094 24.472656 26.328125 24.566406 25.976562 24.949219 C 25.621094 25.332031 24.628906 26.257812 24.628906 28.136719 C 24.628906 30.015625 26.007812 31.832031 26.199219 32.085938 C 26.394531 32.34375 28.863281 36.324219 32.777344 37.855469 C 36.691406 39.386719 36.691406 38.875 37.398438 38.8125 C 38.105469 38.746094 39.675781 37.886719 40 36.996094 C 40.320312 36.101562 40.320312 35.335938 40.222656 35.179688 Z M 40.222656 35.179688" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                    <div>
                                        <a href="mailto:?body=undefined" className="social-icon id9d2fbc3b9aad4"
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                width: '50px',
                                                height: '50px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                verticalAlign: 'middle'
                                            }}
                                            aria-label="mailto">
                                            <div className="social-container"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                <svg role="img"
                                                    aria-label="mailto social icon"
                                                    className="social-svg"
                                                    viewBox="0 0 64 64"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        left: '0',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '50%',
                                                        fillRule: 'evenodd'
                                                    }}>
                                                    <g className="social-svg-icon"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}>
                                                        <path
                                                            d="M0,0H64V64H0ZM41.1,25H22.9l9.1,7.1L41.1,25z M44,26.6l-12,9.3l-12-9.3V39h24V26.6z M0,0v64h64V0H0z M47,42H17V22h30V42z" />
                                                    </g>
                                                    <g className="social-svg-mask"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'rgba(255, 255, 255, 0)'
                                                        }}>
                                                        <path
                                                            d="M41.1,25H22.9l9.1,7.1L41.1,25z M44,26.6l-12,9.3l-12-9.3V39h24V26.6z M0,0v64h64V0H0z M47,42H17V22h30V42z" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                    <div>
                                        <a
                                            href="https://www.linkedin.com/shareArticle?mini=true&amp;url=undefined"
                                            className="social-icon id9d2fbc3b9aad4"
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                width: '50px',
                                                height: '50px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                verticalAlign: 'middle'
                                            }}
                                            aria-label="linkedin"
                                        >
                                            <div
                                                className="social-container"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                            >
                                                <svg
                                                    role="img"
                                                    aria-label="linkedin social icon"
                                                    className="social-svg"
                                                    viewBox="0 0 64 64"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        left: '0',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '50%',
                                                        fillRule: 'evenodd'
                                                    }}
                                                >
                                                    <g
                                                        className="social-svg-icon"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}
                                                    >
                                                        <path d="M0,0H64V64H0ZM0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z" />
                                                    </g>
                                                    <g
                                                        className="social-svg-mask"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'rgba(0, 153, 255, 0)'
                                                        }}
                                                    >
                                                        <path d="M0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>;

                                    <div>
                                        <a href="https://x.com/intent/tweet?text=undefined"
                                            className="social-icon id9d2fbc3b9aad4" target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                width: '50px',
                                                height: '50px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                verticalAlign: 'middle'
                                            }}
                                            aria-label="x">
                                            <div className="social-container"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                <svg role="img"
                                                    aria-label="x social icon" className="social-svg" viewBox="0 0 64 64"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        left: '0',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '50%',
                                                        fillRule: 'evenodd',
                                                        transition: 'fill 170ms ease-in-out',
                                                        fill: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                    }}>
                                                    <g className="social-svg-icon">
                                                        <path
                                                            d="M0,0H64V64H0ZM 0 0 L 0 64 L 64 64 L 64 0 L 0 0 z M 16 17.537109 L 26.125 17.537109 L 33.117188 26.779297 L 41.201172 17.537109 L 46.109375 17.537109 L 35.388672 29.789062 L 48 46.462891 L 38.125 46.462891 L 30.390625 36.351562 L 21.541016 46.462891 L 16.632812 46.462891 L 28.097656 33.357422 L 16 17.537109 z M 21.730469 20.320312 L 39.480469 43.525391 L 42.199219 43.525391 L 24.648438 20.320312 L 21.730469 20.320312 z " />
                                                    </g>
                                                    <g className="social-svg-mask"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'rgba(0, 153, 255, 0)'
                                                        }}>
                                                        <path
                                                            d="M 0 0 L 0 64 L 64 64 L 64 0 L 0 0 z M 16 17.537109 L 26.125 17.537109 L 33.117188 26.779297 L 41.201172 17.537109 L 46.109375 17.537109 L 35.388672 29.789062 L 48 46.462891 L 38.125 46.462891 L 30.390625 36.351562 L 21.541016 46.462891 L 16.632812 46.462891 L 28.097656 33.357422 L 16 17.537109 z M 21.730469 20.320312 L 39.480469 43.525391 L 42.199219 43.525391 L 24.648438 20.320312 L 21.730469 20.320312 z " />
                                                    </g>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>

                                    <div>
                                        <a href="https://www.facebook.com/sharer/sharer.php?u=undefined"
                                            className="social-icon id9d2fbc3b9aad4"
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                width: '50px',
                                                height: '50px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                verticalAlign: 'middle'
                                            }}
                                            aria-label="facebook">
                                            <div className="social-container"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%'
                                                }}>
                                                <svg role="img"
                                                    aria-label="facebook social icon"
                                                    className="social-svg"
                                                    viewBox="0 0 64 64"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        left: '0',
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '50%',
                                                        fillRule: 'evenodd'
                                                    }}>
                                                    <g className="social-svg-icon"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'var(--token-a8e28c9d-4ce6-4ad2-96a7-a1a12837bc97, rgb(235, 184, 29))'
                                                        }}>
                                                        <path
                                                            d="M0,0H64V64H0ZM0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z" />
                                                    </g>
                                                    <g className="social-svg-mask"
                                                        style={{
                                                            transition: 'fill 170ms ease-in-out',
                                                            fill: 'rgba(255, 255, 255, 0)'
                                                        }}>
                                                        <path
                                                            d="M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>
                <div class="framer-HWZMM framer-EmBjF" id="overlay"></div>
            </div>

            <div id="svg-templates" style={{ position: 'absolute', overflow: 'hidden', top: 0, left: 0, width: 0, height: 0 }}>
            </div>


            <div id="__framer-badge-container"></div>
            <script data-framer-appear-animation="no-preference"></script>
            <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'></script><script src="./script.js"></script>

        </body>
    );
}


export default Homepage;