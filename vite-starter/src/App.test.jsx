import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect } from 'vitest';
import { logRoles } from '@testing-library/react';

describe('버튼 기능 테스트', () => {
  test('button starts with correct label and color', () => {
    render(<App />);
    const btnElement = screen.getByRole('button', { name: /blue/i });
    // color -> class matcher로 확인
    expect(btnElement).toHaveClass('red');
    expect(btnElement).toHaveTextContent(/blue/i);
  });
  test('after click btn, btn has correct label and color', () => {
    render(<App />);
    // 버튼 찾고
    const btnElement = screen.getByRole('button');
    // 버튼 클릭해보고
    fireEvent.click(btnElement);
    // 버튼 색 체크
    // expect(btnElement).toHaveClass('blue');
    expect(btnElement).toHaveStyle({ 'background-color': '#0000ff' });
    // 버튼 label 체크
    expect(btnElement).toHaveTextContent(/red/i);
  });
});

describe('checkbox 기능', () => {
  test('체크박스 기본 셋팅 빈값 확인', () => {
    render(<App />);
    const btnElement = screen.getByRole('button', { name: /blue/i });

    const checkBoxElement = screen.getByRole('checkbox', {
      name: /disable button/i,
    });
    expect(btnElement).toBeEnabled();
    expect(checkBoxElement).not.toBeChecked();
  });

  test('체크박스 체크 여부에 따른 버튼 enable 체크', () => {
    render(<App />);
    const btnElement = screen.getByRole('button', { name: /blue/i });

    const checkBoxElement = screen.getByRole('checkbox', {
      name: /disable button/i,
    });
    // init state
    expect(btnElement).toBeEnabled();
    expect(checkBoxElement).not.toBeChecked();

    // click
    fireEvent.click(checkBoxElement);
    expect(btnElement).not.toBeEnabled();

    // again click to re-able btn
    fireEvent.click(checkBoxElement);
    expect(btnElement).toBeEnabled();
  });

  test('버튼 disabled 상태시, 색깔 회색처리', () => {
    render(<App />);
    const btnElement = screen.getByRole('button', { name: /blue/i });

    const checkBoxElement = screen.getByRole('checkbox', {
      name: /disable button/i,
    });

    fireEvent.click(checkBoxElement);
    expect(btnElement).toHaveStyle({
      'background-color': 'rgb(128, 128, 128)',
    });
  });
});
