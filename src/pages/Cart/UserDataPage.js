import React, {useRef, useState} from 'react';
import CartDashboard from "./CartDashboard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import InputText from "../../components/InputText";
import {motion} from "framer-motion"

const UserDataPage = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [company, setCompany] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [zipcodeError, setZipcodeError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)

    const dispatch = useDispatch();
    const setDeliveryInfo = (email, name, surname, company = "", address, city, zipcode, country, phone) => {
        dispatch(billingInfoActions.setDeliveryInfo({
            email, name, surname, company, address, city, zipcode, country, phone
        }))
    }

    //todo: využít to xd
    const billingInformation = useSelector((state) => state.billingInfo.deliveryInformation)


    const navigate = useNavigate();
    return (
        <motion.div className={"cart-page"}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}>
            <span style={{textAlign:"center"}}> YELLOWFLASH.COM <span className="slash">/</span> DORUČOVACÍ ÚDAJE</span>
            <h1>DORUČOVACÍ ÚDAJE</h1>
            <div className="cart-page__container">
                <form className={"cart-page__form"}>
                    <div className={"form__wrapper"}>
                        <h2>Osobní údaje</h2>
                        <br/>
                        <InputText options={{
                            placeholder: "Email *",
                            name: "email",
                            initialValue: billingInformation.email,
                            regexString: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            setError: setEmailError,
                            error: emailError,
                            setParentValue: setEmail

                        }}/>
                        <InputText options={{
                            placeholder: "Telefon *",
                            name: "phone",
                            initialValue: billingInformation.phone,
                            regexString: /^(\d{9})$/,
                            setError: setPhoneError,
                            error: phoneError,
                            setParentValue: setPhone

                        }}/>
                    </div>
                    <div className={"form__wrapper"}><h2>Doručovací údaje</h2>
                        <div className={"input__wrapper"}>
                            <InputText options={{
                                placeholder: "Jméno *",
                                name: "given-name",
                                initialValue: billingInformation.name,
                                regexString:  /^[a-zA-Zá-žÁ-Ž]{3,20}\s?$/,
                                setError: setNameError,
                                error: nameError,
                                setParentValue: setName

                            }}/>
                            <InputText options={{
                                placeholder: "Příjmení *",
                                name: "family-name",
                                initialValue: billingInformation.surname,
                                regexString:  /^[a-zA-Zá-žÁ-Ž]{3,20}\s?$/,
                                setError: setSurnameError,
                                error: surnameError,
                                setParentValue: setSurname

                            }}/>
                        </div>
                        <InputText options={{
                            placeholder: "Firma",
                            name: "organization",
                            initialValue: billingInformation.company,
                            setParentValue: setCompany

                        }}/>
                        <InputText options={{
                            placeholder: "Adresa *",
                            name: "address-line1",
                            initialValue: billingInformation.address,
                            regexString: /(.|\s)*\S(.|\s)*/,
                            setError: setAddressError,
                            error: addressError,
                            setParentValue: setAddress

                        }}/>
                        <div className={"input__wrapper"}>
                            <InputText options={{
                                placeholder: "Město *",
                                name: "city",
                                initialValue: billingInformation.city,
                                regexString: /(.|\s)*\S(.|\s)*/,
                                setError: setCityError,
                                error: cityError,
                                setParentValue: setCity

                            }}/>
                            <InputText options={{
                                placeholder: "PSČ *",
                                name: "postal-code",
                                initialValue: billingInformation.zipcode,
                                regexString: /^\d{3}(?:[- ]?\d{2})?$/,
                                setError: setZipcodeError,
                                error: zipcodeError,
                                setParentValue: setZipcode
                            }}/>
                        </div>
                        <select onInput={(e)=>{
                            setCountry(e.currentTarget.value)
                        }} name="country" id="">
                            <option value="CZ">Česká Republika</option>
                        </select></div>

                </form>
                <CartDashboard options={{
                    text: "Výběr způsobu dopravy",
                    onClickEvent: (e) => {
                        e.preventDefault()
                        if(emailError || nameError || surnameError || addressError || cityError || zipcodeError || phoneError) return
                        setDeliveryInfo(email,name,surname,company,address,city,zipcode,country,phone)
                        navigate("../shipping")
                    },
                    disabled: false
                }}/>
            </div>
        </motion.div>
    );
};

export default UserDataPage;