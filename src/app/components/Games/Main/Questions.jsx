"use client";

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Questions() {
	const [openIndex, setOpenIndex] = useState(null);
	const questions = [
		{
			question: 'Что такое "с активацией"?',
			answer: `Вы получаете логин и пароль от игрового аккаунта.

Далее добавляете его на консоль, включаете активацию аккаунта (общий доступ) в настройках по инструкции.

После ставите игру на установку, и она появляется на вашем аккаунте любого региона.

В этом варианте покупки игра передается на ваш аккаунт благодаря игровому аккаунту. Вы получаете купленную вами игру на ваш аккаунт любого региона.`,
		},
		{
			question: 'Что такое "без активации"?',
			answer: `Вы получаете логин и пароль от игрового аккаунта.

Далее добавляете его на консоль, не активируете(общий доступ), и ставите игру на установку по инструкции.

После завершения установки играете на игровом аккаунте.

В этом варианте покупки игра будет доступна только на игровом аккаунте. И вы сможете играть в купленную игру.`,
		},
		{
			question: 'После оплаты. Как получить заказ?',
			answer: `После оплаты игры вы получите код заказа, который дублируется на вашу почту.

Код необходимо отправить в нашу поддержку для получения игрового аккаунта.

К игровому аккаунту предоставляем все необходимые инструкции, и помогаем с установкой.`,
		},
		{
			question: 'Что делать если РФ аккаунт?',
			answer: 'Аккаунт любого региона подойдет.',
		},
	];
	return (
		    // <div className="main-container my-12 grid grid-cols-2 lg:px-20 max-sm:grid-cols-1 max-sm:gap-8 md:gap-8 px-6 md:px-6 px-28 max-sm:p-4">

<div className="w-full max-w-[1400px] mx-auto main-container my-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
    			<div className='flex flex-col justify-self-start gap-2.5 py-4'>
				<h1 className='text-3xl max-sm:text-base font-bold text-primary max-sm:mb-2'>
					Возникли вопросы?
				</h1>
				{questions.map((item, index) => {
					const isOpen = openIndex === index;
					return (
						<div key={index}>
							<div className='flex items-center max-sm:justify-between gap-2'>
								<p className='text-primary font-semibold leading-5 max-sm:text-xs max-sm:font-bold'>
									{item.question}
								</p>
								<div
									className='border border-primary rounded-md max-sm:rounded-sm'
									onClick={() => {
										setOpenIndex(isOpen ? null : index);
									}}
								>
									{isOpen ? (
										<ChevronUp className='w-8 h-5 text-white bg-primary rounded-sm max-sm:rounded-xs max-sm:w-5 max-sm:h-3' />
									) : (
										<ChevronDown className='w-8 h-5 text-primary max-sm:w-5 max-sm:h-3' />
									)}
								</div>
							</div>
							<div
								className={`transition-all duration-800 overflow-hidden ${
									isOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
								}`}
							>
								<div className='bg-primary py-2 px-2.5 rounded-2xl mt-2 max-sm:rounded-lg max-sm:py-1.5 max-sm:mt-1.5'>
									<p className='text-white max-sm:text-xs max-sm:font-bold'>
										{item.answer}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className='flex flex-col items-center bg-primary sm:justify-self-end sm:self-start rounded-3xl gap-2.5 px-14 py-4 max-sm:px-5 max-sm:py-4'>
				<h3 className='text-2xl text-center w-80 max-sm:text-base font-bold max-sm:mb-2'>
					Более 10 000 геймеров воспользовались для покупки игры нашими
					сервисами
				</h3>
				<button className='bg-white text-lg text-primary font-bold px-12 py-3 rounded-xl max-sm:text-sm max-sm:py-2'>
					Прочитать отзывы
				</button>
			</div>
		</div>
	);
}
