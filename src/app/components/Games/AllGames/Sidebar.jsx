"use client";

export default function SideBAR({ filters, onCheckboxChange, onPriceChange, onReset, isMobile, onClose }) {
  return (
      <div className={`${isMobile ? "" : "max-md:hidden"} space-y-4`}>
        {/* Platform */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-bold text-primary">Платформа</h3>
          <div className="space-y-2.5">
            {['ps5', 'ps4'].map((platform) => (
              <label key={platform} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.platform[platform]}
                  onChange={() => onCheckboxChange('platform', platform)}
                  className="w-5 h-5 text-primary border-2 border-primary rounded accent-primary cursor-pointer"
                />
                <span className="text-primary font-bold">{platform.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Genre */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold text-primary mb-3">Жанр</h3>
          {['roleplay', 'action', 'adventure'].map((genre) => (
            <label key={genre} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.genre[genre]}
                onChange={() => onCheckboxChange('genre', genre)}
                className="w-5 h-5 text-primary border-2 border-primary rounded accent-primary cursor-pointer"
              />
              <span className="text-primary font-bold">
                {genre === 'roleplay' ? 'Ролевые игры' : genre === 'action' ? 'Экшен' : 'Приключения'}
              </span>
            </label>
          ))}
        </div>

        {/* Price */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold text-primary">Цена</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="от"
              value={filters.priceRange.min}
              onChange={(e) => onPriceChange('min', e.target.value)}
              className="w-full px-3 py-2 bg-primary text-white rounded-md placeholder-white"
            />
            <span className="font-bold text-primary">-</span>
            <input
              type="number"
              placeholder="до"
              value={filters.priceRange.max}
              onChange={(e) => onPriceChange('max', e.target.value)}
              className="w-full px-3 py-2 bg-primary text-white rounded-md placeholder-white"
            />
          </div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.withDiscount}
              onChange={() => onCheckboxChange('discount')}
              className="w-5 h-5 text-primary border-2 border-primary rounded accent-primary cursor-pointer"
            />
            <span className="text-primary font-bold">Со скидкой</span>
          </label>
        </div>

        {/* Localization */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold text-primary">Локализация</h3>
          {['russianVoice', 'russianSubtitles'].map((key) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.localization[key]}
                onChange={() => onCheckboxChange('localization', key)}
                className="w-5 h-5 text-primary border-2 border-primary rounded accent-primary cursor-pointer"
              />
              <span className="text-primary font-bold">
                {key === 'russianVoice' ? 'Русская озвучка' : 'Русские субтитры'}
              </span>
            </label>
          ))}
        </div>

        {/* Activation Type */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-semibold text-primary">Тип активации</h3>
          {['withActivation', 'withoutActivation'].map((key) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.activation[key]}
                onChange={() => {
                  // сбросить все остальные
                  Object.keys(filters.activation).forEach((otherKey) => {
                    if (otherKey !== key && filters.activation[otherKey]) {
                      onCheckboxChange('activation', otherKey, false);
                    }
                  });
                  // включаем выбранный
                  onCheckboxChange('activation', key, !filters.activation[key]);
                }}
                className="w-5 h-5 text-primary border-2 border-primary rounded accent-primary cursor-pointer"
              />
              <span className="text-primary font-bold">
                {key === 'withActivation' ? 'С активацией' : 'Без активации'}
              </span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onReset}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-slate-600 transition-colors font-medium"
          >
            Сбросить всё
          </button>
          {isMobile && (
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-slate-600 font-medium"
            >
              Применить
            </button>
          )}
        </div>
      </div>
  );
}
