import { render, screen } from '@testing-library/react';
import Options from '../Options';
import { expect } from 'vitest';
test('스쿱 이미지를 서버로부터 받아와 랜더링', async () => {
  render(<Options optionType="scoops" />);

  // Find Image
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // alt text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});

test('토핑 이미지를 서버로부터 받아와 랜더링', async () => {
  render(<Options optionType="toppings" />);

  // Find Image
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);
  // alt text of images
  const altText = toppingImages.map((el) => {
    return el.alt;
  });
  expect(altText).toEqual(['M&Ms topping', 'Hot fudge topping']);
});
