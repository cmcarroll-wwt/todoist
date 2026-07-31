import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { TaskSummary } from '../components/TaskSummary';
import moment from 'moment';

beforeEach(cleanup);

// Mock firebase
const mockOnSnapshot = jest.fn();
const mockWhere = jest.fn(() => ({
  where: mockWhere,
  onSnapshot: mockOnSnapshot,
}));
const mockCollection = jest.fn(() => ({
  where: mockWhere,
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: mockCollection,
    })),
  },
}));

describe('<TaskSummary />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the task summary component', () => {
      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: [],
        });
        return jest.fn();
      });

      const { queryByTestId } = render(<TaskSummary />);
      expect(queryByTestId('task-summary')).toBeTruthy();
      expect(queryByTestId('task-summary-total')).toBeTruthy();
      expect(queryByTestId('task-summary-overdue')).toBeTruthy();
      expect(queryByTestId('task-summary-due-today')).toBeTruthy();
    });

    it('displays zero counts when there are no tasks', async () => {
      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: [],
        });
        return jest.fn();
      });

      const { getByTestId } = render(<TaskSummary />);

      await waitFor(() => {
        const totalItem = getByTestId('task-summary-total');
        const overdueItem = getByTestId('task-summary-overdue');
        const dueTodayItem = getByTestId('task-summary-due-today');

        expect(totalItem.textContent).toContain('0');
        expect(overdueItem.textContent).toContain('0');
        expect(dueTodayItem.textContent).toContain('0');
      });
    });

    it('displays correct total count', async () => {
      const mockTasks = [
        { id: '1', task: 'Task 1', date: '', archived: false },
        { id: '2', task: 'Task 2', date: '', archived: false },
        { id: '3', task: 'Task 3', date: '', archived: false },
      ];

      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: mockTasks.map((task) => ({
            id: task.id,
            data: () => task,
          })),
        });
        return jest.fn();
      });

      const { getByTestId } = render(<TaskSummary />);

      await waitFor(() => {
        const totalItem = getByTestId('task-summary-total');
        expect(totalItem.textContent).toContain('3');
      });
    });

    it('displays correct overdue count', async () => {
      const yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');
      const twoDaysAgo = moment().subtract(2, 'days').format('DD/MM/YYYY');

      const mockTasks = [
        { id: '1', task: 'Task 1', date: yesterday, archived: false },
        { id: '2', task: 'Task 2', date: twoDaysAgo, archived: false },
        { id: '3', task: 'Task 3', date: '', archived: false },
      ];

      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: mockTasks.map((task) => ({
            id: task.id,
            data: () => task,
          })),
        });
        return jest.fn();
      });

      const { getByTestId } = render(<TaskSummary />);

      await waitFor(() => {
        const overdueItem = getByTestId('task-summary-overdue');
        expect(overdueItem.textContent).toContain('2');
      });
    });

    it('displays correct due today count', async () => {
      const today = moment().format('DD/MM/YYYY');
      const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');

      const mockTasks = [
        { id: '1', task: 'Task 1', date: today, archived: false },
        { id: '2', task: 'Task 2', date: today, archived: false },
        { id: '3', task: 'Task 3', date: tomorrow, archived: false },
      ];

      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: mockTasks.map((task) => ({
            id: task.id,
            data: () => task,
          })),
        });
        return jest.fn();
      });

      const { getByTestId } = render(<TaskSummary />);

      await waitFor(() => {
        const dueTodayItem = getByTestId('task-summary-due-today');
        expect(dueTodayItem.textContent).toContain('2');
      });
    });

    it('displays all counts correctly with mixed dates', async () => {
      const today = moment().format('DD/MM/YYYY');
      const yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');
      const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');

      const mockTasks = [
        { id: '1', task: 'Task 1', date: today, archived: false },
        { id: '2', task: 'Task 2', date: yesterday, archived: false },
        { id: '3', task: 'Task 3', date: tomorrow, archived: false },
        { id: '4', task: 'Task 4', date: '', archived: false },
        { id: '5', task: 'Task 5', date: today, archived: false },
      ];

      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: mockTasks.map((task) => ({
            id: task.id,
            data: () => task,
          })),
        });
        return jest.fn();
      });

      const { getByTestId } = render(<TaskSummary />);

      await waitFor(() => {
        const totalItem = getByTestId('task-summary-total');
        const overdueItem = getByTestId('task-summary-overdue');
        const dueTodayItem = getByTestId('task-summary-due-today');

        expect(totalItem.textContent).toContain('5');
        expect(overdueItem.textContent).toContain('1');
        expect(dueTodayItem.textContent).toContain('2');
      });
    });

    it('unsubscribes from firebase on unmount', () => {
      const unsubscribeMock = jest.fn();
      mockOnSnapshot.mockImplementation((callback) => {
        callback({
          docs: [],
        });
        return unsubscribeMock;
      });

      const { unmount } = render(<TaskSummary />);
      unmount();

      expect(unsubscribeMock).toHaveBeenCalled();
    });
  });
});
