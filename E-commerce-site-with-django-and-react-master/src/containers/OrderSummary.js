import React from "react";
import {
    Container,
    Dimmer,
    Header,
    Icon,
    Image,
    Label,
    Loader,
    Table,
    Button,
    Message,
    Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authAxios } from "../utils";
import { orderSummaryURL, deleteItem, removefromcart, addToCartURL } from "../constants";


class OrderSummary extends React.Component {
    state = {
        data: null,
        error: null,
        loading: false
    };

    componentDidMount() {
        this.handleFetchOrder();
    }

    handleFetchOrder = () => {
        this.setState({ loading: true });
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                console.log(res)
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {


                this.setState({ error: err, loading: false });

            });
    };

    renderVariation = orderitem => {
        let text = '';
        orderitem.item_variations.forEach(iv => {
            text += `${iv.variation.name} : ${iv.value}`
        })
        return text
    }


   
    handleFormatData = itemVariations => {
        // convert {colour: 1, size: 2} to [1,2] - they're all variations
        return Object.keys(itemVariations).map(key => {
            return itemVariations[key].id;
        });
    };

    handleAddToCart = (slug, itemVariations) => {
        this.setState({ loading: true });
        const { formData } = this.state;
        const variations = this.handleFormatData(itemVariations)
        authAxios
            .post(addToCartURL, { slug, variations })
            .then(res => {
                this.handleFetchOrder();
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleremoveItem = itemId => {
        authAxios.delete(deleteItem(itemId))
            .then(res => {
                this.handleFetchOrder()
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }

    handleremovefromcart = (slug) => {

        authAxios.post(removefromcart, { slug })
            .then(res => {
                this.handleFetchOrder()
            })
            .catch(err => {
                this.setState({ error: err })
            })


    }


    render() {
        const { data, error, loading } = this.state;
        const { isAuthenticated } = this.props;

        console.log(data);

        return (
            <Container>
                <Header>Order Summary</Header>
                {error && (
                    <Message
                        error
                        header="There was an error"
                        content={JSON.stringify(error)}
                    />
                )}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                )}
                {data && (
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Item #</Table.HeaderCell>
                                <Table.HeaderCell>Item name</Table.HeaderCell>
                                <Table.HeaderCell>Item price</Table.HeaderCell>
                                <Table.HeaderCell>Item quantity</Table.HeaderCell>
                                <Table.HeaderCell>Total item price</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.order_items.map((order, i) => {
                                return (
                                    <Table.Row key={order.id}>
                                        <Table.Cell>{i}</Table.Cell>
                                        <Table.Cell>{order.item.title} - {this.renderVariation(order)}</Table.Cell>
                                        <Table.Cell>{order.item.price}</Table.Cell>
                                        <Table.Cell>{order.quantity}
                                            <Icon name="plus"
                                                color="orange"
                                                style={{ float: 'right', cursor: 'pointer' }}
                                                onClick={() => this.handleAddToCart(order.item.slug, order.item_variations)}
                                            />
                                            <Icon name="minus"
                                                color="brown"
                                                style={{ float: 'right', cursor: 'pointer' }}
                                                onClick={() => this.handleremovefromcart(order.item.slug)}
                                            />
                                        </Table.Cell>
                                        {order.final_price}
                                        <Icon name="trash"
                                            color="red"
                                            style={{ float: 'right', cursor: 'pointer' }}
                                            onClick={() => this.handleremoveItem(order.id)}
                                        />
                                    </Table.Row>

                                )

                            })}
                        </Table.Body>

                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell />

                        <Table.Cell colSpan="2" textAlign="center">
                            Total: ${data.total}
                        </Table.Cell>

                        <Table.Footer>
                            <Table.Row>

                                <Table.HeaderCell colSpan="5">

                                    <Link to="/checkout">
                                        <Button floated="right" color="yellow">
                                            Checkout
                    </Button>
                                    </Link>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default OrderSummary;
