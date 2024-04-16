import { HttpResponse, http } from 'msw';

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      {
        name: 'Vanilla',
        imagePath: '/images/vanilla.png',
      },
      {
        name: 'Chocolate',
        imagePath: '/images/chocolate.png',
      },
    ]);
  }),
  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      {
        name: 'M&Ms',
        imagePath: '/images/m-and-ms.png',
      },
      {
        name: 'Hot fudge',
        imagePath: '/images/hot-fudge.png',
      },
    ]);
  }),
];
