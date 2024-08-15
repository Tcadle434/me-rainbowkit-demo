import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { magicEdenWallet } from "@rainbow-me/rainbowkit/wallets";
import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

const connectors = connectorsForWallets(
	[
		{
			groupName: "Recommended",
			wallets: [magicEdenWallet],
		},
	],
	{
		appName: "My RainbowKit App",
		projectId: "YOUR_PROJECT_ID",
	}
);

const config = createConfig({
	connectors,
	chains: [mainnet],
	ssr: true,
	transports: {
		[mainnet.id]: http(),
	},
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default MyApp;
