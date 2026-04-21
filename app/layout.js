import './globals.css';

export const metadata = {
  title: 'KKU Library',
  description: 'KKU Library Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
