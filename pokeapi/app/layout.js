import Navigation from "./components/Navigation"
import "@/app/globals.css";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
