import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import OrderEntry from '../OrderEntry';

test('Update Scoop subtotal', async () => {
  const user = userEvent.setup();
  render(
    <OrderDetailsProvider>
      <Options optionType="scoops" />
    </OrderDetailsProvider>
  );

  // init : make sure total starts out at $0.00
  // exact 옵션은 기본적으로 true -> 모든 문자열이 포함되지 않아도 찾을 수 있게 exact 옵션을 끕니다.
  // $ 뒤에 숫자가 오기 때문
  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  // update : 바닐라 스쿱 1증가 후 subtotal 체크
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await userEvent.clear(vanillaInput);
  await user.type(vanillaInput, '1'); //  type: (element: Element, text: string , ... ) 숫자입력이어도 string
  expect(scoopsSubTotal).toHaveTextContent('2.00');

  // 초콜릿 스쿱 2증가 후 subtotal 체크
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');
  expect(scoopsSubTotal).toHaveTextContent('6.00');
});

test('Update toppings subtotal', async () => {
  const user = userEvent.setup();
  render(
    <OrderDetailsProvider>
      <Options optionType="toppings" />
    </OrderDetailsProvider>
  );

  // init : make sure total starts out at $0.00
  // exact 옵션은 기본적으로 true -> 모든 문자열이 포함되지 않아도 찾을 수 있게 exact 옵션을 끕니다.
  // $ 뒤에 숫자가 오기 때문
  const scoopsSubTotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const MMsInput = await screen.findByRole('checkbox', {
    name: /M&Ms/i,
  });
  await user.click(MMsInput); //  type: (element: Element, text: string , ... ) 숫자입력이어도 string
  expect(scoopsSubTotal).toHaveTextContent('1.50');

  const pudgeInput = await screen.findByRole('checkbox', {
    name: /Hot fudge/i,
  });
  await userEvent.click(pudgeInput);
  expect(scoopsSubTotal).toHaveTextContent('3.00');
});

test('Grand Total Test', async () => {
  render(
    <OrderDetailsProvider>
      <OrderEntry />
    </OrderDetailsProvider>
  );
  const user = userEvent.setup();
  const totalEl = screen.getByText('Grand total', { exact: false });
  expect(totalEl).toHaveTextContent('0.00');

  // update : 바닐라 스쿱 1증가 후 subtotal 체크
  const MMsInput = await screen.findByRole('checkbox', {
    name: /M&Ms/i,
  });
  await user.click(MMsInput); //  type: (element: Element, text: string , ... ) 숫자입력이어도 string
  expect(totalEl).toHaveTextContent('1.50');

  // 초콜릿 스쿱 2증가 후 subtotal 체크
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');
  expect(totalEl).toHaveTextContent('5.5');
});
