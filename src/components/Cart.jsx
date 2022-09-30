// import './Cart.css';

const Cart = ({selected}) => (
  <div className="cart">
      {selected.map(cur => console.log(cur))}
    {
      selected.length === 0
      ? <h2>There is no class selected. Just click the course you want, then come back.</h2>
      : selected.map(course => (
          <div key={course.id}>
              {course.term} CS {course.number} {course.title}: {course.meets}
          </div>
        ))
    }
  </div>
);

export default Cart;