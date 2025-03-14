import React from "react";
import "./Contact.css"; // Assuming you have corresponding styles

const Contact = () => {
  return (
    <section id="contact">
      <h1 className="section-header">Get in touch</h1>
      <div className="contact-wrapper">
        {/* Left contact page */}
        <form id="contact-form" className="form-horizontal" role="form">
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="name" placeholder="NAME" name="name" required />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" id="email" placeholder="EMAIL" name="email" required />
            </div>
          </div>
          <textarea className="form-control" rows="10" placeholder="MESSAGE" name="message" required></textarea>
          <button className="btn btn-primary send-button" id="submit" type="submit">
            <div className="alt-send-button">
              <i className="fa fa-paper-plane"></i>
              <span className="send-text">SEND</span>
            </div>
          </button>
        </form>

        {/* Right contact page */}
        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <i className="fa fa-map-marker fa-2x"></i>
              <span className="contact-text place">Bengaluru, Karnataka</span>
            </li>
            <li className="list-item">
              <i className="fa fa-phone fa-2x"></i>
              <span className="contact-text phone">
                <a href="tel:1-212-555-5555">(+91) 797-565-2729</a>
              </span>
            </li>
            <li className="list-item">
              <i className="fa fa-envelope fa-2x"></i>
              <span className="contact-text gmail">
                <a href="mailto:hitmeup@gmail.com">vaishnavidevip17@gmail.com</a>
              </span>
            </li>
          </ul>
          <hr />
          <ul className="social-media-list">
            <li><a href="#" className="contact-icon"><i className="fa fa-github"></i></a></li>
            <li><a href="#" className="contact-icon"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="#" className="contact-icon"><i className="fa fa-instagram"></i></a></li>
            <li><a href="#" className="contact-icon"><i className="fa fa-envelope"></i></a></li>
          </ul>
          <hr />
          <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;