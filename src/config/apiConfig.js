import { toast } from "react-toastify";

export const baseApi = "http://localhost:8080/gateway/v1"
export const endpoint = {
    login: { /* -- Đã làm xong */
        url: baseApi + "/identity/auth",
        method: "POST"
    },
    register: { /* --đã làm xong */
        url: baseApi + "/identity/users/customer/registration",
        method: "POST"
    },
    bougthTicket: {  /*Số vé đã mua --đã xong*/
        url: baseApi + "/ticket/count/purchased",
        method: "GET"
    },
    walletBalance: { /*Số dư ví --đã xong */
        url: baseApi + "/"
    },
    depositHistory: { /* Lịch sử nạp -- đã làm xong */
        url: baseApi + "/vault/deposit/history",
        method: "GET"
    },
    account: { /* Thông tin user --đã xong*/
        url: baseApi + "/profile/customer/info",
        method: "GET"
    },
    updateAccount: { /* Thông tin user --đã xong*/
        url: baseApi + "/profile/customer",
        method: "PATCH"
    },
    myTicket: { /*đã xong */
        url: baseApi + "/ticket/all",
        method: "GET"
    },
    shop: { /*---đã xong */
        url: baseApi + "/ticket/category/find/all",
        method: "GET"
    },
    buyTicketCar: { /*-- đã xong*/
        url: baseApi + "/ticket/category/find?vehicle=Car",
        method: "GET"
    },
    wallet: { /*--số dư đã xong */
        url: baseApi + "/vault/owners/balance",
        method: "GET"
    },
    balance: { /**--biến động số dư đã xong */
        url: baseApi + "/vault/fluctuation",
        method: "GET"
    },
    ticket_activity: { /*--hoạt động vé gần đây --đã xong*/
        url: baseApi + "/ticket/recent_activity",
        method: "GET"
    },
    cart_quantity: { /*-- Số lượng vé có trong giỏ hàng --đã xong*/
        url: baseApi + "/ticket/cart/count",
        method: "GET"
    },
    add_cart: { /*Thêm giỏ hàng đã xong*/
        url: baseApi + "/ticket/cart",
        method: "POST"
    },
    show_item_cart: { /* hiển thị danh sách giỏ hàng --đã xong*/
        url: baseApi + "/ticket/cart/all",
        method: "GET"
    },
    put_quantity: {/*Chỉnh sửa số lượng số lượng --đã xong*/
        url: baseApi + "/ticket/cart/edit/quantity",
        method: "PUT"
    },
    delete_item_cart: { /* Xoá item trong giỏ hàng --đã xong*/
        url: (categoryId) => baseApi + `/ticket/cart/${categoryId}`,
        method: "DELETE"
    },
    deposit: { /*Nạp tiền --đã xong*/
        url: baseApi + "/vault/deposit",
        method: "POST"
    },
    recent_deposit: { /*Nạp tiền gần đây --đã xong*/
        url: baseApi + "/vault/deposit/history",
        method: "GET"
    },
    usetime_in_month: { /*Đếm số lần sử dụng vé trong tháng */
        url: baseApi + "/ticket/count/use-times-in-month",
        method: "GET"
    },
    use_in_month: { /*Tiêu dùng trong tháng */
        url: baseApi + "/vault/fluctuation/use-in-month",
        method: "GET"
    },
    depositApproved: { /*SỐ tiền đã được duyệt */
        url: baseApi + "/vault/deposit/approved",
        method: "GET"
    },

    depositWaiting: { /*SỐ tiền đang chờ duyệt */
        url: baseApi + "/vault/deposit/wait",
        method: "GET"
    },
    cancleDeposit: {/*huỷ lệnh nạp */
        url: baseApi + "/vault/deposit/cancel",
        method: "PUT"
    },
    refreshTokenApi: {
        url: baseApi + "/identity/auth/refresh",
        method: "POST"
    },
    chartFluctuation: {
        url: baseApi + "/vault/fluctuation/fluctuation-in-30-day",
        method: "GET"
    },
    infoCategory: {
        url: baseApi + "/ticket/category/info",
        method: "GET"
    },
    getEmptyPosition: {
        url: baseApi + "/ticket/category/empty-position",
        method: "GET"
    },
    buyTicket: {
        url: baseApi + "/ticket/buy",
        method: "POST"
    },
    detailTicket: {
        url: baseApi + "/ticket",
        method: "GET"
    },
    getListPlateForTicket: {
        url: baseApi + "/ticket/plate/all",
        method: "GET"
    },
    getFirstQr: {
        url: baseApi + "/ticket/qr/get-new",
        method: "GET"
    },
    createQr: {
        url: baseApi + "/ticket/qr/create",
        method: "POST"
    },
    allQR: {
        url: baseApi + "/ticket/qr/get-all",
        method: "GET"
    }


}

export const refreshToken = () => {
    if (localStorage.getItem('refreshed') === '1') {
        return;
    }

    localStorage.setItem('refreshed', '1');

    const token = localStorage.getItem('token');
    const data = { token };

    fetch(endpoint.refreshTokenApi.url, {
        method: endpoint.refreshTokenApi.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.code === 1000) {
                localStorage.setItem('token', data.result.token);
                toast.info("Thực hiện lại thao tác", { position: "top-right" });
            } else {
                localStorage.removeItem('token');
                window.location.href = "/login";
            }
        })
        .catch((error) => {
            toast.error("Không thể thực hiện", { position: "top-right" });
        });

    setTimeout(() => {
        localStorage.removeItem('refreshed');
    }, 2000);
};