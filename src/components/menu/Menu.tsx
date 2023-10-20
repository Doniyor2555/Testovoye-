import { useState } from "react";
import { parsePhoneNumber } from "awesome-phonenumber";
import { InputMask } from "@react-input/mask";

import "./menu.scss";
import qrCode from "../../img/qr-code.png";

const Menu = () => {
  // let classOf = 'menu__phoneNumber'
  const numbers: (number | string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const toggle = (e: any) => {
    const text = e.target.textContent;
    setValue((value) => value + text);
  };
  
  const toggleMenu = () => {
    setShowMenu((item: boolean) => !item);
  };

  const pn = parsePhoneNumber(`${value}`, { regionCode: "RU" });

  const clearPhoneInput = () => {
    setValue("");
  };

  const submit = () => {
    if (pn.possible && isChecked.length > 0) {
      setIsSuccess(true);
      return setIsSuccess(true);
    } else {
      setIsSuccess(false);
      alert("Что-то пошло не так ( ");
      return setIsError(true);
    }
  };

  const toggleCheckbox = (e: any) => {
    if (e.target.checked) {
      setIsChecked(".");
    } else {
      setIsChecked("Пожалуйста дайте согласие!");
    }
  };

  return (
    <div className="menu">
      {showMenu ? (
        <>
          <div className="menu__wrapper">
            <div className="menu__wrap">
              {isSuccess ? (
                <div className="menu__good">
                  <div className="menu__success">ЗАЯВКА ПРИНЯТА</div>
                  <div className="menu__descr">
                    Держите телефон под рукой. Скоро с Вами свяжется наш
                    менеджер.
                  </div>
                </div>
              ) : (
                <>
                  <div className="menu__title">
                    Введите ваш номер мобильного телефона
                  </div>

                  <InputMask
                    mask="+7 (___)___-__-__"
                    replacement={{ _: /\d/ }}
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    placeholder="+7(___)___-__-__"
                    className={`${isError ? "error" : "menu__phoneNumber"}`}
                  />

                  <div className="menu__subtext">
                    и с Вами свяжется наш менеждер для дальнейшей консультации
                  </div>
                  <div className="menu__phoneButtons">
                    {numbers.map((item, i) => (
                      <button onClick={(e) => toggle(e)} key={i}>
                        {item}
                      </button>
                    ))}
                    <button className="menu__clear" onClick={clearPhoneInput}>
                      Стереть
                    </button>
                    <button onClick={(e) => toggle(e)}>0</button>
                  </div>
                  <div className="menu__agreement">
                    <input
                      className="menu__agreement-input"
                      type="checkbox"
                      id="agreement"
                      name="agreement"
                      required
                      value={isChecked}
                      onChange={(e) => toggleCheckbox(e)}
                    />
                    {isChecked.length > 2 ? (
                      <span className="error__message">Обьязательно !</span>
                    ) : null}
                    <label
                      htmlFor="agreement"
                      className="menu__agreement-input"
                    >
                      Согласие на обработку <br /> персональных данных
                    </label>
                  </div>

                  {isError ? (
                    <div className="notCorrectPhoneNumber">
                      Неверно введён номер
                    </div>
                  ) : null}

                  <button className="menu__confirmButton" onClick={submit}>
                    Подтвердить номер
                  </button>
                </>
              )}
            </div>
            <div></div>
          </div>
        </>
      ) : null}
      <div className="qrCode">
        {showMenu ? (
          <div className="qrCode__container">
            <p>Сканируйте QR-код <br /> ДЛЯ ПОЛУЧЕНИЯ <br /> ДОПОЛНИТЕЛЬНОЙ <br /> ИНФОРМАЦИИ</p>
            <img src={qrCode} alt="QR_CODE" />
          </div>
        ) : (
          <div className="qrCode__wrapper">
            <div className="qrCode__title">
              ИСПОЛНИТЕ МЕЧТУ ВАШЕГО <br /> МАЛЫША! <br /> ПОДАРИТЕ ЕМУ СОБАКУ!
            </div>
            <div className="qrCode__title"></div>

            <img src={qrCode} alt="QR_CODE" />
            <div className="qrCode__descr">
              Сканируйте QR-код <br /> или нажмите ОК
            </div>
            {showMenu ? null : (
              <button className="qrCode__button" onClick={toggleMenu}>
                OK
              </button>
            )}
          </div>
        )}
        {showMenu ? (
          <button
            className="qrCode__closeMenu"
            onClick={() => setShowMenu(false)}
          >
            &times;
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
