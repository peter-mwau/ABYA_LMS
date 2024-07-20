import { useContext } from "react";
import Walletcontext from "../contexts/walletContext";
import { UserContext } from "../contexts/userContext";

const WalletBox = () => {
	const { isWalletConnected } = useContext(Walletcontext);
	const { balance } = useContext(UserContext);

	return (
		<div className="md:w-3/5 bg-slate-100 shadow-md rounded-lg py-2 px-4 w-full flex-1">
			<div className="md:flex items-center justify-between md:space-x-3">
				<aside className="flex items-center space-x-4 md:mr-10">
					<div className="flex-shrink-0">
						<img
							className="h-12 w-12"
							src="https://via.placeholder.com/48x48"
							alt="Dacade Coin"
						/>
					</div>
					<div>
						<h3 className="text-lg font-medium text-gray-900">Dacade Coin</h3>
						<span className="text-sm text-gray-500">DAC</span>
					</div>
				</aside>

				<div className="md:w-1/3 mt-2 md:mt-0">
					<p className="text-sm text-gray-500 mb-2">Balance</p>
					<p className="text-xl font-bold text-gray-900">{balance}</p>
				</div>
			</div>

			<div className=" border-gray-200 pt-4">
				<p className="text-xl font-bold text-gray-900">
					{isWalletConnected
						? "Wallet is Connected"
						: "Wallet is Not Connected"}
				</p>
			</div>
		</div>
	);
};

export default WalletBox;
