'use client';

import { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";

export default function PsPlus({ subscriptions, consoleTypes }) {
	const [selectedDuration, setSelectedDuration] = useState(null);
	const [selectedTier, setSelectedTier] = useState(null);
	const [psType, setPsType] = useState(null);

	const basketContext = useBasket();
	const basket = basketContext?.basket || [];
	const addToBasket = basketContext?.addToBasket || (() => { });

	const consoleNames = consoleTypes.map((c) => c.name);

	useEffect(() => {
		if (psType === null && consoleNames.length > 0) {
			setPsType(consoleNames[0]);
		}
	}, [psType, consoleNames]);

	const findConsoleNameById = (id) => {
		const c = consoleTypes.find((c) => c.id === id);
		return c ? c.name : null;
	};

	const filteredSubs = subscriptions
		.filter((sub) =>
			sub.consoles.some((consoleId) => findConsoleNameById(consoleId) === psType)
		)
		.sort((a, b) => {
			const tiersOrder = ["Essential", "Extra", "Deluxe"];
			return tiersOrder.indexOf(a.level) - tiersOrder.indexOf(b.level);
		});

	useEffect(() => {
		if (filteredSubs.length > 0 && !selectedTier) {
			setSelectedTier(filteredSubs[0].level);
			if (filteredSubs[0].periods.length > 0) {
				setSelectedDuration(filteredSubs[0].periods[0].months.toString());
			}
		}
	}, [filteredSubs, selectedTier]);

	const currentSub = selectedTier
		? filteredSubs.find((sub) => sub.level === selectedTier)
		: filteredSubs[0];

	const isInBasket = (periodId, ps) =>
		basket.some((item) => item.id === periodId && item.psType === ps);

	const handleAddToBasket = (tier, durationMonths, ps) => {
		const actualTier = tier || filteredSubs[0]?.level || "Unknown";

		const sub = subscriptions.find(
			(s) =>
				s.level === actualTier &&
				s.consoles.some((id) => findConsoleNameById(id) === ps)
		);
		if (!sub) return;

		const period = sub.periods.find(
			(p) => p.months.toString() === durationMonths.toString()
		);
		if (!period) return;

		if (isInBasket(period.id, ps)) return;

		addToBasket({
			id: period.id,
			product_type: "subscription_service",
			service_id: sub.id,
			period_id: period.id,
			console_id: sub.consoles.find((id) => findConsoleNameById(id) === ps),
			level: sub.level,
			price: Number(period.price),
			quantity: 1,
			img: "/img/btns.png",
			title: `PlayStation Plus ${sub.level} — ${period.months} мес. (${ps})`,
			description: sub.description,
			psType: ps,
		});
	};

	const tiers = [...new Set(filteredSubs.map((sub) => sub.level))];

	return (
		<div className="w-full max-w-[1400px] mx-auto">
			<div className="py-6 max-md:p-4 max-sm:p-4">
				<div >
					<div className="text-center mb-12 max-md:mb-6 max-sm:mb-2.5 max-sm:mt-5">
						<h1 className="text-4xl font-bold text-primary mb-2 max-md:text-2xl max-sm:text-[16px] max-sm:mb-0">
							PlayStation Plus
						</h1>
						<p className="text-primary text-2xl max-md:text-lg max-sm:text-[10px]">
							Выберите подходящую подписку
						</p>
					</div>

					<div className="flex flex-col lg:flex-row gap-8">
						{/* Левая карточка */}
						<div className="bg-primary rounded-3xl p-8 text-white 
						w-full md:w-[400px] md:h-[400px] xl:w-[400px] xl:h-[400px]">

						{/* Центрируем контент */}
							<div className="flex flex-col items-center justify-center gap-8 h-full">
								<img
								src="/img/btns.png"
								alt=""
								className="w-64 h-64 md:w-48 md:h-48 max-sm:w-24 max-sm:h-24"
								/>
								<h2 className="text-3xl font-bold md:text-2xl max-sm:text-[16px]">
								{selectedTier || "Загрузка..."}
								</h2>
							</div>
						</div>


						{/* Правая карточка */}
						<div className="grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-x-8 gap-y-2.5 bg-white rounded-3xl border-1 border-primary p-8 max-md:p-6 max-sm:p-4 flex-1">
							<div className="flex flex-col justify-between">
								<div>
									<h2 className="text-3xl text-left font-bold text-primary mb-1 max-md:text-xl max-sm:text-[16px]">
										PlayStation Plus {selectedTier || ""}
									</h2>
									<div className="flex items-center text-primary text-sm max-md:text-xs max-sm:text-[10px] gap-1">
										<img
											className="w-5 h-5 max-md:w-4 max-md:h-4 max-sm:w-3 max-sm:h-3"
											src="/img/btns.png"
											alt=""
										/>
										<span>Игры по подписке</span>
									</div>
								</div>

								{/* Выбор консоли */}
								<div className="flex gap-3 mb-6 max-md:mb-4 max-sm:mb-3">
									{consoleNames.map((name, index) => (
										<button
											key={`${name}-${index}`}
											onClick={() => setPsType(name)}
											className={`px-4 py-2 border-primary border-1 rounded-lg font-medium max-md:text-sm max-sm:text-[12px] ${psType === name
												? "bg-primary text-white"
												: "bg-white text-primary hover:bg-gray-300"
												}`}
										>
											{name}
										</button>
									))}
								</div>

								{/* Выбор уровня */}
								<div>
									<h3 className="text-xl max-md:text-lg max-sm:text-sm text-left font-normal text-primary mb-1.5">
										Уровень подписки
									</h3>
									<div className="flex gap-3 no-scrollbar">
									{tiers.map((tier, index) => (
										<button
										key={`${tier}-${index}`}
										onClick={() => {
											setSelectedTier(tier);
											const sub = filteredSubs.find((s) => s.level === tier);
											if (sub && sub.periods.length > 0) {
											setSelectedDuration(sub.periods[0].months.toString());
											}
										}}
										className={`py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap ${
											selectedTier === tier
											? "bg-primary text-white"
											: "bg-gray-200 text-primary hover:bg-gray-300"
										}`}
										>
										{tier}
										</button>
									))}
									</div>

								</div>
							</div>

							{/* Выбор длительности */}
							<div className="flex flex-col gap-2">
								<h3 className="text-xl max-md:text-lg max-sm:text-sm text-left font-semibold text-gray-800">
									Длительность подписки
								</h3>
								<div className="flex flex-col gap-2.5">
									{currentSub?.periods.map((period, index) => {
										const durationValue = period.months.toString();
										return (
											<button
												key={`period-${period.id}-${index}`}
												onClick={() => setSelectedDuration(durationValue)}
												className={`w-full p-2 text-sm max-sm:text-xs rounded-lg border-1 transition-colors flex justify-between items-center border-primary ${selectedDuration === durationValue
													? "bg-primary text-white"
													: "bg-white text-primary"
													}`}
											>
												<div className="flex items-center gap-2">
													<span
														className={`w-6 h-6 rounded-sm border-1 flex items-center justify-center ${selectedDuration === durationValue
															? "border-white bg-primary"
															: "border-primary bg-white"
															}`}
													>
														<span
															className={`text-sm font-bold max-sm:text-xs ${selectedDuration === durationValue
																? "text-white"
																: "text-primary"
																}`}
														>
															{durationValue}
														</span>
													</span>
													<span className="font-medium">
														{durationValue}{" "}
														{durationValue === "1" ? "месяц" : "месяцев"}
													</span>
												</div>
												<span className="font-bold text-[15px]">
													{period.price}₽
												</span>
											</button>
										);
									})}
								</div>

								{/* Кнопка "В корзину" */}
								{currentSub?.periods.map((period, index) => {
									const durationValue = period.months.toString();
									if (durationValue === selectedDuration) {
										const inBasket = isInBasket(period.id, psType);
										return (
											<button
												key={`basket-${period.id}-${index}`}
												disabled={inBasket}
												onClick={() =>
													handleAddToBasket(
														selectedTier || filteredSubs[0]?.level,
														durationValue,
														psType
													)
												}
												className={`w-full ${inBasket
													? "bg-gray-400 cursor-not-allowed"
													: "bg-secondary hover:bg-blue-700 hover:shadow-lg"
													} text-black py-2 rounded-lg text-lg max-sm:text-sm transition-colors`}
											>
												{inBasket ? "В корзине" : "В корзину"}
											</button>
										);
									}
									return null;
								})}
							</div>

							{/* Описание */}
							<div className="col-span-2 max-md:col-span-1 max-sm:col-span-1">
								<h3 className="text-[16px] max-md:text-sm text-left font-bold text-primary mb-3">
									Что входит в подписку?
								</h3>
								<div className="flex flex-wrap gap-3 max-md:gap-2 max-sm:gap-1">
									<div className="flex items-center rounded-sm text-xs max-md:text-[11px] max-sm:text-[9px] p-1 px-2 max-sm:p-0.5 max-sm:px-1 gap-2 max-sm:gap-1 bg-primary text-gray-200">
										Игры по подписке, эксклюзивы и скидки
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
