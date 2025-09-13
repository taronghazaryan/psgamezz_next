"use client";

import Image from "next/image";
import { useBasket } from "../context/BasketContext";

const BasketItem = ({ item, index }) => {
	const { toggleItemCheck, removeFromBasket, changeQuantity } = useBasket();

	const imgSrc = item.main_image_url ?? item.img;
	const price = item.price ?? 0;
	const quantity = item.quantity ?? 1;
	const totalPrice = price * quantity;

	return (
		<div className="">
			<div className="w-full max-w-[1400px] mx-auto">
				<div className="flex items-center gap-4 mt-8">

					{/* Чекбокс */}
					<input
						type="checkbox"
						checked={item.checked || false}
						onChange={() => toggleItemCheck(index)}
						className="h-[22px] w-[22px] accent-primary"
					/>

					{/* Картинка + описание */}
					<div className="flex flex-col sm:flex-row items-start gap-4 w-full">
						{/* Картинка */}
						<div className="relative xl:w-[120px] xl:h-[120px] w-[60px] h-[60px] flex-shrink-0">
							<Image
								src={imgSrc}
								alt={item.title || "Товар"}
								fill
								className="rounded-xl object-cover"
								sizes="120px"
								unoptimized={imgSrc.startsWith("http")}
							/>
						</div>

						{/* Описание */}
						<div className="flex flex-col justify-between w-full gap-2">
							<p className="font-bold text-[#202562] text-[12px] sm:text-[16px]">
								{item.title}
							</p>

							{/* Мобильная адаптация: количество и цена снизу */}
							<div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
								<div className="flex items-center gap-3">
									<button
										onClick={() => changeQuantity(index, quantity - 1)}
										className="bg-gray-200 px-4 py-2 text-primary rounded-lg text-lg font-bold active:scale-95"
									>
										-
									</button>
									<span className="text-lg text-primary font-semibold">{quantity}</span>
									<button
										onClick={() => changeQuantity(index, quantity + 1)}
										className="bg-gray-200 px-4 py-2 text-primary rounded-lg text-lg font-bold active:scale-95"
									>
										+
									</button>
								</div>

								<p className="font-bold text-[#202562] text-[20px] max-[600px]:text-[16px] mt-2 sm:mt-0">
									{totalPrice}₽
								</p>
							</div>
						</div>
					</div>

					{/* Кнопка удалить */}
					<button
						onClick={() => removeFromBasket(index)}
						className="px-4 py-1  bg-[#CC0000] hover:bg-[#FF0033] rounded-lg font-[900] max-md:text-sm max-sm:text-[12px] cursor-pointer"
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default BasketItem;
