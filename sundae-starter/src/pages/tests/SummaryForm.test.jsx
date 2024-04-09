import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../summary/SummaryForm';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);
  const checkBoxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmBtnElement = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(checkBoxElement).not.toBeChecked();
  expect(confirmBtnElement).toBeDisabled();
});

test('체크박스 체크 후, 버튼 enabled', () => {
  render(<SummaryForm />);
  const checkBoxElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmBtnElement = screen.getByRole('button', {
    name: /confirm order/i,
  });
  fireEvent.click(checkBoxElement);
  expect(confirmBtnElement).toBeEnabled();

  fireEvent.click(checkBoxElement);
  expect(confirmBtnElement).not.toBeEnabled();
});

test('약관 팝업 노출', async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const nullPopContent = screen.queryByText('실제로는 제공되지 않습니다');

  expect(nullPopContent).not.toBeInTheDocument();

  const linkElement = screen.getByRole('button', {
    name: /terms and conditions/i,
  });
  await user.hover(linkElement);

  const popContent = screen.getByText('실제로는 제공되지 않습니다');
  expect(popContent).toBeInTheDocument();

  await user.unhover(linkElement);
  expect(popContent).not.toBeInTheDocument();
});
