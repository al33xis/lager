/* global test, expect */

// I Lagerförteckningen ska det finnas en lista med produkter. Listan ska innehålla produktens namn och lagersaldo.

import { render } from "@testing-library/react-native";
import StockList from "../components/lager/StockList";

const products = [
    {name: "Shampoo", stock: 2},
    {name: "Balsam", stock: 3},
    {name: "Tvål", stock: 15},
];

const setProducts = () => false;

test('List should contain three items', async () => {
    const { getByText, debug } = render(<StockList products={products} setProducts={setProducts} />);

    const shampoo = await getByText('Shampoo', { exact: false });
    const balsam = await getByText('Balsam', { exact: false });
    const soap = await getByText('Tvål', { exact: false });

    expect(shampoo).toBeDefined();
    expect(balsam).toBeDefined();
    expect(soap).toBeDefined();

    expect(products[0].stock).toEqual(2);
    expect(products[1].stock).toEqual(3);
    expect(products[2].stock).toEqual(15);


    // debug("StockList component");
});