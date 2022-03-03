import { MinusCircle, PlusCircle, ShoppingCart, SignIn, XCircle } from 'phosphor-react';
import React from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';
import Button from '../ui-components/Button';
import './Cart.scss';

const Cart: FC = () => {
    const { cart, auth } = useSelector((state: any) => state);
    const { items, totalQuantity, totalAmount } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const addItemHandler = (item: any) => {
        dispatch(cartActions.addItemToCart(item));
    };

    const removeItemHandler = (id: string) => {
        dispatch(cartActions.removeItemFromCart(id));
    };

    const deleteItemHandler = (id: string) => {
        dispatch(cartActions.deleteItemFromCart(id));
    };

    return (
        <section className="cart">
            <div className="cart__container">
                <header className="cart__header">
                    <div className="cart__header-box">
                        <h2>Your CART</h2>
                        <ShoppingCart />
                    </div>
                    {totalQuantity > 0 && <p>{totalQuantity} Items</p>}
                </header>
                <ul className="cart__content">
                    {items.length > 0 &&
                        items.map((item: any, i: number) => (
                            <li key={i} className="cart__item">
                                <img
                                    onClick={() => navigate(`/product/${item.slug}/${item.id}`)}
                                    className="cart__item--image"
                                    src={`${process.env.REACT_APP_RESOURCES_URL}/images/products//${item.image}`}
                                    alt={item.name}
                                ></img>
                                <div className="cart__item--info-box">
                                    <h3>{item.name}</h3>
                                    <span>Price: {`$${(item.price / 100).toFixed(2)}`}</span>
                                    <span>
                                        Total Price: {`$${(item.totalPrice / 100).toFixed(2)}`}
                                    </span>
                                    <div className="cart__item--quantity">
                                        <PlusCircle
                                            onClick={addItemHandler.bind(null, {
                                                ...item,
                                            })}
                                        />
                                        <span>{item.quantity}</span>
                                        <MinusCircle
                                            onClick={removeItemHandler.bind(null, item.id)}
                                        />
                                    </div>
                                </div>
                                <XCircle onClick={deleteItemHandler.bind(null, item.id)} />
                            </li>
                        ))}
                    {totalQuantity === 0 && (
                        <li key={Math.random()} className="cart__item cart__item--empty">
                            <p>Your cart is empty.. Go and buy something!😉</p>
                            <Button link to="/products">
                                back to store
                            </Button>
                        </li>
                    )}
                </ul>
                <footer className="cart__footer">
                    {totalAmount > 0 && (
                        <>
                            <Button link to="/products" inverse>
                                Back to store
                            </Button>
                            <p>Total amount: {`$${(totalAmount / 100).toFixed(2)}`}</p>
                            <Button
                                icon={<SignIn className="cart__footer-icon" />}
                                link
                                to={auth.isLoggedIn ? '/payment' : '/auth'}
                                inverse
                                state={{ from: pathname }}
                            >
                                Checkout
                            </Button>
                        </>
                    )}
                </footer>
            </div>
        </section>
    );
};

export default Cart;
