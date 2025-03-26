import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  FileButton,
  Group,
  TextInput,
  Box,
  Text,
  Stack,
  Notification,
  Modal,
  PasswordInput,
} from "@mantine/core";
import axiosInstance from "../../config/axios.config";
import MainLayout from "../MainLayout";
import useAuth from "../../hooks/useAuth";
import { emailRegex, phoneRegex } from "../../helpers/regex/phone-regex";
import { notifications } from "@mantine/notifications";
import CONSTANT_VALUE from "../../helpers/constants/constant";
import { Navigate, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    phone: "",
    email: "",
    address: "",
    avatar: "/img/avatar.png",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Chỉ khi isLoading xong mới check isAuthenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    axiosInstance
      .get("/user/detail")
      .then((res) =>
        setUser({
          phone: res.data.data.phone || "",
          email: res.data.data.email || "",
          address: res.data.data.address || "",
          avatar: res.data.data.avatar || "/img/avatar.png",
        })
      )
      .catch((err) => console.error(err));
  }, []);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      axiosInstance
        .post("/upload/upload-single", formData)
        .then((res) => {
          setUser((prev) => ({ ...prev, avatar: res.data.url }));
          const userInformation = JSON.parse(localStorage.getItem(CONSTANT_VALUE.localStorageKey.USER_INFORMATION));
          localStorage.setItem(CONSTANT_VALUE.localStorageKey.USER_INFORMATION, JSON.stringify({
            ...userInformation,
            avatar: res.data.url,
          }));
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  const handleUpdate = () => {
    if (
      !phoneRegex.test(user.phone) ||
      !emailRegex.test(user.email) ||
      user.address === ""
    ) {
      notifications.show({
        title: "Thông tin không phù hợp",
        message: "Vui lòng nhập thông tin hợp lệ",
        position: "top-right",
        color: "red",
      });
      return;
    }

    setLoading(true);
    axiosInstance
      .put("/user/update-profile", { user })
      .then(() => {
        notifications.show({
          title: "Cập nhật thông tin thành công",
          message: "kiểm tra lại thông tin đã cập nhật",
          position: "top-right",
          color: "green",
        });
      })
      .catch((err) => {
        notifications.show({
          title: "Cập nhật thông tin lỗi",
          message: "Vui lòng liên hệ admin",
          position: "top-right",
          color: "red",
        });
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      notifications.show({
        title: "Mật khẩu phải từ 6 ký tự",
        message: "Vui lòng nhập lại mật khẩu mới",
        position: "top-right",
        color: "red",
      });
      return;
    }
    setLoading(true);
    axiosInstance
      .post("/user/change-password", { oldPassword, newPassword })
      .then(() => {
        setPasswordModal(false);
      })
      .catch((err) => {
        notifications.show({
          title: "Có lỗi xảy rara",
          message: err.message,
          position: "top-right",
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem(CONSTANT_VALUE.localStorageKey.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANT_VALUE.localStorageKey.USER_INFORMATION);

    // Trigger sự kiện storage cho các tab khác
    localStorage.setItem("authChanged", Date.now());

    // Dispatch sự kiện custom cho tab hiện tại
    window.dispatchEvent(new Event("authChanged"));
  };

  const maskString = (str) => {
    if (!str || str.length <= 3) return str;
    return `${str.slice(0, 3)}${"*".repeat(str.length - 3)}`;
  };

  return (
    <MainLayout>
      <Box
        maw={800}
        mx="auto"
        mt="xl"
        className="p-20 bg-white border rounded-md border-slate-200"
      >
        <Stack spacing="md">
          <div className="flex items-start justify-between">
            <Group position="center">
              <Avatar src={user.avatar} size={100} radius="xl" />
            </Group>
            <div className="flex items-center gap-x-4">
              <Text className="text-sm font-semibold text-red-500">
                User Profile
              </Text>
              <Button onClick={logout} color="red" size="xs">
                Đăng Xuất
              </Button>
            </div>
          </div>

          <div className="flex gap-x-4">
            <FileButton
              onChange={(file) => {
                setFile(file);
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setUser((prev) => ({ ...prev, avatar: imageUrl }));
                  console.log("Temp Avatar URL:", imageUrl);
                }
              }}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  className="text-red-500 bg-white border border-red-500 hover:text-white hover:bg-red-600 active:bg-red-700"
                  {...props}
                >
                  Choose new avatar
                </Button>
              )}
            </FileButton>
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              loading={loading}
              color="blue"
            >
              Upload
            </Button>
          </div>

          <TextInput
            label="Phone"
            value={user.phone}
            onChange={(e) => {
              const input = e.target.value;
              // Chỉ cho phép số và tối đa 10 ký tự
              if (/^\d{0,10}$/.test(input)) {
                setUser({ ...user, phone: input });
              }
            }}
          />
          <TextInput
            label="Email"
            disabled
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value || "" })}
          />
          <TextInput
            label="Address"
            value={user.address}
            onChange={(e) =>
              setUser({ ...user, address: e.target.value || "" })
            }
          />
          <Button onClick={handleUpdate} loading={loading} color="red">
            Update Profile
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => setPasswordModal(true)}
          >
            Change Password
          </Button>
        </Stack>
      </Box>

      <Modal
        opened={passwordModal}
        onClose={() => setPasswordModal(false)}
        title="Change Password"
        centered
      >
        <Stack spacing="md">
          <PasswordInput
            label="Old Password"
            value={maskString(oldPassword)}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handleChangePassword} loading={loading} color="red">
            Update Password
          </Button>
        </Stack>
      </Modal>
    </MainLayout>
  );
};

export default UserProfile;
