import './LandingPage.css';
import img1 from '../../assets/landingPage/img1.jpg';
import img2 from '../../assets/landingPage/img2.jpg';

const LandingPage = () => {
    return (
        <>
            <div className="landingPage">
                <p id="tulia">TULIA</p>
                <p className="catchphrase">BE AWARE {"\u2022"} GET HELP</p>
            </div>

            <section className="getToKnowTulia">
                <div className="outerContainer">

                    <center className="catchphrase">ABOUT TULIA</center>
                    <div className="intro">

                        <p>We started Tulia to make mental health support accessible and reduce the stigma surrounding mental health
                            issues. Our mission is to create a safe, supportive space where individuals can find the resources and
                            community they need to improve their mental well-being. By fostering awareness and providing tools for
                            self-care, we aim to empower individuals to lead healthier, happier lives.</p>
                        <img id="img1" src={img1} alt="" />
                    </div>
                </div>
                <div className="outerContainer">

                    <center className="catchphrase">WHY WE STARTED THIS</center>
                    <div className="intro">
                        <img id="img1" src={img2} alt="" />
                        <p>Mental health awareness is crucial as 1 in 5 adults experience mental illness annually, with 50% beginning by
                            age 14. Suicide is the second leading cause of death among people aged 10-34. Depression affects 264 million
                            people globally. Despite this, stigma prevents nearly 60% of individuals from seeking help. Tulia aims to
                            bridge this gap by providing valuable resources and expert insights. Tulia enables experts to share blogs on
                            particular issues surrounding mental health and connect with individuals seeking help.</p>
                    </div>
                </div>

                <div className="outerContainer">
                    <center className="catchphrase">TESTIMONIALS</center>
                    <div className="testimonialsContainer">
                        <div className="testimonials">
                            <blockquote>
                                <p>"Tulia's commitment to mental health awareness is evident in every aspect of the platform."</p>
                            </blockquote>
                            <h3>Emily R.</h3>
                        </div>
                        <div className="testimonials">
                            <blockquote>
                                <p>"I've struggled with anxiety for years, and Tulia has been a beacon of hope."</p>
                            </blockquote>
                            <h3>Jane M.</h3>
                        </div>
                        <div className="testimonials">
                            <blockquote>
                                <p>"Tulia has been a game-changer for my mental health."</p>
                            </blockquote>
                            <h3>John K.</h3>

                        </div>
                        <div className="testimonials">
                            <blockquote>
                                <p>"Thanks to Tulia, I found the support I needed during a difficult time."</p>
                            </blockquote>
                            <h3>Sophia L.</h3>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;