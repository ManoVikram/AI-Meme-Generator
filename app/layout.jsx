import localFont from "next/font/local";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-Book.otf", weight: "300", style: "normal" },
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/NeueMontreal-v2.6/OTF/PPNeueMontreal-SemiBolditalic.otf", weight: "600", style: "italic" },
  ],
  variable: "--font-neue-montreal",
  display: "swap"
})

export const metadata = {
  title: "Memelab - AI Meme Generator",
  description: "Create hilarious memes in seconds with Memelab, the AI-powered meme generator that turns your ideas into shareable content.",
};

// UI Inspiration - https://www.habito.studio/ | https://www.awwwards.com/sites/habito-studio

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${neueMontreal.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
