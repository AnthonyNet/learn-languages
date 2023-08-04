
import './globals.css'
/*import '@/components/navbar/Navbar.css'*/
import Providers from "./Providers";
import Navbar from "./navbar/Navbar";

export const metadata = {
  title: 'Learn languages',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html lang="en">
			<body>
				<main className="min-h-screen bg-background flex flex-col items-center">
					<Providers>
						{" "}
						<Navbar /> {children}{" "}
					</Providers>
				</main>
			</body>
		</html>
	);
}
