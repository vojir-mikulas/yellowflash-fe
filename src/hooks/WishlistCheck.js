import {useSelector} from "react-redux";

const useWishlistCheck = (id) => {
    const wishlist = useSelector((state) => state.wishlist.itemList)

    const existingItem = wishlist.find((item) => (item.id === id));
    return !!existingItem;
}
export default useWishlistCheck