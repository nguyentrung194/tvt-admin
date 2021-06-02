const Storage = (cartItems: any) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems: any) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total: number, product: any) => total + product.soluong,
    0
  );
  let total = cartItems.reduce(
    (total: number, product: any) =>
      total +
      product.pricing * product.soluong * ((100 - product.saleOff || 0) / 100),
    0
  );
  return { itemCount, total };
};

export const CartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_DELIVERY_METHOD":
      return {
        ...state,
        deliveryMethod: action.payload,
      };
    case "ADD_ITEM":
      if (!state.cartItems.find((item: any) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          soluong: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item: any) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item: any) => item.id !== action.payload.id
          ),
        ],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item: any) => item.id === action.payload.id)
      ].soluong++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      let index = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.cartItems[index].soluong--;
      let newCartItems = [
        ...state.cartItems.filter((item: any) => item.soluong > 0),
      ];
      return {
        ...state,
        ...sumItems(newCartItems),
        cartItems: [...newCartItems],
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
