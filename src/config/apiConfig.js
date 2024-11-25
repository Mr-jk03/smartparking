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
        url: baseApi + "/vault/deposit/history?date=25/11/2024",
        method: "GET"
    },
    account: { /* Thông tin user --đã xong*/
        url: baseApi + "/profile/customer/info",
        method: "GET"
    },
    myTicket: { /*đã xong */
        url: baseApi + "/ticket/all?page=1",
        method: "GET"
    },
    buyTicketBikes: { /*---đã xong */
        url: baseApi + "/ticket/category/find?vehicle=Môtbike",
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
        url: baseApi + "/vault/fluctuation/",
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
    }

}