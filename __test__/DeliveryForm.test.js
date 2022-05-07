import { render, fireEvent } from "@testing-library/react-native";
import DeliveryForm from "../components/inleverans/DeliveryForm";

const route = { params: false };
const navigation = {navigate: jest.fn() }

let delivery = {product_id: 1000, delivery_date: "2022-05-03", amount: 20, comment: "Test"};
const setDelivery = (newDelivery) => {
    delivery = newDelivery;
};

let currentProduct = {};
const setCurrentProduct = (newProduct) => {
    currentProduct = newProduct;
};

let productsHome = {}
const setProductsHome = (newProduct) => {
    productsHome = newProduct;
};

const addDelivery = jest.fn();
const removeNan = jest.fn();
const zeroPad = jest.fn();
const formatDate = jest.fn();
const ProductDropDown = jest.fn();
const DateDropDown = jest.fn();




test("testing to fill out a delivery form", async () => {
    const { getByText, getByTestId, getByA11yLabel } = render(<DeliveryForm
        route={route}
        navigation={navigation}
        setProductsHome={setProductsHome}
        delivery={delivery}
        setDelivery={setDelivery}
    />);

    const header1 = await getByText("Ny inleverans");
    expect(header1).toBeDefined();

    const header2 = await getByText("Produkt");
    expect(header2).toBeDefined();

    const header3 = await getByText("Antal");
    expect(header3).toBeDefined();

    const header4 = await getByText("Datum");
    expect(header4).toBeDefined();

    const header5 = await getByText("Kommentar");
    expect(header5).toBeDefined();


    const amountField = await getByTestId("amount-field");
    const commentField = await getByTestId("comment-field");

    expect(amountField).toBeDefined();
    expect(commentField).toBeDefined();


    const a11yLabel = "Tryck för att registrera inleveransen";
    const submitButton = getByA11yLabel(a11yLabel);
    expect(submitButton).toBeDefined();



    // fireEvent.press(submitButton);
    // expect(addDelivery).toHaveBeenCalled();

    // fireEvent.press(submitButton);
    // expect(navigation.navigate).toHaveBeenCalled();
})
