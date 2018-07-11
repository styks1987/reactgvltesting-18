/** @format */

// http://devexpress.github.io/testcafe/documentation/test-api/
// http://devexpress.github.io/testcafe/documentation/test-api/actions/
// http://devexpress.github.io/testcafe/documentation/test-api/assertions/#assertion-structure
import {Selector} from 'testcafe'; // first import testcafe selectors

fixture`Loading Index`.page`http://localhost:8080/`;

//then create a test and place your code there
test('Test Form Validates', async t => {
    await t.resizeWindow(760, 700);

    const errorSelector = Selector('.alert.alert-danger.alert-email');
    const emailInput = Selector('.form [name="email"]');
    const validateFormButton = Selector('.form .validate-form');

    await t
        .setTestSpeed(0.1)
        .typeText(emailInput, 'invalidemail')
        .click(validateFormButton);

    await t.expect(errorSelector.innerText).eql('Your email is invalid');

    await t
        .typeText(emailInput, 'passingemail@domain.com', {replace: true})
        .click(validateFormButton);

    await t.expect(errorSelector.exists).notOk(false);
});

//then create a test and place your code there
test('Test Complex Form Validates', async t => {
    await t.resizeWindow(760, 700);

    const formSelector = Selector('.complex-form');
    const nameError = formSelector.find('.alert-name');
    const nameInput = formSelector.find('[name="name"]');
    const emailError = formSelector.find('.alert-email');
    const emailInput = formSelector.find('[name="email"]');
    const validateFormButton = formSelector.find('.validate-form');

    await t
        .setTestSpeed(0.1)
        .typeText(emailInput, 'invalidemail')
        .click(validateFormButton);

    await t.expect(emailError.innerText).eql('Your email is invalid');

    await t
        .typeText(emailInput, 'passingemail@domain.com', {replace: true})
        .click(validateFormButton);

    await t.expect(emailError.exists).notOk();
    await t.expect(nameError.exists).ok();

    await t.typeText(nameInput, 'Michael').click(validateFormButton);

    await t.expect(emailError.exists).notOk();
    await t.expect(nameError.exists).notOk();
});
