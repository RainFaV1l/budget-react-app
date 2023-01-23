import { OPERATION_TYPES } from "../types/operations";
import { useEffect, useState } from "react";
import { formatMoney, calculateBalance, getItemType } from "../utils/index";
import { filterExpense, filterIncome } from "../utils/filter";
import { CATEGORIES } from "../data/categories";


const initialItems = [
    {
        id: 1,
        category: "products",
        value: 3000,
        type: "expense",
        date: new Date()
    },
    {
        id: 2,
        category: "salary",
        value: 50315,
        type: "income",
        date: new Date()
    },
    {
        id: 3,
        category: "car",
        value: 20000,
        type: "expense",
        date: new Date()
    },
];

const initialBalanceState = 0;

const HomePage = () => {

    const [balance, setBalance] = useState(0);
    const [items, setItems] = useState(initialItems);
    const [formBalance, setformBalance] = useState(0);
    const [category, setCategory] = useState('none'); 

    useEffect(() => {
        setBalance(calculateBalance(items));
    }, [items]);

    const onChangeCategoryHandle = (e) => setCategory(e.target.value);

    const onChangeBalanceHandle = (event) => {

        setformBalance((prevState) => {
            const value = parseInt(event.target.value) || 0;

            if(!isNaN(value)) {
                prevState = value;
            }

            return prevState;
        })
    }

    const onAddItemHandle = () => {
        setItems((prevState) => {
            prevState = [...prevState];

            prevState.push(
                {
                    id: Date.now(),
                    category: category,
                    value: formBalance,
                    type: getItemType(category),
                    date: new Date()
                }
            );

            return prevState;
        });

        setformBalance(0);
    }

    const onClickAllFilterHandle = () => {
        setItems(initialItems);
    }

    // Для отображения всех доходов
    const onClickIncomeFilterHandle = () => {
        setItems(filterIncome(initialItems));
    }

        // Для отображения всех расходов
    const onClickExpenseFilterHandle = () => {
        setItems(filterExpense(initialItems));
    }

    return (

        <section>

            <div className="container">

                <div className="balance">

                    <h2>{formatMoney(balance)}</h2>

                </div>

                <div className="balance-form">

                    <form onSubmit={e => e.preventDefault()}>

                        <h3>Добавить операцию</h3>

                        <div className="wrapper">

                            <input 
                            type="text" 
                            name="balance" 
                            placeholder="30 300"
                            value={formBalance}
                            onChange={(event) => onChangeBalanceHandle(event)}
                            />

                            <select onChange={(e) => onChangeCategoryHandle(e)} name="category">

                                <option value="none">Не выбрано</option>

                                {
                                    Object.keys(CATEGORIES).map((category) => {
                                        return (
                                            <option key={category} value={category}>
                                                {CATEGORIES[category]}
                                            </option>
                                        );
                                    })
                                }

                            </select>

                            <button className="button" onClick={onAddItemHandle}>Добавить операцию</button>

                        </div>

                    </form>

                </div>

                <div className="operations__wrapper">

                    <h2 className="operation__title">Операции</h2>

                    <div className="filter">

                        <button onClick={onClickAllFilterHandle} className="button sm">Все операции</button>
                        <button onClick={onClickIncomeFilterHandle} className="button sm green">Все доходы</button>
                        <button onClick={onClickExpenseFilterHandle} className="button sm red">Все расходы</button>

                    </div>

                    <div className="operations">

                        {
                            items.map((items) => {
                                return (
                                    <div key={items.id} className="operation">

                                        <div className={`circle ${items.type === OPERATION_TYPES.INCOME ? "income" : "expense"}`}>
                                            {
                                                items.type === OPERATION_TYPES.INCOME ?
                                                <i className="fa-solid fa-money-bill"></i>
                                                :
                                                <i className="fa-solid fa-shop"></i>
                                            }
                                        </div>

                                        <p className="category">Категория: { CATEGORIES[items.category ]}</p>
                                        <p className="total">{formatMoney(items.value)} руб.</p>

                                        <button className="button button--remove">Удалить</button>

                                    </div>
                                );
                            })
                        }

                        

                    </div>

                    <div className="pagination">

                        <button className="pagination__button">

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default HomePage;