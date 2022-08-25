import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../redux/cart-slice";
import './style.css'
import {wishlistActions} from "../../redux/wishlist-slice";
import useWishlistCheck from "../../hooks/WishlistCheck";
import SizeHelper from "./sizeHelper";
import CompositionDetails from "./compositionDetails";

const ItemDetail = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true)
    const [allSizes, setAllSizes] = useState([]);
    const sizeSelect = useRef(null)
    const {id} = useParams();

    const [sizehelperVisibility,setSizehelperVisibility] = useState(false)
    const [compositiondetailsVisibility,setCompositiondetailsVisibility]  = useState(false)
    const navigate = useNavigate()
    const isInWishlist = useWishlistCheck(item.id)

    const dispatch = useDispatch();
    const addToCart = (id, size) => {
        dispatch(cartActions.addToCart({
            id,
            size,
        }))
    }
    const handleWishlist = (id) => {
        dispatch(wishlistActions.handleWishlist({
            id,
        }))
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/single/${id}`).then(response => {
            if(!response.data) navigate("../error")
            setItem(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);

        })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/sizes?category=tshirt`).then(response => {
            setAllSizes(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }, [])
    if (loading) return (<h1>loading...</h1>)
    return (
        <main className={"wrapper"}>
            {sizehelperVisibility && <SizeHelper setVisibility={setSizehelperVisibility}/>}
            {compositiondetailsVisibility && <CompositionDetails setVisibility={setCompositiondetailsVisibility}/>}
            <div className={"itemDetail"}>
                {item.images.length !== 0 ? item.images.map((image) => {
                    return (
                        <img className="itemDetail__image" key={image.url} src={`${process.env.REACT_APP_SERVER_URL}/${image.url}`}
                             alt={image.url}/>)
                }) : ""}
                <div className="itemDetail__description">
                    <div className={"itemDetail__description--container"}>
                        <h2>{item.name}</h2>
                        <span className={"itemDetail__description__price"}>{`CZK${item.price}`}</span>
                        <div className={"itemDetail__description__detail"}>
                            <h3>Detaily produktu</h3>
                            <p> {item.details}</p>
                        </div>
                        <span onClick={()=>{setCompositiondetailsVisibility(true)}}className={"itemDetail__description__clickable"}>SLOŽENÍ</span>
                        <div className={"itemDetail__description__sizes"}>
                            <h3>Velikost</h3>
                            <select ref={sizeSelect}>
                                {allSizes.map((size) => (
                                    <option key={size.id} value={size.size}>{size.size}</option>
                                ))}
                            </select><br/>
                            <span onClick={()=>{setSizehelperVisibility(true)}} className={"itemDetail__description__clickable"}>nápověda ohledně velikostí</span>
                        </div>
                       <div className={"itemDetail__description__buttons"}>
                           <button className={"itemDetail__description__cartButton"} onClick={() => {
                               addToCart(item.id, sizeSelect.current.value)
                           }}>Přidat do košíku
                           </button>
                           <button onClick={(e)=>{
                               e.cancelBubble = true;
                               if (e.stopPropagation) e.stopPropagation();
                               handleWishlist(item.id)
                           }} className="like">  {isInWishlist ? <span>❤️</span> :<span>🖤</span>}  </button>
                       </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default ItemDetail;