import "./globals.css";

export const metadata = {
  title: "Clienxo AI Receptionist",
  description: "AI receptionist demo for dental and small medical clinics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
