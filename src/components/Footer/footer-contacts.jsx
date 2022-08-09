import { email, geo, phone, skype } from "./footer-icons";

const footerContacts = [
    {
        name: 'phone',
        icon: phone,
        desc: `8 (800) 000 00 00`,
    },
    {
        name: 'email',
        icon: email,
        desc: `inbox@mail.ru`,
    },
    {
        name: 'skype',
        icon: skype,
        desc: `tu.train.tickets`,
    },
    {
        name: 'geo',
        icon: geo,
        desc: `г. Москва
                        <br />
                        ул. Московская 27-35
                        <br />
                        555 555`
    }
]

export default footerContacts;
