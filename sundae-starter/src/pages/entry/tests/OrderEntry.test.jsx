import { logRoles, render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { HttpResponse, http } from 'msw';
import { server } from '../../../../mocks/server'; // override
import { expect } from 'vitest';

test('Error for scoops and toppings routes', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
  //
  const { container } = render(<OrderEntry />);

  const alertEls = await screen.findAllByRole('alert');
  logRoles(container);
  expect(alertEls).toHaveLength(2);
});
