import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebook,faTiktok,faInstagram,faTwitter,faPinterest } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className={"wrapper"}>
            <div className={"footer__contact"}>
                <h4>Potřebuješ pomoc?</h4>
                <div>
                    <h5><a href="#">Zahájit chat</a></h5>
                    <p>Od pondělí do pátku od 10:00 do 17:00</p>
                </div>
                <div>
                    <h5><a href="tel:">+420 000 000 0000</a></h5>
                    <p>Od pondělí do pátku od 9:00 do 18:00</p>
                </div>
                <div>
                    <h5><a href="mailto: noreply.yellowflash@gmail.com"> Poslat e-mail</a></h5>
                <p>Odpovíme ti, hned jak to bude možné</p>
                </div>
            </div>
            <div>
                <h4>Nápověda</h4>
                <ul>
                    <li>Koupit online</li>
                    <li>Platba</li>
                    <li>Doprava</li>
                    <li>Vrácení zboží</li>
                    <li>Nákup jako host</li>
                    <li>Elektronická účtenka</li>
                </ul>
            </div>
            <div>
                <h4>Yellowflash</h4>
                <ul>
                    <li>O společnosti</li>
                    <li>YELLOWFLASH</li>
                    <li>Spolupracujte s námi</li>
                    <li>Naše prodejny</li>
                    <li>Tisk</li>

                </ul>
            </div>
            <div className={"footer__socials"}>
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTiktok} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faPinterest} />
            </div>
        </footer>
    );
};

export default Footer;