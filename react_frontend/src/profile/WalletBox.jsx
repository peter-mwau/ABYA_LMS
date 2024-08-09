import { useContext } from "react";
import Walletcontext from "../contexts/walletContext";
import { UserContext } from "../contexts/userContext";

const WalletBox = () => {
	const { isWalletConnected, account } = useContext(Walletcontext);
	const { balance } = useContext(UserContext);

	return (
		<div className="lg:w-3/5 bg-slate-100 shadow-md rounded-lg py-2 px-4 w-full flex-1">
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
						<div className="flex flex-row gap-3">
							<span className="text-sm text-gray-500">DAC</span>
							<input
								type="radio"
								className={`${
									isWalletConnected
										? "text-green-500 bg-green-500 my-auto"
										: "text-red-500 bg-red-500"
								}`}
							/>
						</div>
					</div>
				</aside>

				<div className="md:w-1/3 mt-2 md:mt-0">
					<p className="text-sm text-gray-500 mb-2">Balance</p>
					<p className="text-xl font-bold text-gray-900">
						{isWalletConnected ? (
							<span className="text-yellow-500 font-semibold">{balance}</span>
						) : (
							"0"
						)}
					</p>
				</div>
			</div>

			<div className=" border-gray-200 pt-4">
				<p className="text-xl font-bold">
					{isWalletConnected ? (
						<span className="text-green-500">Wallet is Connected</span>
					) : (
						<span className="text-red-600">Wallet is Not Connected</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default WalletBox;
