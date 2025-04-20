import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopBar from '../components/TopBar';
import { UserProvider } from '../context/UserContext';
import { users } from '../mockData/MockData';

// Utility wrapper to include context
const renderWithContext = (ui: React.ReactNode) => {
  return render(<UserProvider>{ui}</UserProvider>);
};

describe('TopBar - User Switching Logic', () => {
  it('shows the current user avatar and name', () => {
    renderWithContext(<TopBar />);
    const avatar = screen.getByText(users[0].name.charAt(0).toUpperCase());
    const name = screen.getByText(users[0].name);

    expect(avatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it('opens the "My Members" modal when button is clicked', async () => {
    renderWithContext(<TopBar />);
    const button = screen.getByRole('button', { name: /my members/i });
    await userEvent.click(button);

    const dialogTitle = await screen.findByText(/select a user/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it('displays all users in the modal', async () => {
    renderWithContext(<TopBar />);
    await userEvent.click(screen.getByRole('button', { name: /my members/i }));

    for (const user of users) {
      const userBtn = await screen.findByRole('button', { name: user.name });
      expect(userBtn).toBeInTheDocument();
    }
  });

  it('switches user and closes modal when a user is clicked', async () => {
    renderWithContext(<TopBar />);
    await userEvent.click(screen.getByRole('button', { name: /my members/i }));

    const newUser = users[1];
    const userButton = await screen.findByRole('button', { name: newUser.name });

    await userEvent.click(userButton);

    // Check if avatar updates with new user's initial
    const updatedAvatar = await screen.findByText(newUser.name.charAt(0).toUpperCase());
    const updatedName = await screen.findByText(newUser.name);

    expect(updatedAvatar).toBeInTheDocument();
    expect(updatedName).toBeInTheDocument();

    // Dialog should be closed
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });
});
