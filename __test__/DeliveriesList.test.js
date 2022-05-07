import { render, fireEvent } from "@testing-library/react-native";
import DeliveriesList from "../components/inleverans/DeliveriesList";

// const navigation = () => false;
const route = { params: false };
const navigation = {navigate: jest.fn() }

const allDeliveries = {};
const setAllDeliveries = (newDelivery) => {
    allDeliveries = newDelivery;
};

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({id: 1, product_id: 10, product_name: "test", amount: 100, delivery_date: "2022-05-05", comment: ""})
    })
});

test("testing the deliveries list stack screen has header and working button", async () => {
    const { getByText, getByTestId, getByA11yLabel} = render( <DeliveriesList 
        navigation={navigation}
        route={route}
    />);

    const header = await getByText("Inleveranser");
    expect(header).toBeDefined();

    const a11yLabel = "Tryck för att skapa en inleverans";
    const submitButton = getByA11yLabel(a11yLabel);
    expect(submitButton).toBeDefined();

    fireEvent.press(submitButton);
    expect(navigation.navigate).toHaveBeenCalled();
})
