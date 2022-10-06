import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
// import Pagination from "../components/Pagination";
import Pagination2 from "../components/Pagination2";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useSelector говорит: дай мне ф-цию и в нее я передам тебе стейт, дальше уже мы вытаскиваем из стейта что нам нужно
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter); // state - наше хранилище(store), из него достаем что нам нужно
  const { items, status } = useSelector(selectPizzaData);

  const isSearch = React.useRef(false); // Пришли ли параметры из URL
  const isMounted = React.useRef(false); // Был ли первый рендер

  // У каждой пиццы есть категории к которым она относится, категория 0 есть у всех, это все пиццы
  // категория 1 - мясные, 2 - вегатерианская и тд, и мы пишем у пиццы те категории к которым она относится

  const limitPizzasPage = 4;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const order = sort.order ? sort.order : "desc";

    dispatch(
      fetchPizzas({
        categoryId,
        sort,
        currentPage,
        limitPizzasPage,
        order,
      })
    );

    window.scrollTo(0, 0); // Если страница загрузилась впервые делаем скрол наверху
  };

  // Если изменили параметры и был первый рендер, то выполнится
  React.useEffect(() => {
    // Превращает объект в строку - soryBy=rating&categoryId=0&currentPage=1
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        categoryId,
        currentPage,
        order: sort.order,
      });

      navigate(`?${queryString}`); // Вшивает аргумент в адресную строку
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем их в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // Извлекаем "?"

      const sort = sortList.find((list) => {
        if (params.order) {
          return (
            list.sortProperty === params.sortBy && list.order === params.order
          );
        }
        return list.sortProperty === params.sortBy;
      });

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    // Если нет URL-параметров, то выполнится
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchValue]); // useEffect будет выполняться при изменении categoryID

  const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => {
      return <PizzaBlock key={item.id} {...item} />;
    });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => onChangeCategory(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      {status !== "error" ? (
        <Pagination2
          currentPage={currentPage}
          changePage={(num) => {
            console.log(num);
            dispatch(setCurrentPage(num));
          }}
          pageCount={Math.ceil(10 / limitPizzasPage)}
        />
      ) : null}
      {/* <Pagination onChangePage={(number) => setCurrentPage(number)} /> */}
    </div>
  );
}

export default Home;
