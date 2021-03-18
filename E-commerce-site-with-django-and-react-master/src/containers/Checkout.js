import React, { Component } from "react";

import {
    Button,
    Container,
    Dimmer,
    Divider,
    Form,
    Header,
    Image,
    Item,
    Label,
    Loader,
    Message,
    Segment,
    Select
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { authAxios } from "../utils";
import { addressUrl, addresscreate, countries, UserID } from '../constants'

import { injectStripe, CardElement } from 'react-stripe-elements';



import {
    checkoutURL,
    orderSummaryURL,
    addCouponURL,
    addressListURL
} from "../constants";

class CheckoutForm extends Component {

    componentDidMount() {
        this.handleFetchAdressBilling()
        this.handleFetchAdressShipping()

    }

    state = {

        loading: false,
        error: null,
        success: false,
        BillingAdress: [],
        Shippinfdress: [],
        selectedBillingadress: "",
        selectedShipingadress: ""


    }

    handlegetDefault = address => {
        const filterAddress = address.filter(el => el.default === true);
        if (filterAddress.length > 0) {
            return filterAddress[0].id
        }
        return "";

    }

    handleSelectChange = (e, { name, value }) => {
        console.log('this is name', name)
        console.log('this is value', value)
        this.setState({ [name]: value })
    }

    submit = ev => {
        ev.preventDefault();
        this.setState({ loading: true });
        let { token } = this.props.stripe.createToken();
        authAxios.post("api/handle-payment", { token: token.id })
            .then(res => {
                this.setState({ loading: false, success: true })
            })

    }

    handleFetchAdressBilling = () => {
        this.setState({ loading: true })
        authAxios(addressUrl("B"))
            .then(res => {
                this.setState({
                    BillingAdress: res.data.map(a => {
                        console.log(a)
                        return {
                            key: a.id,
                            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
                            value: a.id
                        };
                    }),
                    selectedShipingadress: this.handlegetDefault(res.data),
                    loading: false
                });

            })
            .catch(err => {

                this.setState({ error: err, loading: false })

            })
    }

    handleFetchAdressShipping = () => {
        this.setState({ loading: true })
        authAxios(addressUrl('S'))
            .then(res => {
                this.setState({
                    Shippinfdress: res.data.map(a => {
                        return {
                            key: a.id,
                            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
                            value: a.id
                        };
                    }),
                    selectedBillingadress: this.handlegetDefault(res.data),
                    loading: false
                });

            })
            .catch(err => {

                this.setState({ error: err, loading: false })

            })


    }

    render() {
        const { Shippinfdress, BillingAdress, selectedBillingadress, selectedShipingadress } = this.state;


        const options = [
            { key: 1, text: 'Choice 1', value: 1 },
            { key: 2, text: 'Choice 2', value: 2 },
            { key: 3, text: 'Choice 3', value: 3 },
        ]
        console.log(Shippinfdress)
        return (
            <div>
                <Divider />
                <Header>Select a billing adress</Header>
                {BillingAdress.length > 0 ? <Select onChange={this.handleSelectChange} name="selectedBillingadress" value={selectedBillingadress} clearable options={BillingAdress} selection /> : <p>you need to <Link to='/profile'> add adress </Link></p>}

                <Header>Select a shipping adress</Header>
                {Shippinfdress.length > 0 ? <Select onChange={this.handleSelectChange} name="selectedShipingadress" value={selectedShipingadress} clearable options={Shippinfdress} selection /> : <p>you need to <Link to='/profile'> add adress </Link></p>}
                <Divider />
                {Shippinfdress.length < 1 || BillingAdress.length < 1 ? (<p>you need to <Link to='/profile'> add adress </Link></p>) :
                    <React.Fragment>
                        <Header>do you want to continue with this</Header>

                    </React.Fragment>
                }





            </div>
        )
    }
}


const InjectedForm = injectStripe(CheckoutForm);



export default CheckoutForm;
