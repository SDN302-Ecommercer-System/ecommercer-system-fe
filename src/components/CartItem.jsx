import {
  ActionIcon,
  Card,
  Group,
  Image,
  Menu,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const CartItem = () => {
  const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  ];

  return (
    <div className="w-full">
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between" align="start" className="w-full">
            <div className="flex flex-1 gap-x-4">
              <div>
                <Image src={images[0]} className="object-cover w-32 h-full" />
              </div>

              <div className="flex-1">
                <Text fw={500} className="text-sm">
                  Product 1
                </Text>

                {/* color and size choose */}
                <div className="flex items-center my-2 gap-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-slate-400">
                    SO242 | S
                  </span>
                </div>

                {/* price and quantity */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col">
                    <div>
                      <span className="mr-1 text-sm font-[50] line-through">
                        999.000d
                      </span>{" "}
                      <span className="text-sm text-red-500">-60%</span>
                    </div>
                    <span className="text-base font-bold">999.000d</span>
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
                  <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                    Xóa sản phẩm
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* quantity */}
              <div className="flex items-center">
                <div>
                  <button className="flex items-center justify-center w-8 h-8 border font -bold h-20text-sm border-slate-200">
                    <IconPlus size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-center w-8 h-8 text-sm border border-slate-200">
                  <span>10</span>
                </div>

                <div>
                  <button className="flex items-center justify-center w-8 h-8 text-sm font-bold border border-slate-200">
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

export default CartItem;
