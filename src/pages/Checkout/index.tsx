import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Product, FormValues } from '../../types';
import styles from './Checkout.module.css';

type CheckoutProps = {
  shoppingCartProducts: Product[];
  emptyCart: () => void
};

const INITIAL_STATE = {
  name: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereço: '',
};

function Checkout({ shoppingCartProducts, emptyCart }: CheckoutProps) {
  const [formInfo, setFormInfo] = useState<FormValues>(INITIAL_STATE);
  const { nome, email, cpf, telefone, cep, endereço, pagamento } = formInfo;
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome
      || !email
      || !cpf
      || !telefone
      || !cep
      || !endereço
      || !pagamento) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
      emptyCart();
      navigate('/');
    }
  };

  return (
    <form className={ styles.container } onSubmit={ onSubmit }>
      <div className={ styles.containerProduct }>
        <h1 className={ styles.title }>Revise seus produtos</h1>
        {shoppingCartProducts.map((product) => (
          <div className={ styles.product } key={ product.id }>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>
              {product.title}
            </p>
            <p className={ styles.price }>
              {`R$ ${product.price.toFixed(2)}`}
            </p>
          </div>
        ))}
        <div />
      </div>
      <section className={ styles.containerUserData }>
        <h2 className={ styles.title }>Informações do comprador</h2>
        <div className={ styles.inputs }>
          <label htmlFor="nome">
            <input
              id="nome"
              placeholder="Nome"
              type="text"
              name="nome"
              data-testid="checkout-fullname"
              onChange={ onChange }
              value={ nome }
              className={ styles.input }
            />
          </label>
          <label htmlFor="email">
            <input
              className={ styles.input }
              id="email"
              placeholder="E-mail"
              type="email"
              name="email"
              data-testid="checkout-email"
              onChange={ onChange }
              value={ email }
            />
          </label>
          <label htmlFor="cpf">
            <input
              id="cpf"
              placeholder="CPF"
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              onChange={ onChange }
              value={ cpf }
              className={ styles.input }
            />
          </label>
          <label htmlFor="telefone">
            <input
              id="telefone"
              placeholder="Telefone"
              type="text"
              name="telefone"
              data-testid="checkout-phone"
              onChange={ onChange }
              value={ telefone }
              className={ styles.input }
            />
          </label>
          <label htmlFor="cep">
            <input
              id="cep"
              placeholder="CEP"
              type="text"
              name="cep"
              data-testid="checkout-cep"
              onChange={ onChange }
              value={ cep }
              className={ styles.input }
            />
          </label>
          <label htmlFor="endereço">
            <input
              id="endereço"
              placeholder="Endereço"
              type="text"
              name="endereço"
              data-testid="checkout-address"
              onChange={ onChange }
              value={ endereço }
              className={ styles.input }
            />
          </label>
        </div>
      </section>
      <section className={ styles.containerPayment }>
        <h2 className={ styles.title }>Forma de pagamento</h2>
        <div className={ styles.paymentOption }>
          <label htmlFor="boleto">
            <input
              data-testid="ticket-payment"
              type="radio"
              name="pagamento"
              id="boleto"
              value="boleto"
              checked={ pagamento === 'boleto' }
              onChange={ onChange }
            />
            Boleto
          </label>
          <FontAwesomeIcon icon={ faBarcode } size="2xl" style={ { color: '#31c28d' } } />
        </div>
        <h2 className={ styles.subtitle }>Cartão de Crédito:</h2>
        <label htmlFor="visa">
          <input
            data-testid="visa-payment"
            type="radio"
            name="pagamento"
            id="visa"
            value="visa"
            checked={ pagamento === 'visa' }
            onChange={ onChange }
          />
          Visa
        </label>
        <FontAwesomeIcon
          icon={ faCreditCard }
          size="2xl"
          style={ { color: '#31c28d' } }
        />
        <label htmlFor="master">
          <input
            data-testid="master-payment"
            type="radio"
            name="pagamento"
            id="master"
            value="master"
            checked={ pagamento === 'master' }
            onChange={ onChange }
          />
          Master
        </label>
        <FontAwesomeIcon
          icon={ faCreditCard }
          size="2xl"
          style={ { color: '#31c28d' } }
        />
        <label htmlFor="elo">
          <input
            data-testid="elo-payment"
            type="radio"
            name="pagamento"
            id="elo"
            value="elo"
            checked={ pagamento === 'elo' }
            onChange={ onChange }
          />
          Elo
        </label>
        <FontAwesomeIcon
          icon={ faCreditCard }
          size="2xl"
          style={ { color: '#31c28d' } }
        />

      </section>
      { errorMsg && <p
        className={ styles.invalidText }
        data-testid="error-msg"
      >
        Campos inválidos

                    </p>}
      <button
        data-testid="checkout-btn"
        type="submit"
        className={ styles.buttonBuy }
      >
        COMPRAR
      </button>
    </form>
  );
}

export default Checkout;
