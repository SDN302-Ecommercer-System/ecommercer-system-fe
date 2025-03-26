import { ActionIcon, Card, Group, Image, Menu, Text } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { formatMoney } from "../helpers/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartAsync,
  updateQuantityAsync,
} from "../redux/slice/counterSlice";

const CartItem = ({ itemId }) => {
  const dispatch = useDispatch();

  const item = useSelector((state) =>
    state.cart.list.find((item) => item._id === itemId)
  );

  if (!item) return <h1>loading</h1>;

  const updateQuantity = (quantity) => {
    const updateDto = {
      id: item._id,
      quantity: item.quantity + quantity,
    };

    dispatch(updateQuantityAsync(updateDto));
  };

  const removeItem = () => {
    dispatch(removeFromCartAsync(item._id));
  };

  return (
    <div className="w-full">
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between" align="start" className="w-full">
            <div className="flex flex-1 gap-x-4">
              <div>
                <Image
                  src={item.color.images[0].url}
                  className="object-contain w-32 h-32"
                />
              </div>

              <div className="flex-1">
                <Text fw={500} className="text-sm">
                  {item.product.name}
                </Text>

                {/* color and size choose */}
                <div className="flex items-center my-2 gap-x-2">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: item.color.hexCode }}
                  ></div>
                  <span className="text-xs font-medium text-slate-400">
                    {item.size} | {item.color.hexCode}
                  </span>
                </div>

                {/* price and quantity */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col">
                    <div>
                      <span className="mr-1 text-sm font-[50] line-through">
                        {formatMoney(item.product.price, "vi-VN")}
                      </span>{" "}
                      <span className="text-sm text-red-500">-60%</span>
                    </div>
                    <span className="text-base font-bold">
                      {formatMoney(item.price, "vi-VN")}
                    </span>
                  </div>
                </div>

                {/* end of card item */}
              </div>
            </div>

            {/* menu trigger */}
            <div className="flex flex-col items-end justify-between gap-y-11">
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconTrash size={14} />}
                    color="red"
                    onClick={removeItem}
                  >
                    Xóa sản phẩm
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* quantity */}
              <div className="flex items-center">
                <div>
                  <button
                    onClick={() => updateQuantity(1)}
                    className="flex items-center justify-center w-8 h-8 border font -bold h-20text-sm border-slate-200"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-center w-8 h-8 text-sm border border-slate-200">
                  <span>{item.quantity}</span>
                </div>

                <div>
                  <button
                    disabled={item.quantity === 1}
                    onClick={() => updateQuantity(-1)}
                    className="flex items-center justify-center w-8 h-8 text-sm font-bold border border-slate-200 disabled:bg-slate-200"
                  >
                    <IconMinus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* end of group */}
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
};

CartItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default CartItem;
