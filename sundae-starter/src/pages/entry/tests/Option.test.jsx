import { render, screen } from '@testing-library/react';
import Options from '../Options';
test('스쿱 이미지를 서버로부터 받아와 랜더링', () => {
  render(<Options optionType="scoops" />);

  // Find Image
  const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // alt text of images
  const altText = scoopImages.map((el) => el.alt);
});
