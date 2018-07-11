```jsx
/** @format */

import {Selector, ClientFunction} from 'testcafe'; // first import testcafe selectors

import {createCartLoginAccount} from '../utilities/index';

fixture`Loading Preconfigured Tool`
    .page`https://lc.v2frontier.com/legacy/orders/rebuild-order-from-url?is_variable_data=0&is_variable_print_only=0&is_printed_proof_only=0&is_new_standard_shape_size=0&is_new_custom_shape_size=0&is_square_corners=0&custom_width=2&custom_length=2&custom_shape=2&size_id=15&substrate_id=1&laminate_id=1&color_id=3&processing_id=1&proof_type_id=1&roll_direction_id=0&form_factor_id=1&total_qty=5000&design_qty=1&pantone_qty=0`;

//then create a test and place your code there
test('Test Create Account In Cart', async t => {
    await t.resizeWindow(920, 800);

    const testId = new Date().getTime();
    const getPageurl = ClientFunction(() => window.location.href);

    await t
        .click('#next_step')
        .click('#next_step')
        .click('.skip-artwork-upload')
        .click('#next_step')
        .click('#add_to_cart')
        .click('.beta-cart-checkout-button');

    await createCartLoginAccount(t, testId);

    const stateDropdown = Selector('[data-ref-name="state"]');

    await t
        .expect(getPageurl())
        .contains('carts')
        .typeText('[data-ref-name="company"]', 'My Company')
        .typeText('[data-ref-name="first_name"]', 'McFirsty')
        .typeText('[data-ref-name="last_name"]', 'McLasty')
        .typeText('[data-ref-name="address1"]', '1952 Walnut Grove Church Rd')
        .typeText('[data-ref-name="city"]', 'Montvale')
        .click(stateDropdown)
        .click(stateDropdown.find('option').withText('Virginia'))
        .typeText('[data-ref-name="zip"]', '24122')
        .typeText('[data-ref-name="email"]', 'testing@goobers.com')
        .typeText('[data-ref-name="phone"]', '1231231233')
        .click('[data-ref-add="add_address"]');

    await t
        .click(Selector('.btn.btn-primary').withText('Add New Address'))
        .typeText('[data-ref-name="company"]', 'Shipping Co')
        .typeText('[data-ref-name="first_name"]', 'AnotherFirst')
        .typeText('[data-ref-name="last_name"]', 'AnotherLast')
        .typeText('[data-ref-name="address1"]', '15 Corgi Dr')
        .typeText('[data-ref-name="city"]', 'Simpsonville')
        .click(stateDropdown)
        .click(stateDropdown.find('option').withText('South Carolina'))
        .typeText('[data-ref-name="zip"]', '29680')
        .typeText('[data-ref-name="email"]', 'testingshipping@goobers.com')
        .typeText('[data-ref-name="phone"]', '4444444444')
        .click('[data-ref-add="add_address"]');

    debugger;

    await t
        .setTestSpeed(0.1)
        .click(new Selector('.shipping-option').withText('UPS Ground'))
        .setTestSpeed(1);

    const expMonthDropdown = Selector('[data-ref-name="expires_month"]');
    const expYearDropdown = Selector('[data-ref-name="expires_year"]');

    await t
        .typeText('[data-ref-name="account_number"]', '4242424242424242')
        .typeText('[data-ref-name="card_code"]', '123')
        .click(expMonthDropdown)
        .click(expMonthDropdown.find('option:nth-child(3)'))
        .click(expYearDropdown)
        .click(expYearDropdown.find('option:nth-child(3)'))
        .click(Selector('.btn.btn-success').withText('Verify Payment'))
        .click(Selector('.btn.btn-success').withText('Purchase'));

    await t
        .expect(getPageurl())
        .contains('cart_confirmation')
        .expect(Selector('p').withText('Your purchase is complete!').exists)
        .ok();

    const goBack = ClientFunction(() => window.history.back());
    await goBack();

    await t.expect(getPageurl()).match(/.*\/cart\/$/, {timeout: 5000});
});
```