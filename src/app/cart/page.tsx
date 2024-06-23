'use client';
import { useState } from 'react';
import { Heading } from '@/UI/basic/Heading';
import { CartContent } from '@/modules/Cart';
import { FinalModal } from '@/components/FinalModal';
import { useAppDispatch } from '@/redux/hooks';
import { deleteAllItems } from '@/redux/cart/cartSlice';
import { PagesWrapper } from '@/components/PagesWrapper';
import css from '../../styles/pages/Cart.module.scss';

const Cart = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    setOpen(false);
  };

  return (
    <PagesWrapper title="Nostra pizza - Кошик">
      <div className={css.cartWrapper}>
        <Heading>Кошик</Heading>
        <CartContent
          deleteAllProducts={deleteAllProducts}
          openModal={openModal}
        />
        {open && <FinalModal finalAction={deleteAllProducts} />}
      </div>
    </PagesWrapper>
  );
};

export default Cart;
