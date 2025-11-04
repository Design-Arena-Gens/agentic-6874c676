import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "McDonald's AI Agent",
  description: 'Ask about menu, nutrition, stores, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="app-header">
            <div className="brand">?? McAssistant</div>
            <div className="sub">Your friendly McDonald's helper</div>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">Not affiliated with McDonald's. For demo purposes.</footer>
        </div>
      </body>
    </html>
  );
}
