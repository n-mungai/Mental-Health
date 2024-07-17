import './ExpertsPage.css';
import m1 from '../../assets/expertsPage/m1.jpg';
import m2 from '../../assets/expertsPage/m2.jpg';
import m3 from '../../assets/expertsPage/m3.jpg';

const ExpertsPage = () => {
    return (
        <>
            <div className="expertsTitle">
                <div id="titleBackground"></div>
                <div id="titleBackgroundFade"></div>
                <p id="expertsTitle">FIND EXPERTS</p>
                <p id="catchphrase">Get Help From The Right People</p>
            </div>
            <div id="main">
                <div className="expert_tile">
                    <img className="m" src={m1} />
                    <div className="expertBody">
                        <p>
                            Dr. Emma Wilkinson is a clinical psychologist with over 15 years of experience in the field of
                            mental health. She specializes in the treatment of anxiety disorders,  depression, and
                            trauma-related conditions.  Dr. Wilkinson is known for her compassionate and evidence-based
                            approach to therapy, helping her clients develop practical coping strategies and
                            achieve lasting positive changes in their lives.
                        </p>
                        <h2>Dr Emma Wilkinson</h2>
                    </div>
                </div>
                <div className="expert_tile">
                    <img className="m" src={m3} />
                    <div className="expertBody">
                        <p>
                            Dr. Michael Johnson is a board-certified psychiatrist with extensive experience in the treatment
                            of a wide range of  mental health conditions. With over 20 years of practice,  he has
                            developed a deep understanding of the complex interplay between the biological, psychological,
                            and social factors that contribute to mental health. Dr. Johnson is known for his holistic
                            approach to patient care,  incorporating both medication management and
                            evidence-based psychotherapeutic interventions to help his clients achieve
                            lasting improvements in their mental well-being.
                        </p>
                        <h2>Dr Michael Johnson</h2>
                    </div>
                </div>
                <div className="expert_tile">
                    <img className="m" src={m2} />
                    <div className="expertBody">
                        <p>
                            Dr. Olivia Chen is a psychiatric nurse practitioner with a reputation for providing comprehensive
                            and personalized care to her clients. With a background in both nursing and mental health, she
                            brings a unique blend of clinical expertise  and holistic well-being to her practice. Dr. Chen is
                            dedicated  to helping individuals struggling with a variety of mental health concerns, from
                            mood disorders to substance abuse, using a collaborative approach that combines medication
                            management,  psychotherapy, and lifestyle interventions. Her clients appreciate her empathetic
                            nature, clinical expertise, and commitment to their  overall health and wellness.
                        </p>
                        <h2>Dr Olivia Chen</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpertsPage;