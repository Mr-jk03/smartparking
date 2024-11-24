export const baseApi = "http://localhost:8080/gateway/v1"
export const endpoint = {
    login: { /* -- Đã làm xong */
        url: baseApi + "/identity/auth",
        method: "POST"
    },
    register: { /* --đã làm xong */
        url: baseApi +"/identity/users/customer/registration",
        method: "POST"
    },
    bougthTicket:{  /*Số vé đã mua --đã xong*/
        url: baseApi + "/ticket/count/purchased",
        method: "GET"
    },
    walletBalance:{ /*Số dư ví --đã xong */
        url: baseApi + "/"
    },
    depositHistory: { /* Lịch sử nạp -- đã làm xong */
        url: baseApi + "/vault/deposit/history?date=20/08/2024",
        method: "GET"
    },
    account:{ /* Thông tin user --đã xong*/
        url: baseApi + "/profile/customer/info",
        method: "GET"
    },
    myTicket:{ /*đã xong */
        url: baseApi + "/ticket/all?page=1",
        method: "GET"
    },
    buyTicketBikes:{ /*---đã xong */
        url: baseApi + "/ticket/category/find?vehicle=bike",
        method: "GET"
    },
    buyTicketCar:{ /*-- đã xong*/
        url: baseApi + "/ticket/category/find?vehicle=Car",
        method: "GET"
    },
    wallet:{ /*--số dư đã xong */
        url: baseApi + "/vault/owners/balance",
        method: "GET"
    },
    balance:{ /**--biến động số dư đã xong */
        url: baseApi + "/vault/fluctuation/",
        method: "GET"
    },
    ticket_activity:{ /*--hoạt động vé gần đây --đã xong*/
        url: baseApi + "/ticket/recent_activity",
        method: "GET"
    },
    cart_quantity:{ /*-- Số lượng vé có trong giỏ hàng --đã xong*/
        url: baseApi + "/ticket/cart/count",
        method: "GET"
    },
    add_cart:{ /*Thêm giỏ hàng đã xongh*/
        url: baseApi + "/ticket/cart",
        method: "POST"
    },
    show_item_cart:{ /* hiển thị danh sách giỏ hàng */
        url: baseApi + "/ticket/cart/all",
        method:"GET"
    },
    put_quantity:{/*Chỉnh sửa số lượng số lượng */
        url: baseApi + "/ticket/cart/edit/quantity",
        method: "PUT"
    }
    
}