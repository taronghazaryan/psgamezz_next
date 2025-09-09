"use client";

import Image from "next/image";
import { useBasket } from "../context/BasketContext";

const BasketItem = ({ item, index }) => {
	const { toggleItemCheck, removeFromBasket, changeQuantity } = useBasket();

	const imgSrc = item.main_image_url
		? item.main_image_url
		: item.img;
	const price = item.price ?? 0;
	const quantity = item.quantity ?? 1;
	const totalPrice = price * quantity;

	return (
		<div className="px-4">
        	<div className="w-full max-w-[1400px] mx-auto">
				<div
					className="flex items-center gap-4 mt-8"
				>
					{/* чекбокс */}
					<input
						type="checkbox"
						checked={item.checked || false}
						onChange={() => toggleItemCheck(index)}
						className="h-[22px] w-[22px] max-[900px]:absolute max-[900px]:top-3 max-[900px]:left-3 accent-primary"
					/>

					{/* картинка + инфо */}
					<div className="flex items-start gap-4 w-full max-[900px]:mt-6">
						<div className="relative w-[120px] h-[120px] flex-shrink-0">
							<Image
								src={imgSrc}
								alt={item.title || "Товар"}
								fill
								className="rounded-xl object-cover"
								sizes="120px"
								unoptimized={imgSrc.startsWith("http")}
							/>
						</div>

						<div className="flex flex-col justify-between w-full gap-2">
							<p className="font-bold text-[#202562] text-[20px] max-[600px]:text-[16px]">
								{item.title}
							</p>

							{/* количество */}
							<div className="flex items-center gap-3 text-black">
								<button
									onClick={() => changeQuantity(index, quantity - 1)}
									className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-bold active:scale-95"
								>
									-
								</button>
								<span className="text-lg font-semibold">{quantity}</span>
								<button
									onClick={() => changeQuantity(index, quantity + 1)}
									className="bg-gray-200 px-4 py-2 rounded-lg text-lg font-bold active:scale-95"
								>
									+
								</button>
							</div>

							<p className="font-bold text-[#202562] text-[20px] max-[600px]:text-[16px]">
								{totalPrice}₽
							</p>
						</div>
					</div>

					{/* кнопка удалить */}
					<button
						onClick={() => removeFromBasket(index)}
						className="text-red-600 font-semibold mt-3 
							max-[900px]:w-full max-[900px]:text-center max-[900px]:py-2 
							max-[900px]:bg-red-100 max-[900px]:rounded-lg hover:bg-red-200"
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default BasketItem;
