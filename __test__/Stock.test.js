import { render } from "@testing-library/react-native";
import Stock from "../components/lager/Stock";

// I appen ska det finnas en Lagerförteckning med en rubrik Lagerförteckning.

jest.mock("../components/lager/StockList", () => "StockList");

test('header should exist and contain text Lagerförteckning', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});
