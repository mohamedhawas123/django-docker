import React, { Component } from 'react';
import { Grid, Divider, Form, Segment, Select, Label, Icon, Table, Dimmer, Button, Loader, Image, Message, Header, Menu, Card } from 'semantic-ui-react'
import { addressUrl, addresscreate, countries, UserID, addressupdate, paymenthistory, deleteressupdate } from '../constants'
import { authAxios } from '../utils'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const UPDATE_FORM = 'UPDATE_FORM';
const CREATE_FORM = 'CREATE_FORM';

class PaymentHistory extends Component {

    state = {
        loading: false,
        payments: [],
        error: null
    }


    componentDidMount() {
        this.handleFectchPayments()
    }

    handleFectchPayments = () => {
        this.setState({ loading: true })
        authAxios.get(paymenthistory)
            .then(res => {
                console.log(res)
                this.setState({ loading: false, payments: res.data })
            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            })
    }

    render() {
        const { payments } = this.state;
        console.log(payments)
        return (
            <React.Fragment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {payments.map(p => {

                            return (<Table.Row key={p.id}>
                                <Table.Cell>{p.id}</Table.Cell>
                                <Table.Cell> ${p.amount}</Table.Cell>
                                <Table.Cell>{new Date(p.timestamp).toUTCString()}</Table.Cell>

                            </Table.Row>)
                        })}

                    </Table.Body>

                </Table>
            </React.Fragment>
        )
    }
}

class AdressForm extends Component {
    state = {
        error: null,
        loading: false,
        formData: {

            address_type: "",
            apartment_address: "",
            country: "",
            default: false,
            id: 2,
            street_address: "",
            user: 1,
            zip: ""
        },
        saveing: false,
        success: false,


    }

    componentDidMount() {
        const { address, formType } = this.props;
        if (formType === UPDATE_FORM) {
            this.setState({ formData: address }, () => {
                console.log(this.state)
            })
        }

    }

    handleSubmit = e => {
        this.setState({ saveing: true })
        e.preventDefault()
        const { formType } = this.props
        if (formType === UPDATE_FORM) {
            this.handlecUpdateAddress()
        } else {
            this.handlecreateAddress()
        }
    }

    handlecreateAddress = () => {
        const { userID, callback, activeItem } = this.props;
        const { formData } = this.state;
        authAxios.post(addresscreate, {
            ...formData,
            user: userID,
            address_type: activeItem === 'Billing Address' ? 'B' : 'S'

        })
            .then(res => {
                this.setState({ saveing: false, success: true, formData: { default: false } })

            })
            .catch(err => {
                this.setState({ error: err, success: true })
            })
    }


    handlecUpdateAddress = () => {
        const { userID, callback, activeItem } = this.props;
        const { formData } = this.state;
        authAxios.put(addressupdate(formData.id), {
            ...formData,
            user: userID,
            address_type: activeItem === 'Billing Address' ? 'B' : 'S'

        })
            .then(res => {
                this.setState({ saveing: false, success: true, formData: { default: false } })

            })
            .catch(err => {
                this.setState({ error: err, success: true })
            })
    }

    handlchangselect = (e, { name, value }) => {
        const { formData } = this.state;
        const update = {
            ...formData,
            [name]: value
        }
        this.setState({
            formData: update
        })
    }

    handleChange = e => {
        const { formData } = this.state;
        const update = {
            ...formData,
            [e.target.name]: e.target.value
        }

        this.setState({
            formData: update
        })
    }
    handleToggle = () => {
        const { formData } = this.state;
        const update = {
            ...formData,
            default: !formData.default
        }

        this.setState({
            formData: update
        })
    }




    render() {
        const { success, saveing, error, formData } = this.state;
        console.log(formData.street_address)
        const { countries } = this.props
        return (
            <Form onSubmit={this.handleSubmit} success={success}>
                <Form.Input value={formData.street_address} onChange={this.handleChange} name='street_address' placeholder='street address' />
                <Form.Input value={formData.apartment_address} onChange={this.handleChange} name='apartment_address' placeholder='apartment address' />
                <Form.Input value={formData.zip} onChange={this.handleChange} name='zip' placeholder='zip' />
                <Select value={formData.country} onChange={this.handlchangselect} options={countries} clearable search name="country" placeholder="country" />
                <Form.Checkbox checked={formData.default} onChange={this.handleToggle} name='default' label='make this default' />
                {success && (
                    <Message success header="Success!" content="that's it" />
                )}
                <Form.Button disabled={saveing} onChange={this.handleChange} primary>Save</Form.Button>
            </Form>
        )
    }
}





class Profile extends Component {
    state = {
        activeItem: 'Billing Address',
        error: null,
        loading: false,
        address: [],
        countries: [],
        saveing: false,
        success: false,
        userID: null,
        selectedAddress: null,



    }

    componentDidMount() {
        this.handleFetchAdress()
        this.handleFetchcountry()
        this.handleFetchUserId()
    }

    handleItemClick = name => {
        this.setState({ activeItem: name }, () => {
            this.handleFetchAdress()

        })
    }



    handleFetchCountries = (countries) => {
        const keys = Object.keys(countries);
        return keys.map(k => {
            return {
                key: k,
                text: countries[k],
                value: k

            }
        })
    }


    handleSelectAddress = address => {
        this.setState({ selectedAddress: address })
    }


    handleFetchUserId = () => {
        this.setState({ loading: true })
        authAxios.get(UserID)
            .then(res => {

                this.setState({ userID: res.data.userId })
            })
            .catch(err => {
                this.setState({ error: err })
            })

    }

    handleFetchcountry = () => {
        this.setState({ loading: true })
        authAxios.get(countries)
            .then(res => {
                this.setState({ countries: this.handleFetchCountries(res.data), loading: false })
            })
            .catch(err => {
                this.setState({ error: err })
            })

    }


    handleFetchAdress = () => {
        this.setState({ loading: true })
        const { activeItem } = this.state;
        authAxios.get(addressUrl(activeItem === 'Billing Address' ? 'B' : 'S'))
            .then(res => {
                this.setState({ address: res.data, loading: false })
            })
            .catch(err => {
                this.setState({ error: err })
            })

    }

    handleCallback = () => {
        this.handleFetchAdress()
        this.setState({ selectedAddress: null })
    }

    handledelete = addressId => {
        authAxios.delete(deleteressupdate(addressId))
            .then(res => {
                this.handleCallback()
            })
            .catch(err => {
                this.setState({ error: err })
            })


    }

    handlegetActiveItem = () => {
        const { activeItem } = this.state;
        if (activeItem === "Billing Address") {
            return "Billing Address"
        } else if (activeItem === "Physical Address") {
            return "Physical Address"
        } else {
            return "Payment History"
        }
    }

    renderAdress = () => {
        const { activeItem, address, error, countries, selectedAddress, saveing, success, userID, loading } = this.state

        return (
            <React.Fragment>
                <Card.Group>
                    {address.map(iv => {
                        return (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header> {iv.street_address}, {iv.apartment_address} </Card.Header>
                                    <Card.Meta>{iv.country}</Card.Meta>
                                    <Card.Description>{iv.zip}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>

                                    <Button color='green' onClick={() => this.handleSelectAddress(iv)} >
                                        Update
          </Button>
                                    <Button color='red' onClick={() => this.handledelete(iv.id)}>
                                        Delete
          </Button>

                                </Card.Content>
                            </Card>


                        );


                    })}

                </Card.Group>
                {address.length > 0 ? <Divider /> : null}
                <AdressForm countries={countries} formType={CREATE_FORM} userID={userID} activeItem={activeItem} />
                {selectedAddress &&
                    <AdressForm callback={this.handleCallback} activeItem={activeItem} userID={userID} countries={countries} address={selectedAddress} formType={UPDATE_FORM} />
                }
            </React.Fragment>
        )
    }



    render() {
        const { activeItem, address, error, countries, selectedAddress, saveing, success, userID, loading } = this.state
        const { isAuthenticated } = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />

        }
        return (

            < Grid container columns={2} divided >
                <Grid.Row columns={1}>
                    <Grid.Column>
                        {error && (
                            <Message
                                error
                                header="There was some errors with your submission"
                                content={JSON.stringify(error)}
                            />
                        )}
                        {loading && (
                            <Segment>
                                <Dimmer active inverted>
                                    <Loader inverted>Loading</Loader>
                                </Dimmer>

                                <Image src="/images/wireframe/short-paragraph.png" />
                            </Segment>
                        )}


                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={"6"}>
                        <Menu pointing vertical floated >
                            <Menu.Item
                                name='Billing Address'
                                active={activeItem === 'Billing Address'}
                                onClick={() => this.handleItemClick('Billing Address')}
                            />
                            <Menu.Item
                                name='Physical Address'
                                active={activeItem === 'Physical Address'}
                                onClick={() => this.handleItemClick('Physical Address')}
                            />
                            <Menu.Item
                                name='Payment History'
                                active={activeItem === 'Payment History'}
                                onClick={() => this.handleItemClick('Payment History')}
                            />

                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={"10"}>
                        <Header>{this.handlegetActiveItem()}</Header>
                        <Divider />
                        {activeItem === "Payment History" ? (
                            <React.Fragment>
                                <PaymentHistory />
                            </React.Fragment>
                        ) : (this.renderAdress())}
                        <Divider />



                    </Grid.Column>

                </Grid.Row>
            </Grid >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Profile)
