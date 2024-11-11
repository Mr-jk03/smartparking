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
    bougthTicket:{  /*Số vé đã mua*/
        url: baseApi + "/ticket/count/purchased",
        method: "GET"
    },
    walletBalance:{ /*Số dư ví --Chưa làm */
        url: baseApi + "/"
    },
    depositHistory: { /* Lịch sử nạp -- đã làm xong */
        url: baseApi + "/vault/deposit/history?date=20/08/2024",
        method: "GET"
    },
    account:{ /* Thông tin user */
        url: baseApi + "/profile/customer/info",
        method: "GET"
    },
    myTicket:{
        url: baseApi + "/ticket/all?page=1",
        method: "GET"
    }
}