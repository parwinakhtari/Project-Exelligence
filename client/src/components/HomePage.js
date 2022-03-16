import React from "react";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <h1>Welcome to Exelligence</h1>
          <h2>Say Hello to India's top doctors via "Project Exelligence"</h2>
          <a href="/login" className="btn-get-started scrollto">
            Get Started
          </a>
        </div>
      </section>

      <main id="main">
        <section id="why-us" className="why-us">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex align-items-stretch">
                <div className="content">
                  <h3>Why Choose Exelligence?</h3>
                  <p>
                    Get digital prescriptions, monitoring your progress with
                    advanced AI features.
                    Get personalized one-to-one attentions by health
                    professionals till completely recovery .
                  </p>
                  <div className="text-center">
                    <a href="/login" className="more-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="departments" className="departments">
          <div className="container">
            <div className="section-title">
              <h2>Departments</h2>
            </div>

            <div className="row gy-4">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      data-bs-toggle="tab"
                      href="#tab-1"
                    >
                      Orthopedics
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                      Neurology
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                      Ophtamology
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                      Pediatrics
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-9">
                <div className="tab-content">
                  <div className="tab-pane active show" id="tab-1">
                    <div className="row gy-4">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Cardiology</h3>
                        <p className="fst-italic">
                          Qui laudantium consequatur laborum sit qui ad sapiente
                          dila parde sonata raqer a videna mareta paulona marka
                        </p>
                        <p>
                          Et nobis maiores eius. Voluptatibus ut enim blanditiis
                          atque harum sint. Laborum eos ipsum ipsa odit magni.
                          Incidunt hic ut molestiae aut qui. Est repellat minima
                          eveniet eius et quis magni nihil. Consequatur dolorem
                          quaerat quos qui similique accusamus nostrum rem vero
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img
                          src="/img/departments-1.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-2">
                    <div className="row gy-4">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Et blanditiis nemo veritatis excepturi</h3>
                        <p className="fst-italic">
                          Qui laudantium consequatur laborum sit qui ad sapiente
                          dila parde sonata raqer a videna mareta paulona marka
                        </p>
                        <p>
                          Ea ipsum voluptatem consequatur quis est. Illum error
                          ullam omnis quia et reiciendis sunt sunt est. Non
                          aliquid repellendus itaque accusamus eius et velit
                          ipsa voluptates. Optio nesciunt eaque beatae accusamus
                          lerode pakto madirna desera vafle de nideran pal
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img
                          src="/img/departments-2.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-3">
                    <div className="row gy-4">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Impedit facilis occaecati odio neque aperiam sit
                        </h3>
                        <p className="fst-italic">
                          Eos voluptatibus quo. Odio similique illum id quidem
                          non enim fuga. Qui natus non sunt dicta dolor et. In
                          asperiores velit quaerat perferendis aut
                        </p>
                        <p>
                          Iure officiis odit rerum. Harum sequi eum illum
                          corrupti culpa veritatis quisquam. Neque
                          necessitatibus illo rerum eum ut. Commodi ipsam minima
                          molestiae sed laboriosam a iste odio. Earum odit
                          nesciunt fugiat sit ullam. Soluta et harum voluptatem
                          optio quae
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img
                          src="/img/departments-3.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-4">
                    <div className="row gy-4">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Fuga dolores inventore laboriosam ut est accusamus
                          laboriosam dolore
                        </h3>
                        <p className="fst-italic">
                          Totam aperiam accusamus. Repellat consequuntur iure
                          voluptas iure porro quis delectus
                        </p>
                        <p>
                          Eaque consequuntur consequuntur libero expedita in
                          voluptas. Nostrum ipsam necessitatibus aliquam fugiat
                          debitis quis velit. Eum ex maxime error in consequatur
                          corporis atque. Eligendi asperiores sed qui veritatis
                          aperiam quia a laborum inventore
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img
                          src="/img/departments-4.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-5">
                    <div className="row gy-4">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Est eveniet ipsam sindera pad rone matrelat sando reda
                        </h3>
                        <p className="fst-italic">
                          Omnis blanditiis saepe eos autem qui sunt debitis
                          porro quia.
                        </p>
                        <p>
                          Exercitationem nostrum omnis. Ut reiciendis
                          repudiandae minus. Omnis recusandae ut non quam ut
                          quod eius qui. Ipsum quia odit vero atque qui
                          quibusdam amet. Occaecati sed est sint aut vitae
                          molestiae voluptate vel
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img
                          src="/img/departments-5.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Team Nutella</h2>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <div
                  className="member align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="pic">
                    <img
                      src="/img/team/team-1.jpeg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Parwin Akhtari </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mt-4 mt-lg-0">
                <div
                  className="member align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="pic">
                    <img
                      src="/img/team/team-2.PNG"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Siddharth Sharma</h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 mt-4 mt-lg-0 justify-content-center">
                <div
                  className="member justify-content-center"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="pic">
                    <img
                      src="/img/team/team-3.jpeg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Alpana Nanda</h4>
                  </div>
                </div>
                
              </div>
              <div className="col-lg-3 mt-4 mt-lg-0">
                <div
                  className="member align-items-start"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="pic">
                    <img
                      src="/img/team/team-4.jpeg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="member-info">
                    <h4>Akshay Agrawal</h4>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
